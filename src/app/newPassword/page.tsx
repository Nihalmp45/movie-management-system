"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Extract the token from the URL query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken:any = urlParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    }
  }, []);

  const handlePasswordReset = async (e:any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/users/reset-password", {
        token,
        newPassword,
      });
      toast.success("Password reset successfully! 🎉");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error resetting password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Reset Your Password"}</h1>
      <hr />
      <Toaster position="top-center" reverseOrder={false} />
      
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handlePasswordReset} className="w-full max-w-md p-4 border rounded-lg">
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="mt-4">
        <p>
          Remembered your password? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
