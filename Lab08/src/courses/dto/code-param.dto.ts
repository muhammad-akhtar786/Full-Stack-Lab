import { Transform } from 'class-transformer';
import { Matches } from 'class-validator';

export class CodeParamDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value)
  @Matches(/^(?:[A-Z]{2,4}\d{3,4}|CS-\d{3}L)$/, {
    message: 'code must be 2-4 letters followed by 3-4 digits or CS-###L',
  })
  code: string;
}
