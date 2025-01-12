"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function MovieForm() {
  const [movieDetails, setMovieDetails] = useState({
    name: "",
    actor: "",
    actress: "",
    genre: "Comedy",
    rating: "1",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setMovieDetails({ ...movieDetails, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/movies/addmovie", movieDetails);
      toast.success(response.data.message || "Movie submitted successfully! 🎉");
      setMovieDetails({
        name: "",
        actor: "",
        actress: "",
        genre: "Comedy",
        rating: "1",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Failed to submit the form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add a Movie
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {/* Movie Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={movieDetails.name}
            onChange={handleChange}
            placeholder="Enter movie name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Actor */}
        <div>
          <label
            htmlFor="actor"
            className="block text-sm font-medium text-gray-700"
          >
            Actor
          </label>
          <input
            type="text"
            id="actor"
            name="actor"
            value={movieDetails.actor}
            onChange={handleChange}
            placeholder="Enter actor name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Actress */}
        <div>
          <label
            htmlFor="actress"
            className="block text-sm font-medium text-gray-700"
          >
            Actress
          </label>
          <input
            type="text"
            id="actress"
            name="actress"
            value={movieDetails.actress}
            onChange={handleChange}
            placeholder="Enter actress name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={movieDetails.genre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="Comedy">Comedy</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={movieDetails.rating}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 text-white font-bold rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
