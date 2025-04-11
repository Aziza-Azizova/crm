import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { factory } from 'factory-girl';
import { Project } from '../types/projects.type';
import { createTask, updateTask } from '../controllers/tasks.controller';
import { TaskModel } from '../models/tasks.model';
import './factories/task.factory';

describe('Project controller', () => {
 afterEach(() => {
  sinon.restore();
 });

 it('should create new task', async () => {
  const task: Project = await factory.attrs('task');
  const project: Project = await factory.attrs('project');
  const req = { body: task, params: { id: project.id } } as unknown as Request
  const res = {
   status: sinon.stub().returnsThis(),
   send: sinon.stub()
  } as unknown as Response;

  sinon.stub(TaskModel, 'create').resolves([task]);

  await createTask(req, res);

  expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.be.true;
  expect((res.send as sinon.SinonStub).calledOnceWithExactly({
   message: 'Task successfully created',
   data: task,
  })).to.be.true;
 })

 it('should update task by ID', async () => {
  const task: Project = await factory.attrs('task');
  const req = { params: { taskId: task.id}} as unknown as Request
  const res = {
   status: sinon.stub().returnsThis(),
   send: sinon.stub()
  } as unknown as Response;

  sinon.stub(TaskModel, 'findById').resolves([task]);
  sinon.stub(TaskModel, 'update').resolves([task]);

  await updateTask(req, res);

  expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.be.true;
  expect((res.send as sinon.SinonStub).calledOnceWithExactly({
   message: 'Task successfully updated',
   data: task,
  })).to.be.true;
 })
})