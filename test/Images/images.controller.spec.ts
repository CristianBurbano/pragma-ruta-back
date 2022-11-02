import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from '../../src/Images/infrastructure/controllers/images.controller';
import { addImageUseCases } from '../../src/Images/usecases/addImage.usecases';
import { updateImageUseCases } from '../../src/Images/usecases/updateImage.usecases';
import { deleteImageUseCases } from '../../src/Images/usecases/deleteImage.usecases';
import { getImagesUseCases } from '../../src/Images/usecases/getImage.usecases';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: addImageUseCases,
          useValue: {},
        },
        { provide: updateImageUseCases, useValue: {} },
        { provide: deleteImageUseCases, useValue: {} },
        { provide: getImagesUseCases, useValue: {} },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
