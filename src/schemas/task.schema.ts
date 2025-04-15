import { z } from 'zod';

export const taskCreationSchema = z.object({
 title: z.string().min(3, 'Title at least should be 3 characters'),
 status: z.enum(['todo', 'in_progress', 'done']),
 priority: z.number().max(3, 'Priority must be 3 or less'),
})

export const taskUpdateSchema = z.object({
 title: z.string().min(3, 'Title at least should be 3 characters').optional(),
 status: z.enum(['todo', 'in_progress', 'done']).optional(),
 priority: z.number().max(3, 'Priority must be 3 or less').optional(),
})

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;