import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserRepository } from '../repositories/userRepository.service';

import { getUsersUseCases } from 'src/Users/usecases/getUsers.usecases';
import { getUserUseCases } from 'src/Users/usecases/getUser.usecases';
import { deleteUserUseCases } from 'src/Users/usecases/deleteUser.usecases';
import { updateUserUseCases } from 'src/Users/usecases/updateUser.usecases';
import { addUserUseCases } from 'src/Users/usecases/addUser.usecases';
import { ImageRepository } from 'src/Images/infrastructure/repositories/imageRepository.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { addImageUseCases } from 'src/Images/usecases/addImage.usecases';
import { FileRepository } from 'src/Images/infrastructure/repositories/FileRepository.service';
import { deleteImageUseCases } from 'src/Images/usecases/deleteImage.usecases';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  private useCases = {
    getUsers: new getUsersUseCases(this.userRepository),
    getUser: new getUserUseCases(this.userRepository),
    deleteUser: new deleteUserUseCases(
      this.userRepository,
      new deleteImageUseCases(this.imageRepository, this.fileRepository),
    ),
    updateUser: new updateUserUseCases(this.userRepository),
    createUser: new addUserUseCases(
      this.userRepository,
      new addImageUseCases(this.imageRepository, this.fileRepository),
    ),
  };

  @ApiOperation({ summary: 'Consulta de los Usuarios' })
  @Get()
  getUsers(
    @Query('type') type: number,
    @Query('value') value: string,
    @Query('minAge') minAge: number,
    @Query('maxAge') maxAge: number,
  ) {
    if (type && value) {
      return this.useCases.getUser.byDocument(type, value);
    } else {
      if (maxAge || minAge) {
        return this.useCases.getUsers.getByAge(minAge, maxAge);
      } else return this.useCases.getUsers.execute();
    }
  }

  @ApiOperation({ summary: 'Crear Usuario' })
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    console.log('payload', payload);
    return this.useCases.createUser.execute({ ...payload, photo });
  }

  @ApiOperation({ summary: 'Obtener Usuario por Id' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.useCases.getUser.byId(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades del usuario' })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    await this.useCases.updateUser.exec(id, payload);
    return 'success';
  }

  @ApiOperation({ summary: 'Eliminar Usuario' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    await this.useCases.deleteUser.exec(id);
    return 'success';
  }

  constructor(
    private userRepository: UserRepository,
    private imageRepository: ImageRepository,
    private fileRepository: FileRepository,
  ) {}
}
