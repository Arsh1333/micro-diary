import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "flowbite-react";

function Main() {
  const [posts, setPosts] = useState([]);

  const getPost = async (e) => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get("http://localhost:5000/api/reviews/getEntries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPost(); // Fetch reviews on component mount
  }, []);
  if (posts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No posts found.</div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4 text-center">Hello</h1> */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        Hello {posts[0]?.owner?.userName || "Unknown"} 👋
      </h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id}>
            <p className="text-white">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Main;
