import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { plainToInstance } from 'class-transformer';

import { Image } from 'src/Images/domain/model/Image';
import { IImageRepository } from 'src/Images/domain/repositories/image.respository';
import { Imagen } from '../entities/imagen.entity';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(Imagen, 'mongoConnection')
    private imageRepo: Repository<Imagen>,
  ) {}

  private async findEntity(id: string): Promise<Imagen> {
    return await this.imageRepo.findOne({
      where: {
        _id: new ObjectID(id),
      },
    });
  }

  async findAll(): Promise<Image[]> {
    const entities = await this.imageRepo.find();
    return entities.map((entity) =>
      plainToInstance(Image, { ...entity, id: entity._id }),
    );
  }
  async findOneById(id: string): Promise<Image> {
    const entity = await this.findEntity(id);
    return plainToInstance(Image, entity);
  }

  async create(payload: Image): Promise<Image> {
    const newImage = this.imageRepo.create(payload);
    const entity = await this.imageRepo.save(newImage);
    return plainToInstance(Image, entity);
  }
  async update(id: string, payload: Image): Promise<void> {
    const image = await this.findEntity(id);
    this.imageRepo.merge(image, payload);
    await this.imageRepo.save(image);
  }
  async delete(id: string): Promise<void> {
    const image = await this.findEntity(id);
    this.imageRepo.delete(image);
  }
}