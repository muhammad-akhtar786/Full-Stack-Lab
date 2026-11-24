import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateMenuItemDto {
  @IsString() @IsNotEmpty() name: string;
  @Type(() => Number) @IsNumber() @IsPositive() price: number;
  @Type(() => Number) @IsInt() @IsPositive() restaurantId: number;
}
