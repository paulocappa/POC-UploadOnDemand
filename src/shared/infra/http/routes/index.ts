import { Router } from 'express';

import filesRouter from '@modules/files/infra/http/routes/files.routes';

const routes = Router();

routes.use('/files', filesRouter);

export default routes;
