import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { WatchlistModule } from './watchlist/watchlist.module';

@Module({
  imports: [
    // ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://test:test@cluster1.eh2icve.mongodb.net/alfonso-ddbb-test'),
    AccountModule,
    WatchlistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
