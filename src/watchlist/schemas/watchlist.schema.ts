import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Account } from '../../account/schemas/account.schema';



@Schema({timestamps: true})
export class Watchlist {

  @Prop({ required: true })
  name: string

  @Prop({ type: [Types.ObjectId], ref: 'Account', default: [] })
  accounts: Account[];
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);