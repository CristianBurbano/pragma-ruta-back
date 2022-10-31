import { IImageRepository } from 'src/Images/domain/repositories/image.respository';
import { User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class addUserUseCases {
  constructor(
    private readonly userRepository: IuserRepository,
    private readonly imageRepository: IImageRepository,
  ) {}
  async execute(payload: any): Promise<User> {
    const image = await this.imageRepository.create({
      bs64: payload.photo,
      name: payload.firstName + payload.lastName + new Date().getTime(),
      id: null,
    });
    const result = await this.userRepository.createUser({
      ...payload,
      photo: image.id,
    });
    return result;
  }
}
