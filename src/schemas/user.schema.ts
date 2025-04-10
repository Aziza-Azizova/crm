import { z } from 'zod';

export const userCreationSchema = z.object({
 name: z.string().min(3, 'Name at least should be 3 characters'),
 email: z.string().email()
})