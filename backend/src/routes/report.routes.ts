import { Router } from "express";
import * as reportController from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, reportController.createReport);
//router.get("/", reportController.listReports);
//router.get("/:id", reportController.getReportById);

export default router;
