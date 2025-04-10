import express from 'express';
import { createProject, getProject } from '../controllers/projects.controller';
import { verifyToken } from '../middlewares/verify-token.middleware';
import { validationData } from '../middlewares/validation.middleware';
import { projectCreationSchema } from '../schemas/project.schema';


const router = express.Router();

router.post('/projects', verifyToken, validationData(projectCreationSchema), createProject);
router.get('/projects/:id', getProject);

export const projectRoutes = router;