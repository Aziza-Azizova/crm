import { factory } from 'factory-girl';
import sinon from 'sinon';
import { expect } from 'chai';
import { db } from '../../database/connection';
import { UserModel } from '../models/users.model';
import { User } from '../types/users.type';
import './factories/user.factory';


describe('User Model', () => {
 beforeEach(() => {
  sinon.restore();
 });

 it('should find user by email', async () => {
  const user: User = await factory.attrs('user');

  sinon.stub(db, 'select').returnsThis();
  sinon.stub(db, 'from').returnsThis();
  const whereStub = sinon.stub().resolves([user])
  sinon.stub(db, 'where').callsFake(whereStub);

  const res = await UserModel.findByEmail(user.email);

  expect(res).to.be.deep.eq(res);
  expect(res[0]).to.have.property('name');
  expect(res[0]).to.have.property('email');
 });

 it('should create new user', async () => {
  const user: User = await factory.attrs('user');

  sinon.stub(db, 'insert').returnsThis();
  sinon.stub(db, 'returning').returnsThis();
  const intoStub = sinon.stub().resolves([user])
  sinon.stub(db, 'into').callsFake(intoStub);

  const res = await UserModel.create(user);

  expect(res).to.be.deep.eq([user]);
  expect(res[0]).to.have.property('name');
  expect(res[0]).to.have.property('email');
 });
})