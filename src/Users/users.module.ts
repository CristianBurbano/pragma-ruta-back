import { Module } from '@nestjs/common';

import { UsersController } from 'src/Users/infrastructure/controllers/users.controller';
import { ImagesModule } from '../Images/images.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [ImagesModule, ConfigModule, RepositoriesModule],
  controllers: [UsersController],
  // providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
