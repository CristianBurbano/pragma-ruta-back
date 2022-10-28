import { User } from '../domain/model/user';
import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class addUserUseCases {
  constructor(private readonly userRepository: IuserRepository) {}
  async execute(payload: any): Promise<User> {
    const result = await this.userRepository.createUser(payload as User);
    return result;
  }
}
