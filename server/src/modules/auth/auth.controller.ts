import { Request, Response } from "express";
import { authService } from "./auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.registerUser(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  register,
};
