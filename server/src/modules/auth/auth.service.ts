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
    [refreshToken, user.id]
  );

  return { user, accessToken, refreshToken };
};
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const userInfoInDb = result.rows[0];
  const passWordMatch = await bcrypt.compare(password, userInfoInDb.password);
  if (!passWordMatch) {
    return false;
  }
};
export const authService = {
  registerUser,
  loginUser,
};

