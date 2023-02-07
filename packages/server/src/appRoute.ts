import express, { Router } from 'express';
import { ApiRoutes } from '@smartesting/shared/dist';
const router  = express.Router();



 function setRoutes() : Router {
    router.post(ApiRoutes.alteration(), );

      return router;
}

export default setRoutes;
