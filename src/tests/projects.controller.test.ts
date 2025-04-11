import sinon from 'sinon';
import { Request, Response } from 'express';
import { factory } from 'factory-girl';
import { expect } from 'chai';
import { Project } from '../types/projects.type';
import { ProjectModel } from '../models/projects.model';
import { createProject, getProject } from '../controllers/projects.controller';
import './factories/user.factory';
import './factories/project.factory';

describe('Project controller', () => {
 afterEach(() => {
  sinon.restore();
 });

 it('should create new project', async () => {
  const project: Project = await factory.attrs('project');
  const user: Project = await factory.attrs('user');
  const req = { body: project, user } as unknown as Request
  const res = {
   status: sinon.stub().returnsThis(),
   send: sinon.stub()
  } as unknown as Response;

  sinon.stub(ProjectModel, 'create').resolves([project]);

  await createProject(req, res);

  expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.be.true;
  expect((res.send as sinon.SinonStub).calledOnceWithExactly({
   message: 'Project successfully created',
   data: project,
  })).to.be.true;
 })

 it('should get project by ID', async () => {
  const project: Project = await factory.attrs('project');
  const req = { params: { id: project.id}} as unknown as Request
  const res = {
   status: sinon.stub().returnsThis(),
   send: sinon.stub()
  } as unknown as Response;

  sinon.stub(ProjectModel, 'getById').resolves([project]);

  await getProject(req, res);

  expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.be.true;
  expect((res.send as sinon.SinonStub).calledOnceWithExactly({
   message: 'Project successfully found',
   data: project,
  })).to.be.true;
 })
})