import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { addImageUseCases } from '../../usecases/addImage.usecases';
import { deleteImageUseCases } from '../../usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../usecases/getImage.usecases';
import { updateImageUseCases } from '../../usecases/updateImage.usecases';

import { CreateImageDto, UpdateImageDto } from './image.dto';
import { ImageRepository } from '../repositories/imageRepository.service';
import { FileRepository } from '../repositories/FileRepository.service';

@ApiTags('Imagenes')
@Controller('images')
export class ImagesController {
  imageUseCases = {
    create: new addImageUseCases(this.imgRepository, this.fileRepository),
    update: new updateImageUseCases(this.imgRepository),
    delete: new deleteImageUseCases(this.imgRepository, this.fileRepository),
    find: new getImagesUseCases(this.imgRepository),
  };

  @ApiOperation({ summary: 'Obtener las imagenes' })
  @Get()
  getImages() {
    return this.imageUseCases.find.exec();
  }

  @ApiOperation({ summary: 'Crear una imagen' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageUseCases.create.execute(file);
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

  @Patch()
  @UseInterceptors(FileInterceptor('photo'))
  pruebaArchivo(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    console.log('body', body);
    console.log('file', file);
    this.fileRepository.insert(file);
  }

  constructor(
    private imgRepository: ImageRepository,
    private fileRepository: FileRepository,
  ) {}
}
