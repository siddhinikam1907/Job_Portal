import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import Navbar from "./shared/Navbar.jsx";
import { Button } from "./ui/button.jsx";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Label } from "./ui/label.jsx";
import AppliedJobTable from "./AppliedJobTable.jsx";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/UseGetAppliedJobs.jsx";

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log("REDUX USER:", user);
  console.log("REDUX PROFILE:", user?.profile);
  console.log("REDUX RESUME:", user?.profile?.resume);

  // Debug re-render
  useEffect(() => {
    console.log("PROFILE UPDATED:", user);
  }, [user]);

  const skills = user?.profile?.skills || [];
  const resumeUrl = user?.profile?.resume;
  const resumeName = user?.profile?.resumeOriginalName;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Header Section */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6scxpe6rajLKjeev7OAVFVHHPSX7xCZpCQ&s"
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname || "NA"}</h1>
              <p>{user?.profile?.bio || "No bio added"}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "NA"}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "NA"}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {skills.length > 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label className="text-md font-bold">Resume</Label>

          {resumeUrl && resumeName ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {resumeName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
