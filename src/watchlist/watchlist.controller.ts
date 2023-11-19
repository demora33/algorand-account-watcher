import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { WatchlistService } from './watchlist.service';
import { AddAccountToWatchlistDTO } from './dto/watchlist.dto';
import { log } from 'console';

@Controller('watchlist')
export class WatchlistController {
    constructor(private watchlistService: WatchlistService) {}

    @Get(':id')
    async getWatchlistState(
        @Param() id: string
    ) {
        return;
    }

    @Post()
    async addAccount(
        @Param() id: string,
        @Body() body: AddAccountToWatchlistDTO) {
        return this.watchlistService.addAddress(body);
    }


}
