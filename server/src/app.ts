import express, { Request, Response } from "express";
import logger from "./middleware/logger";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { billRoutes } from "./modules/bills/bills.routes";
const app = express();
app.use(express.json());
// TODO initializing DB
initDB()
app.get("/",logger, (req: Request, res: Response) => {
  res.send(`Hello Server "_"`);
});
// !==> auth routes 
app.use('/auth',authRoutes)
// app.post("/api/bill/create", (req: Request, res: Response) => {
//   res.send(`Hello Bill Creation "_"`);
// });
// !==> bill routes
app.use('/api/bill',billRoutes)
export default app