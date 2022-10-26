import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Imagen {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  bs64: string;
}
