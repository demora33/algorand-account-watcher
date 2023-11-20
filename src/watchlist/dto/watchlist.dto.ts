import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';


export class AddAddressToWatchlistDTO {

  @IsNotEmpty()
  @IsString()
  address: string;

  // @IsOptional()
  // @IsMongoId()
  // watchlistId?: string;
}