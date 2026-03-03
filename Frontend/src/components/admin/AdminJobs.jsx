import React, { useEffect } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice.js";
import useGetAllAdminJobs from "@/hooks/UseGetAllAdminJobs.jsx";
function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/post")}>
            Post New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
