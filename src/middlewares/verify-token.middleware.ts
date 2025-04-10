import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types/users.type';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
 const token = req.headers.authorization?.split(' ')[1];

 if (!token) {
  res.status(401).send({ message: 'Unauthorized' });
  return;
 }

 try {
  const user = jwt.verify(token, secret) as User;
  req.user = user;
  next();
 } catch (error) {
  res.status(500).send({
   message: 'Failed to verify token',
   error
  });
 }
};
