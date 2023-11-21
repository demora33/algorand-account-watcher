import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from '../account/account.service';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import axios from 'axios';
import { UpdateAccountDTO } from 'src/account/dto/account.dto';
import { AccountStatus } from '../account/dto/account.dto';
import { Account } from 'src/account/schemas/account.schema';

@Injectable()
export class AlgorandService {
  private readonly logger = new Logger(AlgorandService.name);

  constructor(
    private watchlistService: WatchlistService,
    private accountService: AccountService,
  ) {}
  

  // This method is called every 60 seconds to update the state of the accounts
  // in the latest watchlist that has been created.
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleCron() {
  //   this.logger.debug('Cron has started');
  //   console.log('------------------------------------');

  //   const latestWatchlist = await this.watchlistService.findLatestWatchlist();
  //   console.log(`Checking for account updates in latest watchlist: ${latestWatchlist.name}`);

  //   const accounts: any = await this.watchlistService.getAccountsByWatchlistId(latestWatchlist._id.toString());
  //   for (const account of accounts) {
  //     console.log('------------------------------------');
  //     console.log(account.balance)

  //     const watchedAccount = await this.accountService.findAccountByAddress(account.address);
  //     console.log(watchedAccount);
  //     console.log(`Checking account ${watchedAccount.address}`);
  //     const updatedAccount = await this.checkAndUpdateAccount(watchedAccount);
  //     // if (updated) {
  //     // }
  //     updatedAccounts.push(updatedAccount);
  //   }
  //   console.log(updatedAccounts);
  //   if (updatedAccounts.length > 0) {
  //     console.log('------------------------------------');
  //     // await this.watchlistService.updateWatchlist(latestWatchlist._id.toString(), updatedAccounts);
  //   }
  // }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Cron has started');
    console.log('------------------------------------');

    const latestWatchlist = await this.watchlistService.findLatestWatchlist();
    console.log(`Checking for account updates in latest watchlist: ${latestWatchlist.name}`);

    const accounts: any = await this.watchlistService.getAccountsByWatchlistId(latestWatchlist._id.toString());
    
    
    let updatedAccounts: any[] = [];
    for (const account of accounts) {
      const { updatedAccount, updated } = await this.checkAndUpdateAccount(account);
      if (updated) {
        updatedAccounts.push(updatedAccount);
      }
    }
    if(updatedAccounts.length > 0){
      console.log('Updating watchlist');
      await this.watchlistService.updateWatchlist(latestWatchlist._id.toString(), updatedAccounts);
    }
  }

  // This method checks if there is any change in the state between the local database
  // and the Algorand Testnet. If there is a change, it updates the local database.
  // Returns the updated account.
  private async checkAndUpdateAccount(account: any): Promise< { updatedAccount: Account, updated: boolean}> {
    try {
      console.log(
        `Checking account ${account.address} state on the Algorand Testnet`,
      );
      const response = await axios.get(
        `https://testnet-api.algonode.cloud/v2/accounts/${account.address}`,
      );

      const accountAlgorandData = response.data;


      let updateAccount: UpdateAccountDTO = {
        lastBlockUpdate: 0,
        balance: '',
        status: AccountStatus.Offline,
        rewards: 0,
      };

      // console.log('algorand data',accountAlgorandData);
      // console.log('database data',account);

      if (accountAlgorandData.amount !== account.balance) {
        updateAccount.balance = accountAlgorandData.amount;
        updateAccount.lastBlockUpdate = accountAlgorandData.round;

        console.log(
          `Account ${account.address} state changed. New balance: ${
            accountAlgorandData.amount / 1000000
          }`,
        );
      }
      if (accountAlgorandData.status !== account.status) {
        updateAccount.status = accountAlgorandData.status;
        updateAccount.lastBlockUpdate = accountAlgorandData.round;
        console.log(
          `Account ${account.address} state changed. New status: ${accountAlgorandData.status}`,
        );
      }
      if (accountAlgorandData.rewards !== account.rewards) {
        updateAccount.rewards = accountAlgorandData.rewards;
        updateAccount.lastBlockUpdate = accountAlgorandData.round;
        console.log(
          `Account ${account.address} state changed. New rewards: ${accountAlgorandData.rewards}`,
        );
      }
      // If there is a change in the state, update the local database
      if (updateAccount.lastBlockUpdate != 0) {
        console.log(`Updating account ${account.address} in the local database`);
        const updatedAccount = await this.accountService.updateAccount(account._id.toString(), updateAccount);
        return {updatedAccount: updatedAccount, updated: true};
      } 
      else {
        console.log(`Account ${account.address} state has not changed`)
        return {updatedAccount: account, updated: false};

      }
    } catch (error) {
      console.error(
        `Error querying account ${account.address}: ${error.message}`,
      );
      throw error;
    }
  }
}
