import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { AlgorandModule } from './algorand/algorand.module';
require('dotenv').config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AccountModule,
    WatchlistModule,
    AlgorandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
