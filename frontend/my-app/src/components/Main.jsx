import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  Label,
  Textarea,
} from "flowbite-react";

function Main() {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [user, setUser] = useState(null);

  const getPost = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reviews/getEntries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost(); // Fetch reviews on component mount
  }, []);

  const addEntry = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/reviews/addEntries",
        { content: newEntry }, // Send content from state
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
      alert("Post made successfully");
      setNewEntry("");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/users/getMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.userName);
      })
      .catch((err) => console.log(err));
  }, []);

  // const deleteEntry = async (postId) => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .delete(`http://localhost:5000/api/reviews/deleteEntries/${postId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => console.log("deleted", res))
  //     .catch((err) => console.log(err));
  // };
  const deleteEntry = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5000/api/reviews/deleteEntries/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

      // alert("Entry deleted successfully!");
    } catch (err) {
      console.log("Error deleting:", err);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        Hello {user || "Unknown"} 👋
      </h2>

      <div className="space-y-4">
        <Button className="bg-amber-500" onClick={() => setOpenModal(true)}>
          Add Entry
        </Button>

        {posts.map((post) => (
          <Card key={post._id}>
            <p className="text-white">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="flex">
              <Button color="green" className="w-[80px]">
                Update
              </Button>
              <Button
                color="red"
                onClick={() => deleteEntry(post._id)}
                className="w-[80px] ml-2"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader className="bg-blue-500">Add your thoughts</ModalHeader>
          <ModalBody className="bg-blue-500">
            <div className="space-y-6 bg-blue-500">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment">Your Thoughts ......</Label>
                </div>
                <Textarea
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={9}
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bg-blue-500">
            <Button onClick={addEntry}>Add</Button>
            <Button color="alternative" onClick={() => setNewEntry("")}>
              Clear
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Main;
