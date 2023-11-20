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
    private accountService: AccountService,
  ) {}

  async create(): Promise<Watchlist> {
    const createdWatchlist = new this.watchlistModel();
    return createdWatchlist.save();
  }

  async addAddress(address: string): Promise<Watchlist> {
    const lastestWatchlistId = await this.findLatestWatchlistId();
    const watchlist = await this.watchlistModel.findById(lastestWatchlistId);

    if (!watchlist) {
      throw new Error('Could not find watchlist');
    }
    let account: Account =
      await this.accountService.findAccountByAddress(address);
    if (!account) {
      console.log('No existing account');
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
    return watchlist.accounts;
  }

  async findLatestWatchlistId() {
    const lastestWatchlist = await this.watchlistModel.findOne().sort({ createdAt: -1 }).exec();
    return lastestWatchlist._id;
  }

  async getTrackedAccounts(): Promise<Account[]> {
    const lastestWatchlistId = await this.findLatestWatchlistId();
    const accounts = await this.getAccountsByWatchlistId(lastestWatchlistId.toString());
    return accounts;
  }
}
