"use client"; // Next.js client component
import { useState, useEffect } from "react";
import axios from "axios";

export default function SampleData() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
        setComments(response.data.slice(0, 10)); // Fetch only the first 10 comments for brevity
      } catch {
        setError("Failed to fetch comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full bg-white p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sample Comments</h1>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-lg text-gray-700">{comment.name}</h3>
            <p className="text-gray-600">{comment.body}</p>
            <p className="text-sm text-gray-500">Email: {comment.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
