import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IuserRepository } from 'src/Users/domain/repositories/userRepository.interface';
import { Between, FindOptionsWhere, Repository } from 'typeorm';

import { User, typeDocument } from 'src/Users/domain/model/user';
import { Persona } from '../entities/persona.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository implements IuserRepository {
  constructor(
    @InjectRepository(Persona) private userRepo: Repository<Persona>,
  ) {}

  async getUsers(): Promise<User[]> {
    const entities = await this.userRepo.find();
    return plainToInstance(User, entities);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    return plainToInstance(User, user);
  }

  async getUserByDocument(type: typeDocument, document: string): Promise<User> {
    const user = this.userRepo.findOneBy({
      documentType: type,
      document: document,
    });
    return plainToInstance(User, user);
  }

  async getUsersByAge(min = 0, max = 999): Promise<User[]> {
    const where: FindOptionsWhere<Persona> = {};
    if (min || max) {
      where.age = Between(min, max);
      const entities = await this.userRepo.find({
        where,
      });
      return plainToInstance(User, entities);
    } else
      throw new Error(
        'No se puede filtrar por edad sin los parametros minAge o maxAge',
      );
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.userRepo.create(
      this.userRepo.create({
        ...user,
      }),
    );
    const entity = await this.userRepo.save(newUser);
    return plainToInstance(User, entity);
  }
  async updateUser(id: number, payload: any): Promise<void> {
    const persona = await this.getUserById(id);
    this.userRepo.merge(persona, payload);
    await this.userRepo.save(persona);
  }

  async deleteUser(id: number): Promise<User> {
    const persona = await this.getUserById(id);
    if (persona) {
      await this.userRepo.delete(id);
      return persona;
    } else {
      throw new NotFoundException(null, 'Usuario no encontrado');
    }
  }
}
