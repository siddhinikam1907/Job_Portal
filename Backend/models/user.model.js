import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL or file path to the resume
      resumeOriginalName: { type: String }, // Original name of the uploaded resume file
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePicture: { type: String, default: "" }, // URL or file path to the profile picture
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
