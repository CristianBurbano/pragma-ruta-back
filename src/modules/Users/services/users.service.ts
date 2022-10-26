import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { Persona } from '../entities/persona.entity';
import { ImagesService } from '../../Images/services/images.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Persona) private usersRepository: Repository<Persona>,
    private imageService: ImagesService,
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

  async findOne(id: number): Promise<Persona> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    else return user;
  }

  async create(payload: CreateUserDto) {
    const newImage = await this.imageService.createImage({
      bs64: payload.photo,
      name: payload.firstName + payload.lastName + new Date().getTime(),
      type: 'png',
    });
    const newUser = this.usersRepository.create({
      ...payload,
      photo: newImage._id.toString(),
    });
    return this.usersRepository.save(newUser);
  }

  async udpate(id, payload: UpdateUserDto) {
    const persona = await this.findOne(id);
    this.usersRepository.merge(persona, payload);

    return this.usersRepository.save(persona);
  }

  delete(id: number) {
    // const index = this.users.findIndex((user) => user.id == id);
    // this.users.splice(index, 1);
    return this.usersRepository.delete(id);
  }
}
