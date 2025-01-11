"use client";
import React from "react";
import ProfilePage from "./navbar/page";
import MovieForm from "./movieform/page";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <div className="w-full">
        <ProfilePage />
      </div>

      {/* Movie Form */}
      <div className="w-full">
        <MovieForm />
      </div>
    </div>
  );
};

export default Page;
