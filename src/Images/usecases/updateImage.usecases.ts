import { IImageRepository } from '../domain/repositories/image.respository';

export class updateImageUseCases {
  constructor(private readonly imageRepository: IImageRepository) {}
  async exec(id: string, payload: any) {
    return await this.imageRepository.update(id, payload);
  }
}
