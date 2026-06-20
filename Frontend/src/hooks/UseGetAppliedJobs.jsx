import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant.js";
import { setAllAppliedJobs } from "@/redux/jobSlice.js";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (!user) {
          dispatch(setAllAppliedJobs([])); // clear if no user
          return;
        }

        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/getAppliedJobs`,
          { withCredentials: true },
        );

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications || []));
        } else {
          dispatch(setAllAppliedJobs([]));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllAppliedJobs([])); // clear on error
      }
    };

    fetchAppliedJobs();
  }, [user, dispatch]); // ⭐ important
};

export default useGetAppliedJobs;
