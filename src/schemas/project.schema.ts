import { z } from 'zod';

export const projectCreationSchema = z.object({
 name: z.string().min(3, 'Project name at least should be 3 characters'),
})