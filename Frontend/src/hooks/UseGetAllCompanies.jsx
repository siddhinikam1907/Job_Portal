import { COMPANY_API_END_POINT } from "@/utils/constant.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllCompanies } from "@/redux/companySlice.js";
function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
}

export default useGetAllCompanies;
