import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from '../controllers/images/images.controller';
import { Imagen } from '../entities/imagen.entity';
import { ImagesService } from '../services/images/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen], 'mongoConnection')],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
