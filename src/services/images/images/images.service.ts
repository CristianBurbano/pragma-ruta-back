import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto, UpdateImageDto } from 'src/dtos/image.dto';
import { Imagen } from '../../../entities/imagen.entity';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

@Injectable()
export class ImagesService {
  find() {
    return this.ImageRepository.find();
    // throw new InternalServerErrorException(null, 'Metodo aun no implementado');
  }
  async findOne(id: string) {
    const image = await this.ImageRepository.findOne({
      where: {
        _id: new ObjectID(id),
      },
    });
    if (image) {
      return image;
    } else throw new NotFoundException(null, 'Elemento no encontrado');
  }
  createImage(payload: CreateImageDto) {
    const newImage = this.ImageRepository.create(payload);
    return this.ImageRepository.save(newImage);
    // throw new InternalServerErrorException(null, 'Metodo aun no implementado');
  }
  async updateImage(id, payload: UpdateImageDto) {
    const image = await this.findOne(id);
    this.ImageRepository.merge(image, payload);
    return this.ImageRepository.save(image);
  }
  async deleteImage(id: string) {
    const imageToDelete = await this.findOne(id);
    return this.ImageRepository.delete(imageToDelete);
  }

  constructor(
    @InjectRepository(Imagen, 'mongoConnection')
    private ImageRepository: Repository<Imagen>,
  ) {}
}
