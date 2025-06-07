import React, { useState } from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.user.token);
        navigate("/main");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg !bg-green-700">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <h1 className="text-center text-xl text-white">Login</h1>
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
        </form>
      </Card>
    </div>
  );
}

export default Login;
