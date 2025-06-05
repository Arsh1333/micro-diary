import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Navbar, Button } from "flowbite-react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

function Home() {
  return (
    <div>
      {/* <Navbar fluid>
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Micro-Diary
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button className="bg-blue-500 hover:bg-blue-300">Get started</Button>
          <NavbarToggle className="ml-2" />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar> */}
      <Navbar fluid className="!bg-amber-50">
        {" "}
        {/* Or bg-yellow-200, bg-yellow-300 etc. */}
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl italic font-semibold font-display">
            Micro-Diary
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          {/* Note: Flowbite's Button component might have its own default styling.
            You might need to override it more specifically or use custom classes if bg-blue-500
            isn't taking full effect as expected. */}
          <Button className="bg-green-500 hover:bg-green-300">
            Get started
          </Button>
          <NavbarToggle className="ml-2" />
        </div>
        <NavbarCollapse>
          <NavbarLink className=" hover:!text-amber-800 !text-black " href="#">
            Home
          </NavbarLink>
          <NavbarLink className=" hover:!text-amber-800 !text-black" href="#">
            About
          </NavbarLink>
          <NavbarLink className=" hover:!text-amber-800 !text-black" href="#">
            Services
          </NavbarLink>
          <NavbarLink className=" hover:!text-amber-800 !text-black" href="#">
            Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <h1 className="font-display text-[30px] text-center mt-[80px]">
        Your <span className="bg-blue-500"> Idea </span>, Your{" "}
        <span className="bg-green-500">Diary</span> , Your Daily{" "}
        <span className="bg-amber-500"> Win </span>
      </h1>
      <p className="text-xl mt-[40px] text-center">
        Gain focus and making steady progress. Central hub for both thought and
        action. Make your journey from desire to reality smooth and simple.The
        essential space for every idea and accomplishment.
      </p>
      {/* <Button className="bg-green-500 hover:bg-green-300 ml-[150px] mt-4">
        Get started
      </Button> */}
      <p className="text-xl mt-[40px] text-center underline cursor-pointer">
        Already have an account?
      </p>
      {/* <h1>Home</h1>
      <Button className="bg-red-500 hover:bg-red-600">Custom Button</Button> */}
    </div>
  );
}

export default Home;
