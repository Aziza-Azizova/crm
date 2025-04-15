import { db } from "../../database/connection";

export class ProjectModel {
  static async create(newProject: { name: string }) {
    const project = await db.insert(newProject).returning('*').into('projects');
    return project;
  }

  static async getById(id: string) {
    const project = await db.select().from('projects').where('id', id);
    return project;
  }

  static async getProjectsWithFilters(filters: { total?: number; todo?: number; in_progress?: number; done?: number; }) {
    let query = db.from('projects')
    .leftJoin('tasks', 'projects.id', 'tasks.project_id')
    .select('projects.*',
      db.raw('COUNT(tasks.id) as total_tasks'),
      db.raw("COUNT(*) FILTER (WHERE tasks.status = 'todo') as todo_tasks"),
      db.raw("COUNT(*) FILTER (WHERE tasks.status = 'done') as done_tasks"),
      db.raw("COUNT(*) FILTER (WHERE tasks.status = 'in_progress') as in_progress_tasks")
    )
    .groupBy('projects.id')

    if(filters.total) {
      query = query.havingRaw("COUNT(tasks.id) = ?", [filters.total]);
    }

    if(filters.todo) {
      query = query.havingRaw("COUNT(*) FILTER (WHERE tasks.status = 'todo') = ?", [filters.todo]);
    }

    if(filters.in_progress) {
      query = query.havingRaw("COUNT(*) FILTER (WHERE tasks.status = 'in_progress') = ?", [filters.in_progress]);
    }

    if(filters.done) {
      query = query.havingRaw("COUNT(*) FILTER (WHERE tasks.status = 'done') = ?", [filters.done]);
    }

    return query;
  }
}