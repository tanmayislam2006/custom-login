import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";
export const generateAccessToken = async (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.accessTokenSecret as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      }
    );
  });
};
// export const generateAccessToken = (payload: object): string => {
//   return jwt.sign(payload, config.accessTokenSecret as string, {
//     expiresIn: "1h",
//   });
// };
// export const generateRefreshToken = (payload: object): string => {
//   return jwt.sign(payload, config.refreshTokenSecret as string, {
//     expiresIn: "7d",
//   });
// };
// export const generateRefreshToken = async (
//   payload: object
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     jwt.sign(
//       payload,
//       config.refreshTokenSecret as string,
//       { expiresIn: "7d" },
//       (err, token) => {
//         if (err || !token) return reject(err);
//         resolve(token);
//       }
//     );
//   });
// };
export const generateRefreshToken = async (payload: { id: number; email: string }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Delete old token
      await pool.query(`DELETE FROM refreshTokens WHERE user_id=$1`, [payload.id]);

      // 2. Create new refresh token
      jwt.sign(
        payload,
        config.refreshTokenSecret as string,
        { expiresIn: "7d" },
        async (err, token) => {
          if (err || !token) return reject(err);

          // 3. Save new token in DB
          await pool.query(
            `INSERT INTO refreshTokens(token, user_id) VALUES($1,$2)`,
            [token, payload.id]
          );

          resolve(token);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

