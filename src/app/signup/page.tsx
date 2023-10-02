"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<any>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  /* use effect */
  useEffect(() => {
    if (user) {
      if (
        user.email.length > 0 &&
        user.username.length > 0 &&
        user.password.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [user]);

  const onhandelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Log inside the callback to see the updated state
  };
  /* sign up function  */
  const onSignup = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent form submission

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("signup success", response);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-center">{loading ? "Processing..." : "Sign UP"}</h1>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              User Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john"
              id="username"
              name="username"
              value={user.username}
              onChange={onhandelChange}
            />
          </div>
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
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onSignup}
              /*  disabled={buttonDisabled} */
            >
              {!buttonDisabled ? "SignUp" : "...."}
            </button>
          </div>
          <div className="text-black">
            <Link href={"/login"}>Visit login page</Link>
          </div>
        </form>
      </div>
    </>
  );
}
