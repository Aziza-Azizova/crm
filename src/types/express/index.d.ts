import { User } from "../users.type";

declare global {
 namespace Express {
  interface Request {
   user: User
  }
 }
}