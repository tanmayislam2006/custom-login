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
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result =await authService.loginUser(email,password)
    console.log(result);
    res.send(result)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const { user, accessToken, refreshToken } =
//       await authService.loginUser(email, password);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: {
//         user,
//         accessToken,
//         refreshToken,
//       },
//     });
//   } catch (error: any) {
//     return res.status(error.statusCode || 400).json({
//       success: false,
//       message: error.message || "Login failed",
//     });
//   }
// };
export const authController = {
  register,
  login,
};
