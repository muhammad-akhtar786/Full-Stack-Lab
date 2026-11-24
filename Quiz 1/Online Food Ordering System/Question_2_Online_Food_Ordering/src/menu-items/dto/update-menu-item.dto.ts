import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
export class UpdateMenuItemDto {
  @IsOptional() @IsString() @IsNotEmpty() name?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @IsPositive() price?: number;
  @IsOptional() @Type(() => Number) @IsInt() @IsPositive() restaurantId?: number;
}
