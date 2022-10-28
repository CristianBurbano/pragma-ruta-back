import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'environments/config';
import { environtments, schema } from 'environments/environments';
import { Imagen } from './Images/infrastructure/entities/imagen.entity';

import { UsersModule } from './Users/users.module';
import { ImagesModule } from './Images/images.module';

@Module({
  imports: [
    UsersModule,
    ImagesModule,
    ConfigModule.forRoot({
      envFilePath:
        'environments/' + (environtments[process.env.NODE_ENV] || '.env'),
      load: [config],
      isGlobal: true,
      validationSchema: schema,
    }),
  ],
})
export class AppModule {}
