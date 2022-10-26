import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateImageDto, UpdateImageDto } from '../../dtos/image.dto';
import { ImagesService } from '../../services/images/images/images.service';

@ApiTags('Imagenes')
@Controller('images')
export class ImagesController {
  @ApiOperation({ summary: 'Obtener las imagenes' })
  @Get()
  getImages() {
    return this.ImageService.find();
  }

  @ApiOperation({ summary: 'Crear una imagen' })
  @Post()
  createImage(@Body() payload: CreateImageDto) {
    return this.ImageService.createImage(payload);
  }

  @ApiOperation({ summary: 'Obtener una imagen por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ImageService.findOne(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades de la imagen por su ID' })
  @Put(':id')
  updateImage(@Param('id') id: string, @Body() payload: UpdateImageDto) {
    return this.ImageService.updateImage(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar Imagen' })
  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.ImageService.deleteImage(id);
  }
  constructor(private ImageService: ImagesService) {}
}
