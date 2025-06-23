import React, { useState } from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== pass) {
      alert("Password enter doesn't match Re-typed password");
      return 0;
    }
    const response = await axios
      .post("https://micro-diary.onrender.com/api/users/register", {
        email: email,
        userName: userName,
        password: password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-8">
      {/*
        The Card component itself usually has a default max-width or intrinsic sizing
        that makes it look good. We'll control the container for centering and
        give the Card a responsive width.
      */}
      <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg !bg-green-700">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <h1 className="text-center text-xl text-white">Register</h1>
          <div>
            <div className="mb-2 block">
              <p className="text-white">Username</p>
            </div>
            <TextInput
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <p className="text-white">Email</p>
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <p className="text-white">Password</p>
            </div>
            <TextInput
              id="password2"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <p className="text-white">Re-type your Password</p>
            </div>
            <TextInput
              id="password1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          <Button type="submit">Submit</Button>
          <Link to="/login">
            <p className="text-xl text-center text-white underline cursor-pointer">
              Already have an account?
            </p>
          </Link>
        </form>
      </Card>
    </div>
  );
}

export default SignUp;
