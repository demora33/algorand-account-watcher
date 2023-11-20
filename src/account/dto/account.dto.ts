import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export enum AccountStatus {
  Offline = 'Offline',
  Online = 'Online',
}

export class CreateAccountoDTO {
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateAccountoDTO {
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