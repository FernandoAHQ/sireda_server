

import { Router } from 'express';
import { login, register, renew, validateUsername } from '../controllers/auth.controllers';
import { verifyJwt } from '../middlewares/verify-jwt.middleware';


const router: Router = Router();

router.post('/register', register )

router.post('/login', login )

router.get('/validate/:username', validateUsername )

router.get('/renew', verifyJwt , renew )


export default router;