import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateImageDto } from '../../../modules/Images/dtos/image.dto';
import { Imagen } from '../entities/imagen.entity';
import { Repository } from 'typeorm';
import { ImagesService } from './images.service';
import { plainToInstance } from 'class-transformer';

describe('ImagesService', () => {
  let service: ImagesService;
  let imageRepository: Repository<Imagen>;
  const IMAGE_REPOSITORY_TOKEN = getRepositoryToken(Imagen, 'mongoConnection');
  const imageMock: CreateImageDto = {
    bs64: 'dfeifejokjd',
    name: 'nombre de la imagen',
    type: 'png',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: IMAGE_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    imageRepository = module.get<Repository<Imagen>>(IMAGE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Crear Imagen', () => {
    it('debería llamar al metodo create del repositorio', async () => {
      // jest.spyOn(imageRepository, 'create').mockReturnValueOnce(mockPersona[0]);
      service.createImage(imageMock);
      expect(imageRepository.create).toBeCalledWith(imageMock);
    });
  });
  describe('Eliminar Imagen', () => {
    it('debería llamar al metodo eliminar del repositorio', async () => {
      const imagen = plainToInstance(Imagen, imageMock);
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(imagen);
      await service.deleteImage('6356f1ee95fdf04a2420c90e');
      expect(imageRepository.delete).toBeCalledWith(imagen);
    });
  });
  // describe('Modificar Imagen', () => {
  //   it('debería llamar al metodo merge del repositorio', async () => {
  //     const persona = plainToInstance(Persona, mockPersona[0]);
  //     jest.spyOn(service, 'findOne').mockResolvedValueOnce(persona);
  //     service.udpate(0, mockPersona[0]);
  //     // expect(imageRepository.merge).toBeCalledWith(persona, mockPersona[0]);
  //     expect(imageRepository.merge).toBeCalled();
  //   });
  // });
});
