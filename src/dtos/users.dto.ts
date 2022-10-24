import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { typeDocument } from 'src/entities/persona.entity';

// class IdentificacionDto {
//   readonly tipo: string;
//   readonly valor: string;
// }

export class CreateUserDto {
  @ApiProperty({ description: 'Edad del usuario' })
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;

  @ApiProperty({ description: 'Número de Identificación del Usuario' })
  @IsNotEmpty()
  readonly document: string;

  @ApiProperty({ description: 'Tipo de Identificación del Usuario' })
  @IsNotEmpty()
  readonly documentType: typeDocument;

  @ApiProperty({ description: 'Primer nombre del Usuario' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ description: 'Segundo nombre del Usuario' })
  @IsOptional()
  readonly middleName: string;

  @ApiProperty({ description: 'Apellido del Usuario' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ description: 'Lugar de nacimiento del Usuario' })
  @IsNotEmpty()
  readonly birthplace: string;

  @ApiProperty({ description: 'Foto del Usuario en Base 64' })
  @IsNotEmpty()
  readonly photo: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
