import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Persona } from './entities/persona.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { AppService } from './app.service';

import { Imagen } from './entities/imagen.entity';
import { ImagesController } from './controllers/images/images.controller';
import { ImagesService } from './services/images/images/images.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      // load: [config],
      isGlobal: true,
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
      url: 'mongodb://localhost:27017/',
      port: 27017,
      password: 'root',
      username: 'root',
      entities: [Imagen],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Persona]),
    TypeOrmModule.forFeature([Imagen], 'mongoConnection'),
  ],
  controllers: [AppController, UsersController, ImagesController],
  providers: [AppService, UsersService, ImagesService],
})
export class AppModule {}
