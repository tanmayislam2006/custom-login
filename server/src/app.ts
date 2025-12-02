import express, { Request, Response } from "express";
import logger from "./middleware/logger";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
app.use(express.json());
// TODO initializing DB
initDB()
app.get("/",logger, (req: Request, res: Response) => {
  res.send(`Hello Server "_"`);
});
// !==> auth routes 
app.use('/auth',authRoutes)
export default app