import { IuserRepository } from '../domain/repositories/userRepository.interface';

export class deleteUserUseCases {
  constructor(private readonly userRepository: IuserRepository) {}
  async exec(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
