import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';


export class AddAccountToWatchlistDTO {

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsOptional()
  @IsMongoId()
  watchlistId?: string;
}