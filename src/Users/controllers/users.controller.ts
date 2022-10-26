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
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Consulta de los Usuarios' })
  @Get()
  getUsers(
    @Query('type') type: string,
    @Query('value') value: string,
    @Query('minAge') minAge: number,
    @Query('maxAge') maxAge: number,
  ) {
    if (type && value) {
      return this.UserService.findByDocument(type, value);
    } else {
      if (maxAge || minAge) {
        return this.UserService.findByAge(minAge, maxAge);
      } else return this.UserService.findAll();
    }
  }

  @ApiOperation({ summary: 'Crear Usuario' })
  @Post()
  createUser(@Body() payload: CreateUserDto) {
    console.log('payload', payload);
    return this.UserService.create(payload);
  }

  @ApiOperation({ summary: 'Obtener Usuario por Id' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findOne(id);
  }

  @ApiOperation({ summary: 'Modificar propiedades del usuario' })
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.UserService.udpate(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar Usuario' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id) {
    this.UserService.delete(id);
    return { mensaje: 'Se eliminó el usuario ' + id };
  }

  constructor(private UserService: UsersService) {}
}
