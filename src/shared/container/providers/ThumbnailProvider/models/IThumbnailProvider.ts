import IGenerateThumbnail from '../dtos/IGenerateThumbnail';

export default interface IThumbnailProvider {
  generate(data: IGenerateThumbnail): Promise<string>;
}
