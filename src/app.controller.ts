import { Controller, Get, Post, Body } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
// import { WatcherListModel } from './app';

// @Controller('watcher-list')
// export class AppController {
//   // private watcherList: string[];

//   @Cron(CronExpression.EVERY_10_SECONDS, {
//     name: 'watchlist_check'
//   })
//   handleCron() {
//     console.log("Cron has started");
//     console.log("Checking for account state changes");
//     this.checkConnection();
//     console.log("Cron has ended");
//   }
//   // private async checkAccountState() {
//   //   if (this.watcherList.length == 0) {
//   //     return;
//   //   }
//   //   for (const address in this.watcherList) {
//   //     if (true) {
//   //       // Simulate querying Algorand node for account state
//   //       // Replace the URL with the actual Algorand node endpoint
//   //       try {
//   //         const response = await axios.get(`https://algorand-node-api/${address}`);
//   //         console.log("response", response)
//   //         const newBalance = response.data.balance;

//   //         if (newBalance !== this.watcherList[address]) {
//   //           console.log(`Account ${address} state changed. New balance: ${newBalance}`);
//   //           this.watcherList[address] = newBalance;
//   //         }
//   //       } catch (error) {
//   //         console.error(`Error querying account ${address}: ${error.message}`);
//   //       }
//   //     }
//   //   }
//   // }

//   private async checkConnection() {
//     try {
//       const response = await axios.get('https://testnet-api.algonode.cloud/v2/accounts/ADWTH6AP6EVAS3PD4JZCYRG26ZLZLC5CSK5QIXD4OHPDKVZE5AEDOIKBBU');
//       console.log("response", response.data);

//     } catch (error) {
//       // console.error(`Error querying account ${address}: ${error.message}`);
//     }
//   }

//   // @Post('add_account')
//   // addAccount(@Body() data: { address: string }): { message: string } {
//   //   const { address } = data;

//   //   if (address) {
//   //     this.watcherList[address] = 0; // Initial balance
//   //     return { message: `Account ${address} added to the watcher list` };
//   //   } else {
//   //     throw new Error('Invalid data');
//   //   }
//   // }

//   // @Get()
//   // async getWatcherList(): Promise<string[]> {
//   //   // Supongamos que tienes una función en tu modelo para obtener la lista
//   //   const watcherList = await WatcherListModel.findOne();
//   //   return watcherList ? watcherList.addresses : [];
//   // }
// }
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
