import { typeDocument } from '../src/Users/domain/model/user';
import { CreateUserDto } from '../src/Users/infrastructure/controllers/users.dto';

export const USERS: CreateUserDto[] = [
  {
    firstName: 'Cristian',
    middleName: 'Yamith',
    lastName: 'Burbano',
    birthplace: 'La Plata, Huila',
    age: 28,
    documentType: typeDocument.CC,
    document: '1234343',
    photo: 'dfdfdfd',
  },
  {
    firstName: 'Pepito',
    middleName: 'dfdf',
    lastName: 'Perez',
    birthplace: 'Bogotá, Cundinamarca',
    age: 20,
    documentType: typeDocument.TI,
    document: '5433443',
    photo: 'dfdfccrgbfgfgfgff',
  },
  {
    firstName: 'Pepito',
    middleName: 'Perez',
    lastName: 'Camargo',
    birthplace: 'Bogotá, Cundinamarca',
    age: 40,
    documentType: typeDocument.CE,
    document: '5433443',
    photo: 'dfdfccrgbfgfgfgff',
  },
];