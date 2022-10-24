import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
} from 'typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';

import { Persona } from 'src/entities/persona.entity';
import { USERS } from 'src/mocks/users';

@Injectable()
export class UsersService {
  users: Persona[] = [...USERS];

  constructor(
    @InjectRepository(Persona) private usersRepository: Repository<Persona>,
  ) {}

  async findAll(): Promise<Persona[]> {
    return await this.usersRepository.find();
  }

  async findByAge(minAge = 0, maxAge = 999): Promise<Persona[]> {
    const where: FindOptionsWhere<Persona> = {};
    // if (minAge && !maxAge) where.age = MoreThanOrEqual(minAge);
    // else if (!maxAge && minAge) where.age = LessThanOrEqual(maxAge);
    // else if (minAge && maxAge) where.age = Between(minAge, maxAge)
    if (minAge || maxAge) {
      where.age = Between(minAge, maxAge);
      return await this.usersRepository.find({
        where,
      });
    } else
      throw new BadRequestException(
        'No se puede filtrar por edad sin los parametros minAge o maxAge',
      );
  }

  async findByDocument(type, value): Promise<Persona> {
    return this.usersRepository.findOneBy({
      documentType: type,
      document: value,
    });
    // return this.users.find(
    //   (p) => p.documentType == type && p.document == value,
    // );
  }

  findOne(id: number): Persona {
    const user = this.users.find((p) => p.id == id);
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    else return user;
  }

  create(payload: CreateUserDto) {
    const newUser = this.usersRepository.create(payload);

    // const newUser = {
    //   id: this.users.length + 1,
    //   ...payload,
    // };
    // this.users.push(newUser);
    return this.usersRepository.save(newUser);
  }

  async udpate(id, payload: UpdateUserDto) {
    // const index = this.users.findIndex((user) => user.id == id);
    // if (index < 0) {
    //   throw new NotFoundException('Usuario no encontrado');
    // } else {
    //   const newUser = {
    //     ...this.users[index],
    //     ...payload,
    //   };
    //   this.users.splice(index, 1);
    //   this.users.push(newUser);
    //   return newUser;
    // }
    const persona = await this.usersRepository.findOne({ where: { id } });
    this.usersRepository.merge(persona, payload);

    this.usersRepository.save(persona);
  }

  delete(id: number) {
    // const index = this.users.findIndex((user) => user.id == id);
    // this.users.splice(index, 1);
    return this.usersRepository.delete(id);
  }
}
