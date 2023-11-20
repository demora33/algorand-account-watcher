import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Watchlist } from './schemas/Watchlist.schema';
import { Model } from 'mongoose';
import { Account } from 'src/account/schemas/account.schema';
import { AccountService } from 'src/account/account.service';
// import { CreateWatchlistoDto } from './dto/Watchlist.dto';
// import { UpdateWatchlistoDto } from './dto/Watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name) private watchlistModel: Model<Watchlist>,
    private accountService: AccountService
  ) {}

  async create() {
    const createdWatchlist = new this.watchlistModel();
    return createdWatchlist.save();
  }

  async addAddress(watchlistId: string, address: string) {
    const watchlist = await this.watchlistModel.findById(watchlistId);

    if (!watchlist) {
      this.create();
      throw new Error('No existing watchlist');
    }
    const account: Account = await this.accountService.findAccountByAddress(address);
    if (!account) {
      throw new Error('Account not found');
    }

    watchlist.accounts.push(account);

    return watchlist.save();
  }
}
