import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/post-job").post(isAuthenticated, postJob);
router.route("/get-all-jobs").get(isAuthenticated, getAllJobs);
router.route("/get-job-by-id/:id").get(isAuthenticated, getJobById);
router.route("/get-admin-jobs").get(isAuthenticated, getAdminJobs);
export default router;
