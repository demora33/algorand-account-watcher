import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Watchlist, WatchlistSchema } from './schemas/Watchlist.schema';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Watchlist.name,
        schema: WatchlistSchema,
      },
    ]),
    AccountModule
  ],
  providers: [WatchlistService],
  controllers: [WatchlistController],
})
export class WatchlistModule {}