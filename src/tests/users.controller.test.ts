import sinon from 'sinon';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { factory } from 'factory-girl';
import { User } from '../types/users.type';
import { UserModel } from '../models/users.model';
import { createUser } from '../controllers/users.controller';
import './factories/user.factory';

describe('User controller', () => {
 afterEach(() => {
  sinon.restore();
 });

 it('should create new user', async () => {
  const user: User = await factory.attrs('user');
  const req = { body: user } as Request
  const res = {
   status: sinon.stub().returnsThis(),
   send: sinon.stub()
  } as unknown as Response;

  sinon.stub(UserModel, 'findByEmail').resolves([]);
  sinon.stub(UserModel, 'create').resolves([user]);
  sinon.stub(jwt, 'sign').callsFake(() => 'mocked-jwt-token');

  await createUser(req, res);

  expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.be.true;
  expect((res.send as sinon.SinonStub).calledOnceWithExactly({
   message: 'User successfully created',
   data: [user],
   token: 'mocked-jwt-token'
  })).to.be.true;
 })
})