enum Status {
 TODO = "todo",
 IN_PROGRESS = "in_progress",
 DONE = "done",
}

export interface Project {
 id: string;
 name: string;
 ownerId: string;
}