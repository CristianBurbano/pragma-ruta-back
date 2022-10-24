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
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';

import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
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

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.UserService.create(payload);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.UserService.udpate(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id) {
    this.UserService.delete(id);
    return { mensaje: 'Se eliminó el usuario ' + id };
  }

  constructor(private UserService: UsersService) {}
}
