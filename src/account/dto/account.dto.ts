import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
export class CreateAccountoDTO {
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateAccountoDTO {
    @IsNotEmpty()
    balance: string;
  }