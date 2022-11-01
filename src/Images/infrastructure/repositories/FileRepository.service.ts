import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { FileS3Response } from 'src/Images/domain/model/file';
import { IFileRepository } from 'src/Images/domain/repositories/file.repository';

@Injectable()
export class FileRepository implements IFileRepository {
  private client: S3Client;
  private getUrl(bucketname: string, filename: string): string {
    return `${bucketname}.s3.amazonaws.com/${filename}`;
  }

  async insert(file: Express.Multer.File): Promise<FileS3Response> {
    const nameSepared = file.originalname.split('.');
    const extension = nameSepared[nameSepared.length - 1];
    const bucket = 'pragma-ruta-back-clean-architecture-cristian-burbano';
    const name = new Date().getTime().toString() + '.' + extension;
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: name,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return {
        filename: name,
        url: this.getUrl(bucket, name),
      };
    } catch (e) {
      console.log('error', e);
      throw new Error('No se pudo guardar imagen');
    }
  }
  async delete(filename: string): Promise<void> {
    const result = await this.client.send(
      new DeleteObjectCommand({
        Bucket: 'pragma-ruta-back-clean-architecture-cristian-burbano',
        Key: filename,
      }),
    );
    console.log(result);
  }

  constructor() {
    this.client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'DDEFED',
        secretAccessKey: 'DFEDEDEFE',
      },
    });
  }
}
