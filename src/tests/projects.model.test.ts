import { factory } from 'factory-girl';
import sinon from 'sinon';
import { expect } from 'chai';
import { db } from '../../database/connection';
import { Filters, Project } from '../types/projects.type';
import { ProjectModel } from '../models/projects.model';
import './factories/project.factory';
import './factories/filters.factory';


describe('Projects Model', () => {
 beforeEach(() => {
  sinon.restore();
 });

 it('should create new project', async () => {
  const project: Project = await factory.attrs('project');

  sinon.stub(db, 'insert').returnsThis();
  sinon.stub(db, 'returning').returnsThis();
  const intoStub = sinon.stub().resolves(project)
  sinon.stub(db, 'into').callsFake(intoStub);

  const res = await ProjectModel.create({ name: project.name });

  expect(res).to.be.deep.eq(project);
  expect(res).to.have.property('name');
  expect(res).to.have.property('owner_id');
 });

 it('should get project by ID', async () => {
  const project: Project = await factory.attrs('project');

  sinon.stub(db, 'select').returnsThis();
  sinon.stub(db, 'from').returnsThis();
  const whereStub = sinon.stub().resolves([project])
  sinon.stub(db, 'where').callsFake(whereStub);

  const res = await ProjectModel.getById(project.id);

  expect(res).to.be.deep.eq([project]);
  expect(res[0]).to.have.property('name');
  expect(res[0]).to.have.property('owner_id');
 });

 it('should get projects with filters', async () => {
  const projects: Project[] = await factory.attrs('projects');
  const filters: Filters = await factory.attrs('filters');

  const queryStub = {
   leftJoin: sinon.stub().returnsThis(),
   select: sinon.stub().returnsThis(),
   groupBy: sinon.stub().returnsThis(),
   havingRaw: sinon.stub().returnsThis(),
   then: sinon.stub().callsFake((cb) => cb(projects))
  }
  sinon.stub(db, 'from').returns(queryStub as any);

  const res = await ProjectModel.getProjectsWithFilters(filters);

  expect(res).to.be.deep.eq(projects);
 });
})