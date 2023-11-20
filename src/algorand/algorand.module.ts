import { Module } from '@nestjs/common';
import { AlgorandService } from './algorand.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [AccountService],
  providers: [AlgorandService],
  exports: [AlgorandService],
})
export class AlgorandModule {}
