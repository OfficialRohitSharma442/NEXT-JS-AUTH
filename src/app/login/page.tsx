"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const Router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = React.useState<Boolean>(false);
  const [loading, setloading] = React.useState<Boolean>(false);
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  const onhandelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(user); // Log inside the callback to see the updated state
  };
  /* sign up function  */
  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login successfully", response);
      toast.success("Login Successfully"); // Make sure the argument is a string
      setTimeout(() => {
        Router.push("/profile");
      }, 2000);
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error?.response?.data?.error); // Make sure the argument is a string
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <h1 className="text-center bg-yellow-300">
        {loading ? "Processing..." : "Login"}
      </h1>
      <div className="flex items-center justify-center min-h-screen bg-yellow-300">
        <Toaster />
        <form>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              className="bg-gray-50 border
             border-gray-300 text-gray-900
              text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              typeof="email"
              value={user.email}
              onChange={onhandelChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="password"
              value={user.password}
              onChange={onhandelChange}
            />
          </div>
          <div className="mb-6 flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onLogin}
              disabled={buttonDisabled ? true : false}
            >
              Log-in
            </button>
          </div>
          <div className="text-black">
            <Link href={"/signup"}>Visit signup page</Link>
          </div>
        </form>
      </div>
    </>
  );
}
