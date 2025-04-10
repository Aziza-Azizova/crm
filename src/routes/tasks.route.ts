import express from 'express';
import { createTask, updateTask } from '../controllers/tasks.controller';
import { validationData } from '../middlewares/validation.middleware';
import { taskCreationSchema, taskUpdateSchema } from '../schemas/task.schema';


const router = express.Router();

router.post('/projects/:id/tasks', validationData(taskCreationSchema), createTask);
router.patch('/projects/:id/tasks/:taskId', validationData(taskUpdateSchema), updateTask);

export const tasksRoutes = router;