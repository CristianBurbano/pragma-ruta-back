import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users/users.controller';
import { Persona } from 'src/entities/persona.entity';
import { UsersService } from 'src/services/users/users.service';
import { ImagesModule } from './images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), ImagesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
