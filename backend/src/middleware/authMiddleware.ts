import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // console.log("token")
  const token = req.header('Authorization')?.split(" ")[2]
  // console.log("token is", token)
  if (!token) {
    // console.log("token not found")
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  try {
    // console.log("verifying")
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // console.log(decoded)
            // @ts-ignore 
    req.userId = decoded.userId;
    // console.log("done")
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};
