import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { pipeline } from 'node:stream/promises';

import ListFileService from '@modules/files/services/ListFileService';
import UploadFileService from '@modules/files/services/UploadFileService';
import DeleteFileService from '@modules/files/services/DeleteFileService';

class FilesController {
  public async create(req: Request, res: Response): Promise<void> {
    const { busboy } = req;

    const uploadFileService = container.resolve(UploadFileService);

    busboy
      .on('file', async (_, file, info) => {
        const { filename: original_name, mimeType } = info;

        const fileData = await uploadFileService.execute({
          file,
          type: mimeType,
          original_name,
        });

        return res.status(200).json(instanceToInstance(fileData));
      })
      .on('error', error => {
        return res.status(400).json(error);
      });

    await pipeline(req, busboy);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { page, per_page } = req.query;

    const listFileService = container.resolve(ListFileService);

    const { files, pagination } = await listFileService.execute({
      page: Number(page) || 1,
      per_page: Number(per_page) || 10,
    });

    return res.json({
      files: instanceToInstance(files),
      pagination,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteFileService = container.resolve(DeleteFileService);

    await deleteFileService.execute(id);

    return res.status(204).json({});
  }
}

export default FilesController;
