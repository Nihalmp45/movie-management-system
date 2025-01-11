"use client"
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success("reset password with the link sent in email and login again! 🎉");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Error sending reset email ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading" : "Forgot Password"}</h1>
      <hr />
      <Toaster position="top-center" reverseOrder={false} />
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label htmlFor="email">Enter your email to reset your password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button
          type="submit"
          className="mt-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
