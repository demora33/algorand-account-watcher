import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose'
import { CreateAccountoDto } from './dto/account.dto';
import { UpdateAccountoDto } from './dto/account.dto';





@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<Account>
    ){}

    async create(account: string) {
        const createdAccount = new this.accountModel(account);
        return createdAccount.save();
    }

    async update(id: string, body: UpdateAccountoDto) {
        return this.accountModel.findByIdAndUpdate(id, body).exec();
    }

    async findAll() {
        return this.accountModel.find().exec();    
    }

    async findAccount(id: string) {
        return this.accountModel.findById(id).exec();    
    }
    
}
