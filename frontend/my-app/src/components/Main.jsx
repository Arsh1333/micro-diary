import axios from "axios";
import { useState, useEffect } from "react";

function Main() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPost(); // Fetch reviews on component mount
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default Main;
