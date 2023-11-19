import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
export class CreateAccountoDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateAccountoDto {
    @IsNotEmpty()
    balance: string;
  }