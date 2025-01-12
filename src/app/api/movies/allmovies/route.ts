import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbconfig/dbconfig";
import Movie from "@/models/movieModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "");
    const genre = searchParams.get("genre") || "";
    const rating = searchParams.get("rating") || "";
    const sortBy = searchParams.get("sortBy") || "movieTitle";
    const order = searchParams.get("order") === "desc" ? -1 : 1;

    const filters: { genre?: string; rating?: number } = {};
    if (genre) filters.genre = genre;
    if (rating) filters.rating = parseInt(rating);

    const sort:any = { [sortBy]: order };

    const movies = await Movie.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalMovies = await Movie.countDocuments(filters);
    const totalPages = Math.ceil(totalMovies / limit);

    return NextResponse.json({ movies, totalPages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
