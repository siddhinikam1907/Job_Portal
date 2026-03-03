import React from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your
          <span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>
        <p className="text-sm text-gray-600">
          Discover your next career move with our smart and simple job search
          platform.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-full pl-3 items-center gap-4 mx-auto ">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#5a2c9e] w-12 h-10 flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
