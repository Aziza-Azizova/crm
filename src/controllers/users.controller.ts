import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/users.type';
import dotenv from 'dotenv';
import { UserModel } from '../models/users.model';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

export async function createUser(req: Request, res: Response) {
  try {
    const existingUser = await UserModel.findByEmail(req.body.email);
    if (existingUser[0]) {
      res.status(409).send({ message: 'User with this email already exists' });
      return;
    }

    const user: User[] = await UserModel.create(req.body);
    const createdUser = user[0];
    const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, secret, { expiresIn: '7d' })

    res.status(200).send({
      message: 'User successfully created',
      data: user,
      token
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).send({
      message: 'Failed to create user',
      error
    });
  }
}