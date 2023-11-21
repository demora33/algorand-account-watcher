import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';
import { UpdateAccountDTO } from './dto/account.dto';

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
    updateAccountDTO: UpdateAccountDTO,
  ): Promise<Account> {
    return this.accountModel

      .findByIdAndUpdate(id, updateAccountDTO, { new: true })
      .exec();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findAccountByAddress(address: string): Promise<Account> {
    console.log('Finding Account');
    console.log(address);
    return this.accountModel.findOne({ address: address }).exec();
  }

  async findAccount(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }
}
