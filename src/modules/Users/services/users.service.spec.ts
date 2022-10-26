import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { USERS } from '../../../mocks/users';
import { Repository } from 'typeorm';
import { Persona } from '../../../modules/Users/entities/persona.entity';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<Persona>;
  const mockPersona = USERS;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(Persona);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<Persona>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Crear Usuario', () => {
    it('debería llamar al metodo create del repositorio', async () => {
      // jest.spyOn(userRepository, 'create').mockReturnValueOnce(mockPersona[0]);
      service.create(mockPersona[0]);
      expect(userRepository.create).toBeCalledWith(mockPersona[0]);
    });
  });
  describe('Eliminar Usuario', () => {
    it('debería llamar al metodo eliminar del repositorio', async () => {
      service.delete(0);
      expect(userRepository.delete).toBeCalledWith(0);
    });
  });
  describe('Modificar Usuario', () => {
    it('debería llamar al metodo merge del repositorio', async () => {
      const persona = plainToInstance(Persona, mockPersona[0]);
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(persona);
      await service.udpate(0, mockPersona[0]);
      expect(userRepository.merge).toBeCalledWith(persona, mockPersona[0]);
    });
  });
});
