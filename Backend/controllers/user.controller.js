import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDatauri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePicture: cloudResponse.secure_url,
      },
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.log("Error in user registration:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "Account does not exist for the selected role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `${user.fullname} logged in successfully`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Error in user login:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in user logout:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const fileUri = getDatauri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update normal fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email.toLowerCase();
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // Skills
    if (skills) {
      const skillsArray = skills
        .split(/[,\s]+/)
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      user.profile.skills = skillsArray;
    }

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in updating profile:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.id; //midlleware will add id to req object
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in getting profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
