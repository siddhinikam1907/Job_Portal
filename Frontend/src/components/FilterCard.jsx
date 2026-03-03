import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.jsx";
import { Label } from "./ui/label.jsx";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1Lakh", "1Lakh-5Lakh"],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white rounded-md p-3">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4 flex flex-col">
            <h2 className="font-semibold mb-2">{data.filterType}</h2>

            {data.array.map((item, idx) => {
              const id = `${data.filterType}-${idx}`;
              return (
                <div
                  key={id}
                  className="flex items-center space-x-2 mb-1 my-2 "
                >
                  <RadioGroupItem value={item} id={id} />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
