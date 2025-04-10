import { db } from "../../database/connection";

export class UserModel {
 static async findByEmail(email: string){
  const user = await db.select().from('users').where('email', email);
  return user;
 }

 static async create(newUser: {name: string, email: string}){
  const user = await db.insert(newUser).returning('*').into('users');
  return user;
 }
}