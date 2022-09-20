import Files from '../infra/typeorm/schemas/Files';

export default interface IListFilesResponseDTO {
  files: Files[];
  count: number;
}
