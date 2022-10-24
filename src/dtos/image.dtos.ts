import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly bs64: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
