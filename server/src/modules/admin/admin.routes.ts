import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";

const router = Router();
router.get("/all-users", auth("admin"), adminController.getAllUSers);
export const adminRoutes = router;
