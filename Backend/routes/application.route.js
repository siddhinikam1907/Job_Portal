import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/getAppliedJobs").get(isAuthenticated, getAppliedJobs);
router.route("/getApplicants/:id").get(isAuthenticated, getApplicants);
router.route("/updateStatus/:id").put(isAuthenticated, updateStatus);

export default router;
