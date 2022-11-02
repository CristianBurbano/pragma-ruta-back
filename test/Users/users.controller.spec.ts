import { Test, TestingModule } from '@nestjs/testing';
import { addUserUseCases } from '../../src/Users/usecases/addUser.usecases';
import { deleteUserUseCases } from '../../src/Users/usecases/deleteUser.usecases';
import { getUserUseCases } from '../../src/Users/usecases/getUser.usecases';
import { updateUserUseCases } from '../../src/Users/usecases/updateUser.usecases';
import { UsersController } from '../../src/Users/infrastructure/controllers/users.controller';
import { getUsersUseCases } from '../../src/Users/usecases/getUsers.usecases';

describe('Rutas de Usuario', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: getUserUseCases, useValue: {} },
        { provide: getUsersUseCases, useValue: {} },
        { provide: updateUserUseCases, useValue: {} },
        { provide: deleteUserUseCases, useValue: {} },
        { provide: addUserUseCases, useValue: {} },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});
