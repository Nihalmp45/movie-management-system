import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbconfig/dbconfig"; // Ensure this is the correct path
import Movie from "@/models/movieModel"; // Ensure this is the correct path to your model

connect(); // Establish the database connection

export async function GET() {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find(); // Adjust query/filter if needed
    
    // Return the movies in the response
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
