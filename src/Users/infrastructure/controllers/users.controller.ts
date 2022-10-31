import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  private useCases = {
    getUsers: new getUsersUseCases(this.userRepository),
    getUser: new getUserUseCases(this.userRepository),
    deleteUser: new deleteUserUseCases(this.userRepository),
    updateUser: new updateUserUseCases(this.userRepository),
    createUser: new addUserUseCases(this.userRepository, this.imageRepository),
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
  createUser(@Body() payload: CreateUserDto) {
    return this.useCases.createUser.execute(payload);
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
  ) {}
}
