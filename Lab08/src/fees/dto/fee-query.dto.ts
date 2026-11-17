import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class FeeQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(30)
  credits: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(4)
  cgpa: number;

  @IsOptional()
  @IsIn(['standard', 'merit'])
  policy?: 'standard' | 'merit';
}
