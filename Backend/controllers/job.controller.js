import Job from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    if (req.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can post jobs",
        success: false,
      });
    }
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const requirementsArray = requirements.split(",");

    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary,
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in posting job:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    /*  Find jobs where:
title contains "react"
OR
description contains "react" */
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate({ path: "company" });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting all jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting job by id:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting admin jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
