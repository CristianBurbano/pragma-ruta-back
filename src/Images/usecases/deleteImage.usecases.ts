import { IImageRepository } from '../domain/repositories/image.respository';

export class deleteImageUseCases {
  constructor(private readonly userRepository: IImageRepository) {}
  async exec(id: string) {
    return this.userRepository.delete(id);
  }
}
