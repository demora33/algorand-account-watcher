import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { WatchlistService } from './watchlist.service';
import { AddAddressToWatchlistDTO } from './dto/watchlist.dto';

@Controller('watchlist')
export class WatchlistController {
    constructor(
        private watchlistService: WatchlistService,
        private accountService: AccountService
    ) {}

    @Get(':id')
    async getWatchlistState(
        @Param() id: string
    ) {
        return;
    }

    @Post('/:id')
    async addAccount(
        @Param('id') id: string,
        @Body() body: AddAddressToWatchlistDTO) {
        return this.watchlistService.addAddress(id, body.address);
    }

@Get(':id/accounts')
async getAccountsInWatchlist(@Param('id') id: string) {
    // return this.watchlistService.getAccounts(id);
}
}
