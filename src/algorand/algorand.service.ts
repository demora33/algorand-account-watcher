import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from '../account/account.service';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import axios from 'axios';
import { UpdateAccountoDTO } from 'src/account/dto/account.dto';
import { AccountStatus } from '../account/dto/account.dto';

@Injectable()
export class AlgorandService {
  private readonly logger = new Logger(AlgorandService.name);

  constructor(
    private watchlistService: WatchlistService,
    private accountService: AccountService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Cron has started');
    console.log('------------------------------------');
    console.log('Checking accounts in latest watchlist');

    const latestWatchlist: any =
      await this.watchlistService.findLatestWatchlist();
    const accounts = await this.watchlistService.getAccountsByWatchlistId(
      latestWatchlist._id,
    );

    if (accounts.length === 0) {
      console.log('No accounts added in latest watchlist');
      return;
    }

    for (const account of accounts) {
      const watchedAccount = await this.accountService.findAccountByAddress(
        account.address,
      );
      await this.checkAccountState(watchedAccount);
    }
  }

  private async checkAccountState(account: any) {
    try {
      console.log(
        `Checking account ${account.address} state on the Algorand Testnet`,
      );
      const response = await axios.get(
        `https://testnet-api.algonode.cloud/v2/accounts/${account.address}`,
      );

      const accountAlgorandData = response.data;


      let updateAccount: UpdateAccountoDTO = {
        lastBlockUpdate: 0,
        balance: '',
        status: AccountStatus.Offline,
        rewards: 0,
      };

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
      // console.log(updateAccount);
      if (updateAccount.lastBlockUpdate != 0) {
        await this.accountService.updateAccount(account._id, updateAccount);
      } else {
        console.log(`Account ${account.address} state has not changed`)
      }
    } catch (error) {
      console.error(
        `Error querying account ${account.address}: ${error.message}`,
      );
      throw error;
    }
  }
}
