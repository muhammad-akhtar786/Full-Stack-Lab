import { IsNotEmpty, IsString, MaxLength, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';

export class CreateNoteDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  title: string;

  @IsString() @MaxLength(500)
  content: string;

  @IsOptional() @IsArray() @ArrayMaxSize(5)
  @IsString({ each: true }) @MaxLength(20, { each: true })
  tags?: string[];
}