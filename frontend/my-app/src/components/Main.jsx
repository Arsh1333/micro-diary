import axios from "axios";
import { useState, useEffect, use } from "react";
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
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [goal, setGoal] = useState("");
  // const [enterGoal, setEnterGoal] = useState(false);
  const [goalsByEntry, setGoalsByEntry] = useState({});
  const [activeGoalEntryId, setActiveGoalEntryId] = useState(null);
  const [showGoalsForEntryId, setShowGoalsForEntryId] = useState(null);
  const [sortedPost, setSortedPost] = useState("latest");

  const getPost = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://micro-diary.onrender.com/api/reviews/getEntries",
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
    getPost();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://micro-diary.onrender.com/api/users/getMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.userName);
      })
      .catch((err) => console.log(err));
  }, []);

  const addEntry = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://micro-diary.onrender.com/api/reviews/addEntries",
        { content: newEntry },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
      setNewEntry("");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEntry = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://micro-diary.onrender.com/api/reviews/deleteEntries/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.log("Error deleting:", err);
    }
  };

  const updateEntry = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://micro-diary.onrender.com/api/reviews/updateEntries/${postId}`,
        { content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
      setEditingPostId(null);
      setEditContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const addGoals = async (entryId) => {
    try {
      console.log("addGoals function triggered", entryId);
      await axios.post("https://micro-diary.onrender.com/api/goals/addGoals", {
        goalInput: goal,
        entryId: selectedEntry,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGoals = async (entryId) => {
    try {
      const res = await axios.get(
        `https://micro-diary.onrender.com/api/goals/getGoals/${entryId}`
      );
      setGoalsByEntry((prev) => ({
        ...prev,
        [entryId]: res.data,
      }));
      setShowGoalsForEntryId(entryId);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleGoalCompletion = async (goalId) => {
    try {
      const updatedGoal = await axios.put(
        `https://micro-diary.onrender.com/api/goals/toggleDone/${goalId}`
      );
      setGoalsByEntry((prev) => {
        const entryGoals = prev[showGoalsForEntryId] || [];
        const updatedGoals = entryGoals.map((goal) =>
          goal._id === goalId ? updatedGoal.data : goal
        );
        return { ...prev, [showGoalsForEntryId]: updatedGoals };
      });
    } catch (err) {
      console.error("Failed to toggle goal:", err);
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
            <div className="flex items-center space-x-2">
              <Button
                color="green"
                onClick={() => {
                  setEditingPostId(post._id);
                  setEditContent(post.content);
                }}
                className="w-[80px]"
              >
                Edit
              </Button>
              <Button
                color="red"
                onClick={() => deleteEntry(post._id)}
                className="w-[80px]"
              >
                Delete
              </Button>

              <Button
                color="purple"
                onClick={() => {
                  setActiveGoalEntryId(post._id);
                  setSelectedEntry(post._id);
                }}
                className="w-[80px]"
              >
                Add Goals
              </Button>
              <Button
                color="yellow"
                onClick={() => fetchGoals(post._id)}
                className="w-[80px]"
              >
                View Goals
              </Button>
            </div>

            {editingPostId === post._id && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border border-gray-300 bg-amber-50 rounded px-3 py-2"
                  placeholder="Edit your post..."
                />
                <div className="flex gap-2">
                  <Button
                    color="blue"
                    onClick={() => updateEntry(post._id)}
                    className="w-[80px]"
                  >
                    Save
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setEditingPostId(null);
                      setEditContent("");
                    }}
                    className="w-[80px]"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {activeGoalEntryId === post._id && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full border border-gray-300 bg-amber-50 rounded px-3 py-2"
                  placeholder="Enter your goal..."
                />
                <div className="flex gap-2">
                  <Button
                    color="blue"
                    onClick={() => {
                      addGoals(post._id);
                      setActiveGoalEntryId(null);
                      setGoal("");
                    }}
                    className="w-[80px]"
                  >
                    Add
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setActiveGoalEntryId(null)}
                    className="w-[80px]"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {/* {goalsByEntry[post._id] &&
              goalsByEntry[post._id].map((goal) => (
                <p key={goal._id} className="text-sm text-green-300 ml-2">
                  ✅ {goal.goalInput}
                </p>
              ))}
               */}

            {showGoalsForEntryId === post._id && goalsByEntry[post._id] && (
              <div className="mt-3 space-y-2 bg-gray-100 p-2 rounded">
                <p className="font-semibold">Goals:</p>

                {goalsByEntry[post._id].length === 0 && (
                  <p className="text-sm text-gray-500">No goals yet.</p>
                )}

                {goalsByEntry[post._id].map((goal) => (
                  <div key={goal._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={goal.isDone}
                      onChange={() => toggleGoalCompletion(goal._id)}
                    />
                    <span
                      className={
                        goal.isDone ? "line-through text-gray-500" : ""
                      }
                    >
                      {goal.goalInput}
                    </span>
                  </div>
                ))}

                <Button
                  color="gray"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowGoalsForEntryId(null)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        ))}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader className="bg-blue-500">Add your thoughts</ModalHeader>
          <ModalBody className="bg-blue-500">
            <div className="space-y-6">
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
