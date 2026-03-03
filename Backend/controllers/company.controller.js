import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";
export const registerCompany = async (req, res) => {
  try {
    if (req.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can create companies",
        success: false,
      });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false,
      });
    }
    company = await Company.create({
      name,
      userId: req.id, //middleware will add id to req object
    });
    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in company registration:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log("Error in getting company details:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company found",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in getting company by ID:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileUri = getDatauri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;
    const companyId = req.params.id;

    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    // First: Role check
    if (req.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can update companies",
        success: false,
      });
    }

    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
        success: false,
      });
    } //so giving authorization to update company details only to the user who created the company

    company.name = name || company.name;
    company.description = description || company.description;
    company.website = website || company.website;
    company.location = location || company.location;
    company.logo = logo || company.logo;

    await company.save();

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in updating company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
