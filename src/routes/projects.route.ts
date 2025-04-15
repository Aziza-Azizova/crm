import express from 'express';
import { createProject, getProject, getProjectsList } from '../controllers/projects.controller';
import { verifyToken } from '../middlewares/verify-token.middleware';
import { validationData } from '../middlewares/validation.middleware';
import { projectCreationSchema } from '../schemas/project.schema';


const router = express.Router();

router.post('/projects', verifyToken, validationData(projectCreationSchema), createProject);
router.get('/projects/:id', getProject);
router.get('/projects', getProjectsList);

export const projectRoutes = router;