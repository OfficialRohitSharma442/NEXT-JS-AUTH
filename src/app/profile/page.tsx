"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userdata, setUserdata] = React.useState(null);
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      console.log("response", response);
      response.data.success && router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const GetUserDetails = async () => {
    try {
      debugger;
      const res = await axios.get("/api/users/Me");

      setUserdata(res.data.data._id);
      console.log(res.data.data._id);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <Toaster />
      <h1 className="text-4xl mb-4 cursor-pointer text-white hover:text-yellow-400 transition-all duration-300">
        Profile
      </h1>
      <h2 className="text-white bg-red-500 mb-1 rounded bg-origin-padding">
        {userdata == null ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userdata}`}>{userdata}</Link>
        )}
      </h2>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-1"
          onClick={logout}
        >
          LogOut
        </button>
        <button
          className="bg-green-500 text-white px-4 py-1 rounded-md hover:green-yellow-300 mb-1"
          onClick={GetUserDetails}
        >
          GetUser Data
        </button>
      </div>
    </div>
  );
}
