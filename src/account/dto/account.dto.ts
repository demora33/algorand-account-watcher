import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export enum AccountStatus {
  Offline = 'Offline',
  Online = 'Online',
}

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateAccountDTO {
    @IsNotEmpty()
    @IsNumber()
    lastBlockUpdate: number;

    @IsOptional()
    @IsNotEmpty()
    balance: string;

    @IsOptional()
    @IsEnum(AccountStatus)
    status: AccountStatus;

    @IsNotEmpty()
    @IsNumber()
    rewards: number;
  }