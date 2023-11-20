import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(
    private watchlistService: WatchlistService
  ) {}

  @Get('accounts/:watchlistId')
  async getTrackedAccounts(
    @Param('watchlistId') watchlistId: string
  ) {
    return this.watchlistService.getAccountsByWatchlistId(watchlistId);
  }

  @Post('add/:watchlistId')
  async addAccount(
    @Param('watchlistId') watchlistId: string,
    @Body('account') account: string
    ) {
    return this.watchlistService.addAccount(watchlistId, account);
  }

  @Post('create')
  async createWatchlist(@Body('watchlistName') watchlistName: string) {
    return this.watchlistService.create(watchlistName);
  }
}
