import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { USERS } from '../../../mocks/users';
import { Repository } from 'typeorm';
import { Persona } from '../../Users/entities/persona.entity';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { ImagesService } from '../../Images/services/images.service';
import { ObjectID } from 'mongodb';

describe('UsersService', () => {
  let service: UsersService;
  let imageService: ImagesService;
  let userRepository: Repository<Persona>;
  const mockPersona = USERS;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(Persona);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [ImagesModule],
      providers: [
        UsersService,
        {
          provide: ImagesService,
          useValue: {
            createImage: jest.fn(),
          },
        },
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
    imageService = module.get<ImagesService>(ImagesService);
    userRepository = module.get<Repository<Persona>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Crear Usuario', () => {
    it('debería llamar al metodo create del repositorio', async () => {
      const imageCreated = {
        _id: new ObjectID(),
        bs64: 'databs64',
        name: 'imagen Prueba',
      };
      jest
        .spyOn(imageService, 'createImage')
        .mockResolvedValueOnce(imageCreated);
      await service.create(mockPersona[0]);
      expect(userRepository.create).toBeCalledWith({
        ...mockPersona[0],
        photo: imageCreated._id.toString(),
      });
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
