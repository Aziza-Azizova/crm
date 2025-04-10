import express from 'express';
import { createUser } from '../controllers/users.controller';
import { validationData } from '../middlewares/validation.middleware';
import { userCreationSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/users', validationData(userCreationSchema), createUser);

export const userRoutes = router;