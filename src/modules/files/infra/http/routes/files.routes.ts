import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FilesController from '../controllers/FilesController';
import uploadFilesMiddleware from '../middlewares/uploadFilesMiddleware';

const filesRouter = Router();

const filesController = new FilesController();

filesRouter.use(ensureAuthenticated);

filesRouter.post('/', uploadFilesMiddleware, filesController.create);
filesRouter.get('/', filesController.list);

export default filesRouter;
