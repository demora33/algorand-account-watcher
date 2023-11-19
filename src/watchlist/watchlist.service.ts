import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Watchlist } from './schemas/Watchlist.schema';
import { Model } from 'mongoose';
import { AddAccountToWatchlistDTO } from './dto/watchlist.dto';
// import { CreateWatchlistoDto } from './dto/Watchlist.dto';
// import { UpdateWatchlistoDto } from './dto/Watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name) private watchlistModel: Model<Watchlist>,
  ) {}

  async create() {
    const createdWatchlist = new this.watchlistModel();
    return createdWatchlist.save();
  }

  async addAddress(body: AddAccountToWatchlistDTO) {
    const watchlist = await this.watchlistModel.findById(body.watchlistId);

    if (!watchlist) {
      throw new Error('Watchlist no encontrada');
    }
    watchlist.accounts.push(body.account);

    return watchlist.save();
  }
}
