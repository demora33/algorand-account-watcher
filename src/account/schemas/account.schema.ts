import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountStatus } from '../dto/account.dto';

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true, default: AccountStatus.Offline })
  status: AccountStatus;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  lastBlockUpdate: number;

  @Prop({ default: 0 })
  rewards: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
