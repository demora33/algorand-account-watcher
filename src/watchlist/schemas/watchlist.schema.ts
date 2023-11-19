import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from '../../account/schemas/account.schema';


@Schema()
export class Watchlist {

  @Prop({ type: Array, default: [] })
  accounts: string[];
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);