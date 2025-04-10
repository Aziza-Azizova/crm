import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export function validationData(schema: ZodObject<any, any>){
 return (req: Request, res: Response, next: NextFunction) => {
  try {
   schema.parse(req.body);
   next();
  } catch (error) {
   res.status(500).send({
    message: 'Validation error',
    error
   })
  }
 }
}