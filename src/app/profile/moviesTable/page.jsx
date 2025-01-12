"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ genre: "", rating: "" });
  const [sort, setSort] = useState({ sortBy: "movieTitle", order: "asc" });
  const router = useRouter();
  const limit = 10; // Number of items per page

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("/api/movies/allmovies", {
          params: {
            page: currentPage,
            limit,
            sortBy: sort.sortBy,
            order: sort.order,
            genre: filters.genre,
            rating: filters.rating,
          },
        });

        const { movies, totalPages } = response.data;
        setMovies(movies);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [currentPage, sort, filters]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (key) => {
    setSort((prevSort) => ({
      sortBy: key,
      order: prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  // Function to get sort arrow
  const getSortArrow = (key) => {
    if (sort.sortBy === key) {
      return sort.order === "asc" ? "▲" : "▼";
    }
    return "↕"; // Neutral arrow indicating sortability
  };

  return (
    <div className="w-full bg-white p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Movies</h1>

      <div className="flex justify-between items-center mb-6">
        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            className="py-2 px-4 border rounded"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
          </select>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            className="py-2 px-4 border rounded"
          >
            <option value="">All Ratings</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => router.push("/profile")}
          className="py-3 px-6 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Movies Table */}
      <table className="min-w-full table-auto mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th
              className={`px-4 py-2 text-left cursor-pointer ${
                sort.sortBy === "movieTitle" ? "font-bold text-blue-500" : ""
              }`}
              onClick={() => handleSortChange("movieTitle")}
            >
              Movie Title {getSortArrow("movieTitle")}
            </th>
            <th className="px-4 py-2 text-left">Actor</th>
            <th className="px-4 py-2 text-left">Actress</th>
            <th
              className={`px-4 py-2 text-left cursor-pointer ${
                sort.sortBy === "genre" ? "font-bold text-blue-500" : ""
              }`}
              onClick={() => handleSortChange("genre")}
            >
              Genre {getSortArrow("genre")}
            </th>
            <th
              className={`px-4 py-2 text-left cursor-pointer ${
                sort.sortBy === "rating" ? "font-bold text-blue-500" : ""
              }`}
              onClick={() => handleSortChange("rating")}
            >
              Rating {getSortArrow("rating")}
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie._id} className="border-b">
                <td className="px-4 py-2">{movie.movieTitle}</td>
                <td className="px-4 py-2">{movie.actorName}</td>
                <td className="px-4 py-2">{movie.actressName}</td>
                <td className="px-4 py-2">{movie.genre}</td>
                <td className="px-4 py-2">{movie.rating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2">
                No movies available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="py-2 px-4">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
