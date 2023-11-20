import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';
import { CreateAccountoDTO } from './dto/account.dto';
import { UpdateAccountoDTO } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async createAccount(address: string): Promise<Account> {
    const createdAccount = new this.accountModel({ address });
    return createdAccount.save();
  }

  async updateAccount(
    id: string,
    updateAccountDTO: UpdateAccountoDTO,
  ): Promise<Account> {

    console.log('Updating Account');
    return this.accountModel
      .findByIdAndUpdate(
        id,
        updateAccountDTO,
        { new: true })
      .exec();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findAccountByAddress(address: string): Promise<Account> {
    return this.accountModel.findOne({ address: address }).exec();
  }

  async findAccount(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }
}
