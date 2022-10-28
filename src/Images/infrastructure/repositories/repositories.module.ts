import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from '../entities/imagen.entity';
import { ImageRepository } from './imageRepository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen], 'mongoConnection')],
  providers: [ImageRepository],
  exports: [ImageRepository],
})
export class RepositoriesModule {}
