import { Request, Response } from 'express';
import { db } from '../../database/connection';
import { TaskModel } from '../models/tasks.model';

export async function createTask(req: Request, res: Response) {
 const newTask = {
  ...req.body,
  project_id: req.params.id
 }

 try {
  const task = await TaskModel.create(newTask);
  res.status(200).send({
   message: 'Task successfully created',
   data: task[0]
  });

 } catch (error) {
  res.status(500).send({
   message: 'Failed to create task',
   error
  });
 }
}

export async function updateTask(req: Request, res: Response) {
 try {
  const task = await TaskModel.findById(req.params.taskId);
  if (!task[0]) {
   res.status(404).send({ message: 'Task not found' });
   return;
  }

  const updatedTask = await TaskModel.update(req.params.taskId, req.body);
  res.status(200).send({
   message: 'Task successfully updated',
   data: updatedTask[0]
  });

 } catch (error) {
  res.status(500).send({
   message: 'Failed to update task',
   error
  });
 }
}