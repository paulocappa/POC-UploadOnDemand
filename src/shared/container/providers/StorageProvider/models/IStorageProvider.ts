import ISaveFileDTO from '../dtos/ISaveFileDTO';

export default interface IStorageProvider {
  saveFile(data: ISaveFileDTO): Promise<number>;
  deleteFile(filename: string): Promise<void>;
}
