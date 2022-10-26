import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ description: 'nombre de la imagen' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'bs64 de la Imagen' })
  @IsNotEmpty()
  readonly bs64: string;

  @ApiProperty({ description: 'extensión de la Imagen' })
  @IsNotEmpty()
  readonly type: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
