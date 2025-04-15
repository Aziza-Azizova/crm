import { Request, Response } from 'express';
import { Project } from '../types/projects.type';
import { ProjectModel } from '../models/projects.model';

export async function createProject(req: Request, res: Response) {
 const { id: userId } = req.user;
 const newProject: Project = {
  ...req.body,
  owner_id: userId
 }

 try {
  const project = await ProjectModel.create(newProject);
  res.status(200).send({
   message: 'Project successfully created',
   data: project[0]
  });
 } catch (error) {
  res.status(500).send({
   message: 'Failed to create project',
   error
  });
 }
}

export async function getProject(req: Request, res: Response) {
 try {
  if (!req.params.id) res.status(404).send({ message: 'No project found' });

  const project = await ProjectModel.getById(req.params.id);
  if(!project[0]) {
   res.status(404).send({ message: 'Project Not Found'});
   return;
  }

  res.status(200).send({
   message: 'Project successfully found',
   data: project[0]
  });

 } catch (error) {
  res.status(500).send({
   message: 'Failed to get project',
   error
  });
 }
} 

export async function getProjectsList(req: Request, res: Response) {
 try {
  const {total, todo, in_progress, done } = req.query;

  const projects = await ProjectModel.getProjectsWithFilters({total: Number(total), todo: Number(todo), in_progress: Number(in_progress), done: Number(done)});
  if(!projects) {
   res.status(404).send({ message: 'Projects Not Found'});
   return;
  }

  res.status(200).send({
   message: 'Projects successfully fetched',
   data: projects
  });

 } catch (error) {
  res.status(500).send({
   message: 'Failed to get project',
   error
  });
 }
} 