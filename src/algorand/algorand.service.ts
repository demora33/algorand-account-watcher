import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AccountService } from '../account/account.service';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import axios from 'axios';

@Injectable()
export class AlgorandService {
  private readonly logger = new Logger(AlgorandService.name);

  constructor(
    private accountService: AccountService,
    private watchlistService: WatchlistService,
  ) {}

  @Cron('*/60 * * * * *')
  async handleCron() {
    this.logger.debug('Called every 60 seconds');

    const accounts = await this.watchlistService.getAccountsByWatchlistId(
      '6559226decb84b93d51608d4',
    );

    // Para cada cuenta, llama a la API externa y actualiza la base de datos
    for (const account of accounts) {
      // Llama a la API externa (reemplaza esto con la llamada real a la API)
      console.log('address', account.address);
      await this.checkAccountState(account.address);

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

  private async checkAccountState(address: string) {
    try {
      const response = await axios.get(`https://algorand-node-api/${address}`);
      console.log('response', response.data);
      const newBalance = response.data.balance;

      //   if (newBalance !== this.watcherList[address]) {
      //     console.log(
      //       `Account ${address} state changed. New balance: ${newBalance}`,
      //     );
      //     this.watcherList[address] = newBalance;
      //   }
    } catch (error) {
      console.error(`Error querying account ${address}: ${error.message}`);
    }
  }
}
