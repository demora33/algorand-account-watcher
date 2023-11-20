import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from '../account/account.service';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import axios from 'axios';
import { Account } from 'src/account/schemas/account.schema';

@Injectable()
export class AlgorandService {
  private readonly logger = new Logger(AlgorandService.name);

  constructor(
    private watchlistService: WatchlistService,
    private accountService: AccountService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    // this.logger.debug('Called every 60 seconds');
    console.log('Cron has started');
    console.log('Checking accounts in watchlist');

    const accounts = await this.watchlistService.getAccountsByWatchlistId(
      '655922e6ecb84b93d51608d6',
    );

    for (const account of accounts) {
      console.log('address', account.address);

      const watchedAccount: Account =
        await this.accountService.findAccountByAddress(account.address);
      //   console.log('watchedAccount', watchedAccount);

      await this.checkAccountState(watchedAccount);

      // Si hay cambios, actualiza la base de datos
      //   if (
      //     externalApiResponse.status !== account.status ||
      //     externalApiResponse.balance !== account.balance
      //   ) {
      //     await this.accountService.updateAccount(
      //       account.id,
      //       externalApiResponse.status,
      //       externalApiResponse.balance,
      //     );
      //   }
    }
  }

  private async checkAccountState(account: Account) {
    try {
      const response = await axios.get(
        `https://testnet-api.algonode.cloud/v2/accounts/${account.address}`,
      );
      //   console.log('response', response.data);
      const accountBalance = response.data.amount;

      console.log('accountBalance', accountBalance);
      console.log('account.balance', account.balance);

      if (accountBalance !== account.balance) {
        console.log(
          `Account ${account.address} state changed. New balance: ${
            accountBalance / 1000000
          }`,
        );
        // await this.accountService.updateAccount(account.id, accountBalance);
      }
    } catch (error) {
      //   console.error(`Error querying account ${address}: ${error.message}`);
      throw error;
    }
  }
}
