import { NextFunction, Request, Response } from "express";
import z from "zod";
import { ValidationError } from "../apperrors/AppError";

export const validate = (schema: z.ZodObject<any>) => (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {

  const validation = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

  if (!validation.success) {

    next(new ValidationError('Validation failed',
      validation.error.issues));
    return;
  }

  req.body = validation.data.body;

  next();
}
