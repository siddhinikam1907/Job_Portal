import React, { useEffect, useState } from "react";
import {
  TableCaption,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../ui/table.jsx";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

function AdminJobsTable() {
  const navigate = useNavigate();

  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job,
  );

  const [filterJobs, setFilterJobs] = useState([]);

  // 🔎 Filter Logic
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't posted any job yet !!
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                {/* Company Name */}
                <TableCell>{job?.company?.name || "N/A"}</TableCell>

                {/* Role */}
                <TableCell>{job?.title || "N/A"}</TableCell>

                {/* Date */}
                <TableCell>
                  {job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                      >
                        <Eye />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
