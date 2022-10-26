import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum typeDocument {
  CC,
  TI,
  CE,
}

export interface IPersona {
  firstName: string;
  middleName: string;
  age: number;
  birthplace: string;
  photo: string;
  documentType: typeDocument;
  document: string;
  createAt: Date;
  updateAt: Date;
}

@Entity()
export class Persona implements IPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  middleName: string;
  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'varchar' })
  birthplace: string;
  @Column()
  photo: string;
  @Column()
  document: string;
  @Column()
  documentType: typeDocument;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  // constructor(data: IPersona) {
  //   this.birthplace = data.birthplace;
  //   this.age = data.age;
  //   this.firstName = data.firstName;
  // this.document = {
  //   tipo: data.document.tipo,
  //   valor: data.document.valor,
  // };
  // }
}

// interface IIdentificacion {
//   tipo: string;
//   valor: string;
// }

// export class Identificacion implements IIdentificacion {
//   tipo: string;
//   valor: string;
//   // constructor(tipo: string, valor: string) {
//   //   this.tipo = tipo;
//   //   this.valor = valor;
//   // }
// }
