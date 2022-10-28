import { Image } from '../domain/model/Image';
import { IImageRepository } from '../domain/repositories/image.respository';

export class addImageUseCases {
  constructor(private readonly imageRepository: IImageRepository) {}
  async execute(payload: any): Promise<Image> {
    const result = await this.imageRepository.create(payload as Image);
    return result;
  }
}
