import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { typeDocument } from 'src/entities/persona.entity';

// class IdentificacionDto {
//   readonly tipo: string;
//   readonly valor: string;
// }

export class CreateUserDto {
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;

  @IsNotEmpty()
  readonly document: string;

  @IsNotEmpty()
  readonly documentType: typeDocument;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly birthplace: string;

  @IsNotEmpty()
  readonly photo: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
