import { FileS3Response } from '../model/file';

export interface IFileRepository {
  insert(file: Express.Multer.File): Promise<FileS3Response>;
  delete(filename: string): Promise<void>;
}
