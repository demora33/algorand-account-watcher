import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';
// import { CreateAccountoDto, UpdateAccountoDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    // @Post()
    // async create(@Body() account: string) {
    //     return this.accountService.create(account);
    // }

    // @Post(':id')
    // async uppdate(
    //     @Param() id: string,
    //     @Body() body: UpdateAccountoDto) {
    //     return this.accountService.update(id, body);
    // }
}
