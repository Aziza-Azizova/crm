import { db } from "../../database/connection";

export class ProjectModel {
  static async create(newProject: {name: string}){
  const project = await db.insert(newProject).returning('*').into('projects');
  return project;
 }

 static async getById(id: string){
  const project = await db.select().from('projects').where('id', id);
  return project;
 }
}