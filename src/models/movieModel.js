import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: [true, "Please provide the movie title"],
    unique: true,
  },
  actorName: {
    type: String,
    required: [true, "Please provide the actor's name"],
  },
  actressName: {
    type: String,
    required: [true, "Please provide the actress's name"],
  },
  genre: {
    type: String,
    enum: ["Comedy", "Action", "Drama", "Horror", "Thriller"], // Matches frontend dropdown options
    required: [true, "Please select a genre"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide a rating between 1 and 5"],
  },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
