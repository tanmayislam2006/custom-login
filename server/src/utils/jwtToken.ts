import jwt from "jsonwebtoken";
import config from "../config";
export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, config.accessTokenSecret as string, {
    expiresIn: "1h",
  });
};
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, config.refreshTokenSecret as string, {
    expiresIn: "7d",
  });
};
