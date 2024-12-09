'use client'
import { useEffect } from "react";
import Loader from "@/utils/helpers/loader";
import { isAuthenticated } from "@/utils/auth";

const Home=()=>{

       useEffect(() => {
              if (isAuthenticated()) {
                window.location.href="/Admin/Dashboard"
              } else {
                window.location.href="/auth/sign-in"
              }
            }, []);

     return(<Loader />)
}

export default Home;