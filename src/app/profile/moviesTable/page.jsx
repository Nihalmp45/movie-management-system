"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movies, setMovies] = useState([]);  // Ensure it's an empty array by default

  // Fetching all movies when the component mounts
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get('/api/movies/allmovies'); // Adjust the API endpoint as needed
        // Check if the response has a 'data' property and if it's an array
        if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies);  // Extract the movies array from the response
          console.log(response.data.movies)
        } else {
          console.error("Expected an array in response.data.data but received:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="w-full bg-white p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Movies</h1>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Movie Title</th>
            <th className="px-4 py-2 text-left">Actor</th>
            <th className="px-4 py-2 text-left">Actress</th>
            <th className="px-4 py-2 text-left">Genre</th>
            <th className="px-4 py-2 text-left">Rating</th>
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
              <td colSpan="5" className="text-center px-4 py-2">No movies available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
