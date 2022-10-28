import { Module } from '@nestjs/common';
import { ImagesController } from './infrastructure/controllers/images.controller';
import { ConfigModule } from './infrastructure/config/config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [ConfigModule, RepositoriesModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
