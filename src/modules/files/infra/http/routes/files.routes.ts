import { Router } from 'express';

import FilesController from '../controllers/FilesController';
import uploadFilesMiddleware from '../middlewares/uploadFilesMiddleware';

const filesRouter = Router();

const filesController = new FilesController();

filesRouter.get('/', filesController.list);
filesRouter.post('/', uploadFilesMiddleware, filesController.create);
filesRouter.delete('/:id', filesController.delete);

export default filesRouter;
