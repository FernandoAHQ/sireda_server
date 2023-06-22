

import { Router } from 'express';
import { findAll, findOne, register, signup } from '../controllers/course.controllers';
import { verifyJwt } from '../middlewares/verify-jwt.middleware';


const router: Router = Router();

 router.post('/register', register )

 router.get('/all', findAll )

router.post('/signup', signup);

 router.get('/details/:id', findOne)

// router.get('/renew', verifyJwt , renew )


export default router;