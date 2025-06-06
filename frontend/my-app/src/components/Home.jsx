import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Card } from "flowbite-react";
import { Footer, FooterCopyright } from "flowbite-react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

function Home() {
  return (
    <div>
      <Navbar fluid className="!bg-amber-50">
        {" "}
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl italic font-semibold font-display">
            Micro-Diary
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Link to="/signUp">
            {" "}
            <Button className="bg-green-500 hover:bg-green-300">
              Get Started
            </Button>
          </Link>

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
      <Link to="/login">
        <p className="text-xl mt-[40px] text-center underline cursor-pointer">
          Already have an account?
        </p>
      </Link>

      <div className="flex flex-col md:flex-row m-4 md:m-10 items-center md:items-start justify-center mt-10">
        <Card href="#" className="w-11/12 sm:max-w-sm m-2 !bg-blue-500">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Make Daily Entries
          </h5>
          <p className="font-normal text-white">
            You can make entry into your personal diary , view the entries along
            with dates sorted. Your digital diary is ready!
          </p>
        </Card>
        <Card href="#" className="w-11/12 sm:max-w-sm m-2 !bg-green-500">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Get Insights
          </h5>
          <p className="font-normal text-white">
            Gain Insights into how your day was spent and improve your wellbeing
            through the insights gained from your entries in diary
          </p>
        </Card>
        <Card href="#" className="w-11/12 sm:max-w-sm m-2 !bg-amber-500">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Track Goals and Achievements
          </h5>
          <p className="font-normal text-white">
            Allows you to track your personal goal and achievements efficiently
            along with your daily entries into diary
          </p>
        </Card>
      </div>
      {/* <Accordion className="m-10">
        <AccordionPanel className="!bg-amber-50">
          <AccordionTitle>What is Micro-Diary?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to&nbsp;
              <a
                href="https://flowbite.com/docs/getting-started/introduction/"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                get started&nbsp;
              </a>
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Is it free or priced?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the
              <a
                href="https://flowbite.com/figma/"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Figma design system
              </a>
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>How is your data secured?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel>
      </Accordion> */}
      <Footer container className="!bg-beige">
        <FooterCopyright
          href="https://github.com/Arsh1333"
          by="Arsh Pawar"
          year={2025}
        />
      </Footer>
    </div>
  );
}

export default Home;
