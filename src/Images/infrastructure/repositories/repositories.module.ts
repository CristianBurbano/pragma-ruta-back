import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from '../entities/imagen.entity';
import { FileRepository } from './FileRepository.service';
import { ImageRepository } from './imageRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen], 'mongoConnection')],
  providers: [ImageRepository, FileRepository],
  exports: [ImageRepository, FileRepository],
})
export class RepositoriesModule {}
