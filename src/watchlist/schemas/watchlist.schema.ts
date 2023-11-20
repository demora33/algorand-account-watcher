import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Account } from '../../account/schemas/account.schema';



@Schema()
export class Watchlist {

  @Prop({ type: [Types.ObjectId], ref: 'Account', default: [] })
  accounts: Account[];
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);