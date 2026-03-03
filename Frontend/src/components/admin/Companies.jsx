import React, { useEffect } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import CompaniesTable from "./CompaniesTable.jsx";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/UseGetAllCompanies.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companySlice.js";
function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setsearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
