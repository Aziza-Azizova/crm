import { db } from "../../database/connection";
import { TaskUpdate } from "../schemas/task.schema";

export class TaskModel {
  static async create(newTask: {title: string, status: string, priority: number}){
  const task = await db.insert(newTask).returning('*').into('tasks');
  return task;
 }

 static async findById(taskId: string){
  const task = await db.select().from('tasks').where('id', taskId);
  return task;
 }

 static async update(taskId: string, value: TaskUpdate ){
  const project = await db('tasks').where('id', taskId).update(value).returning('*');
  return project;
 }
}