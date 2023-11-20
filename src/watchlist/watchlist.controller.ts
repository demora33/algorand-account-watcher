import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(
    private watchlistService: WatchlistService
  ) {}

  @Get('accounts')
  async getTrackedAccounts() {
    return this.watchlistService.getTrackedAccounts();
  }

  @Post('add/:address')
  async addAccount(@Param('address') address: string) {
    return this.watchlistService.addAddress(address);
  }

  @Post('create')
  async createWatchlist() {
    return this.watchlistService.create();
  }
}
