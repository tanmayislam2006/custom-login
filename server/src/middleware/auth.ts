import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }
      const decodedToken = jwt.verify(
        token,
        config.accessTokenSecret as string
      ) as JwtPayload;
      req.user = decodedToken;
      if (roles.length && !roles.includes(decodedToken.role as string)) {
        return res.status(500).json({
          error: "unauthorized!!!",
        });
      }
      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};
export default auth;
