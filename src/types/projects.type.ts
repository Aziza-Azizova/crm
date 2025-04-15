export interface Project {
 id: string;
 name: string;
 ownerId: string;
}

export interface Filters {
 total?: number;
 todo?: number;
 in_progress?: number;
 done?: number
}