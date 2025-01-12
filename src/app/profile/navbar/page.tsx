"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link"; 

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Fetch user details on page load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setEmail(res.data.data.email); // Assuming API returns { data: { email: "example@example.com" } }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <nav className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Dashboard</h1>
          <div className="flex items-center space-x-6">
            {/* Links */}
            <Link href="/profile/moviesTable" className="hover:text-gray-300">Movies</Link>
            <Link href="/profile/analytics" className="hover:text-gray-300">Analytics</Link>
            <Link href="/profile/sampleData" className="hover:text-gray-300">Sample API</Link>

            {/* Email displayed as a rounded circle */}
            <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full">
              {email ? email.charAt(0).toUpperCase() : "U"}
            </div>
            
            {/* Logout button */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
