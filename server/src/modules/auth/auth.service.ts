import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwtToken";

const registerUser = async (userInfo: Record<string, unknown>) => {
  const { name, email, password, age, phone, address, role } = userInfo;
  const hashPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    ` INSERT INTO users(name,email,password,role,age,phone,address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * `,
    [name, email, hashPassword, role, age, phone, address]
  );
  //   userinfo
  const user = result.rows[0];
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
  });
  await pool.query(
    `INSERT INTO refreshTokens(token,user_id) VALUES($1,$2) RETURNING *`,
    [ refreshToken,user.id]
  );

  return { user, accessToken, refreshToken };
};
export const authService = {
  registerUser,
};
