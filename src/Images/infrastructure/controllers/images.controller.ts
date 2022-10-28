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
import { addImageUseCases } from '../../usecases/addImage.usecases';
import { deleteImageUseCases } from '../../usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../usecases/getImage.usecases';
import { updateImageUseCases } from '../../usecases/updateImage.usecases';

import { CreateImageDto, UpdateImageDto } from './image.dto';
import { ImageRepository } from '../repositories/imageRepository.service';

@ApiTags('Imagenes')
@Controller('images')
export class ImagesController {
  imageUseCases = {
    create: new addImageUseCases(this.imgRepository),
    update: new updateImageUseCases(this.imgRepository),
    delete: new deleteImageUseCases(this.imgRepository),
    find: new getImagesUseCases(this.imgRepository),
  };

  @ApiOperation({ summary: 'Obtener las imagenes' })
  @Get()
  getImages() {
    return this.imageUseCases.find.exec();
  }

  @ApiOperation({ summary: 'Crear una imagen' })
  @Post()
  createImage(@Body() payload: CreateImageDto) {
    return this.imageUseCases.create.execute(payload);
  }

  @ApiOperation({ summary: 'Obtener una imagen por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageUseCases.find.byId(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades de la imagen por su ID' })
  @Put(':id')
  updateImage(@Param('id') id: string, @Body() payload: UpdateImageDto) {
    return this.imageUseCases.update.exec(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar Imagen' })
  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.imageUseCases.delete.exec(id);
  }
  constructor(private imgRepository: ImageRepository) {}
}
