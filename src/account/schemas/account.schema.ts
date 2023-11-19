import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Account {
  @Prop({required: true})
  address: string;

  @Prop({default: 0})
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);