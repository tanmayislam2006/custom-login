import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwtToken";

const registerUser = async (userInfo: Record<string, unknown>) => {
  const { name, email, password, age, phone, address, role } = userInfo;

  const exists = await pool.query(`SELECT id FROM users WHERE email=$1`, [
    email,
  ]);
  if (exists.rows.length) throw new Error("Email already in use");

  const hashPassword = await bcrypt.hash(password as string, 10);

  await pool.query(
    `
    INSERT INTO users(name,email,password,role,age,phone,address)
    VALUES($1,$2,$3,$4,$5,$6,$7)
  `,
    [name, email, hashPassword, role, age, phone, address]
  );

  return { message: "Account created successfully" };
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("user not found ");
  }
  const userInfoInDb = result.rows[0];
  const passWordMatch = await bcrypt.compare(password, userInfoInDb.password);
  if (!passWordMatch) {
    throw new Error("wrong email or password");
  }
  const accessToken = await generateAccessToken({
    id: userInfoInDb.id,
    email: userInfoInDb.email,
    role: userInfoInDb.role,
  });
  const refreshToken = await generateRefreshToken({
    id: userInfoInDb.id,
    email: userInfoInDb.email,
  });
  const responseData = {
    id: userInfoInDb.id,
    name: userInfoInDb.name,
    accessToken,
    email: userInfoInDb.email,
    role: userInfoInDb.role,
    accessTokenExpiresAt: "1 hour",
  };
  return responseData;
};
export const authService = {
  registerUser,
  loginUser,
};
