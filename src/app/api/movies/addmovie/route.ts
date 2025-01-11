import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbconfig/dbconfig";
import Movie from "@/models/movieModel";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, actor, actress, genre, rating } = reqBody;

    // Validate input fields
    if (!name || !actor || !actress || !genre || rating === undefined) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Validate genre
    const validGenres = ["Comedy", "Action", "Drama", "Horror", "Thriller"];
    if (!validGenres.includes(genre)) {
      return NextResponse.json(
        { error: "Invalid genre. Allowed genres are: " + validGenres.join(", ") },
        { status: 400 }
      );
    }

    // Validate rating
    const validRatings = [1, 2, 3, 4, 5];
    if (!validRatings.includes(Number(rating))) {
      return NextResponse.json(
        { error: "Invalid rating. Allowed ratings are: " + validRatings.join(", ") },
        { status: 400 }
      );
    }

    // Save the movie to the database
    const newMovie = new Movie({
      movieTitle: name,
      actorName: actor,
      actressName: actress,
      genre: genre,
      rating: Number(rating),
    });

    const savedMovie = await newMovie.save();

    return NextResponse.json(
      { message: "Movie added successfully", savedMovie },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/movies:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
