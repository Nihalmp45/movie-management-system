"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {
  const [genreCounts, setGenreCounts] = useState({
    Action: 0,
    Comedy: 0,
    Drama: 0,
    Horror: 0,
    Thriller: 0,
  });
  const [ratingsData, setRatingsData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("/api/movies/allmovies");
        const movieList = response.data.movies;

        // Genre counts
        const counts = {
          Action: 0,
          Comedy: 0,
          Drama: 0,
          Horror: 0,
          Thriller: 0,
        };

        // Ratings
        const ratings = {};

        movieList.forEach((movie) => {
          if (movie.genre === "Action") counts.Action++;
          if (movie.genre === "Comedy") counts.Comedy++;
          if (movie.genre === "Drama") counts.Drama++;
          if (movie.genre === "Horror") counts.Horror++;
          if (movie.genre === "Thriller") counts.Thriller++;

          // Collect ratings
          if (movie.rating) {
            const roundedRating = Math.floor(movie.rating); // Round rating to the nearest integer
            ratings[roundedRating] = (ratings[roundedRating] || 0) + 1;
          }
        });

        setGenreCounts(counts);

        // Prepare ratings data for the bar chart
        const ratingLabels = Object.keys(ratings).sort((a, b) => a - b); // Sort ratings
        const ratingValues = ratingLabels.map((rating) => ratings[rating]);

        setRatingsData({
          labels: ratingLabels,
          datasets: [
            {
              label: "Number of Movies by Rating",
              data: ratingValues,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  const genreData = {
    labels: ["Action", "Comedy", "Drama", "Horror", "Thriller"],
    datasets: [
      {
        label: "Number of Movies",
        data: [
          genreCounts.Action,
          genreCounts.Comedy,
          genreCounts.Drama,
          genreCounts.Horror,
          genreCounts.Thriller,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(47, 164, 74)",
          "rgb(189, 63, 176)",
        ],
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: "#fff",
        hoverBorderColor: "#000",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return `${context.label}: ${value} movies`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} movies`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Rating",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Movies",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Movie Analytics
      </h1>
      <div className="flex justify-center mb-12">
        <div className="w-96">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Genre Distribution
          </h2>
          <Doughnut data={genreData} options={options} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Movie Ratings Distribution
          </h2>
          <Bar data={ratingsData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
