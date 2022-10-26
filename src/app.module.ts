import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'environments/config';
import { environtments, schema } from 'environments/environments';
import { Persona } from './entities/persona.entity';
import { Imagen } from './entities/imagen.entity';

import { UsersModule } from './modules/users.module';
import { ImagesModule } from './modules/images.module';

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
    /**@todo mover a un modulo aparte para hacerlo global y se pueda usar en todos los modulos */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'pragma_ruta_back',
      entities: [Persona],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'pragma_ruta_back_mongo',
      name: 'mongoConnection',
      host: 'localhost',
      url: 'mongodb://root:root@localhost:27017/',
      port: 27017,
      password: 'root',
      username: 'root',
      authSource: 'admin',
      entities: [Imagen],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class AppModule {}
