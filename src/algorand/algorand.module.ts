import { Module } from '@nestjs/common';
import { AlgorandService } from './algorand.service';

@Module({
  providers: [AlgorandService]
})
export class AlgorandModule {}
