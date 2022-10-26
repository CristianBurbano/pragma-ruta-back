import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from 'src/controllers/images/images.controller';
import { Imagen } from 'src/entities/imagen.entity';
import { ImagesService } from 'src/services/images/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen], 'mongoConnection')],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
