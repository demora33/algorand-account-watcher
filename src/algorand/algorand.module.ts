import { Module } from '@nestjs/common';
import { AlgorandService } from './algorand.service';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';
import { WatchlistModule } from 'src/watchlist/watchlist.module';

@Module({
  imports: [AccountModule, WatchlistModule],
  providers: [AlgorandService],
  exports: [AlgorandService],
})
export class AlgorandModule {}
