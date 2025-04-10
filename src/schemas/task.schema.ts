import { z } from 'zod';

export const taskCreationSchema = z.object({
 title: z.string().min(3, 'Title at least should be 3 characters'),
 status: z.enum(['todo', 'in_progress', 'done'])
})

export const taskUpdateSchema = z.object({
 title: z.string().min(3, 'Title at least should be 3 characters').optional(),
 status: z.enum(['todo', 'in_progress', 'done']).optional()
})

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;