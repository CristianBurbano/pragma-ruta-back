import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Users/controllers/users.controller';
import { Persona } from './entities/persona.entity';
import { UsersService } from 'src/Users/services/users.service';
import { ImagesModule } from '../modules/Images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), ImagesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
