import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from 'src/dtos/image.dtos';
import { ImagesService } from 'src/services/images/images/images.service';

@Controller('images')
export class ImagesController {
  @Get()
  getImages() {
    return this.ImageService.find();
  }
  @Post()
  createImage(@Body() payload: CreateImageDto) {
    return this.ImageService.createImage(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ImageService.findOne(id);
  }

  @Put(':id')
  updateImage(@Param('id') id: string, @Body() payload: UpdateImageDto) {
    return this.ImageService.updateImage(id, payload);
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.ImageService.deleteImage(id);
  }
  constructor(private ImageService: ImagesService) {}
}
