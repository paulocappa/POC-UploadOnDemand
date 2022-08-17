import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import { pipeline } from 'node:stream/promises';

import ListFileService from '@modules/files/services/ListFileService';
import UploadFileService from '@modules/files/services/UploadFileService';

class FilesController {
  public async create(req: Request, res: Response): Promise<void> {
    const { user_id, busboy } = req;
    const { socketId } = req.query;

    const uploadFileService = container.resolve(UploadFileService);

    busboy
      .on('file', async (_, file, info) => {
        const { filename: original_name } = info;

        await uploadFileService.execute({
          user_id,
          socket_id: socketId as string,
          file,
          original_name,
        });
      })
      .on('error', error => {
        console.error(error);
      })
      .on('finish', () => {
        res.status(204).json({});
      });

    await pipeline(req, busboy);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { user_id } = req;

    const listFileService = container.resolve(ListFileService);

    const files = await listFileService.execute(user_id);

    return res.json(instanceToInstance(files));
  }
}

export default FilesController;
