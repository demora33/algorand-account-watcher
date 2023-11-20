import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Watchlist } from './schemas/Watchlist.schema';
import { Model } from 'mongoose';
import { Account } from 'src/account/schemas/account.schema';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name) private watchlistModel: Model<Watchlist>,
    private accountService: AccountService,
  ) {}

  async create(name: string): Promise<Watchlist> {
    let createdWatchlist = await this.watchlistModel.findOne({name: name});
    if (createdWatchlist) {
      throw new Error('Watchlist with that name already exists');
    }
    createdWatchlist = new this.watchlistModel({
      name: name,
    });
    return createdWatchlist.save();
  }

  async addAccount(watchlistId: string, address: string): Promise<Watchlist> {
    const watchlist = await this.watchlistModel.findById(watchlistId);

    if (!watchlist) {
      throw new Error('Could not find watchlist');
    }
    let account: Account =
      await this.accountService.findAccountByAddress(address);

    if (!account) {
      account = await this.accountService.createAccount(address);
    }

    const accountExistsInWatchlist = watchlist.accounts.some(
      (acc) => acc.address === account.address,
    );
    if (accountExistsInWatchlist) {
      throw new Error('Account already exists in watchlist');
    }

    watchlist.accounts.push(account);

    return watchlist.save();
  }

  async getAccountsByWatchlistId(watchlistId: string): Promise<Account[]> {
    const watchlist = await this.watchlistModel.findById(watchlistId);
    if (!watchlist) {
      throw new Error('No existing watchlist');
    }
    if (watchlist.accounts.length === 0) { 
      throw new Error('No accounts added in watchlist');
    }
    return watchlist.accounts;
  }

  async findLatestWatchlist() {
    const latestWatchlist = await this.watchlistModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();
    if (!latestWatchlist) {
      throw new Error('No existing watchlist, create one first');
    }
    return latestWatchlist;
  }
}
