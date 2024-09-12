"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, SquarePen, X } from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex justify-between items-center max-w-[1400px] mx-auto px-3 md:px-6 py-4 md:py-6 border-b shadow-sm">
      <div className="flex items-center space-x-3">
        <label className="font-semibold">Ztheta</label>
        <div><Searchbar /></div>
      </div>
      <section className="flex md:hidden items-center">
        <div className="space-y-2 pr-2" onClick={() => setIsNavOpen(true)}>
          <Menu className="h-7 w-7" />
        </div>

        <div
          className={
            isNavOpen
              ? "absolute w-full h-screen top-0 left-0 z-10 bg-[#F3F3F5] flex flex-col justify-evenly items-center"
              : "hidden"
          }
        >
          <div
            className="absolute top-0 right-0 px-6 pt-8"
            onClick={() => setIsNavOpen(false)}
          >
            <X className="h-7 w-7" />
          </div>
          <div className="flex flex-col items-center space-y-3 min-h-[250px] w-full px-3 uppercase">
            <div>
              <Link href="/dashboard">
                <p className="font-semibold">Dashboard</p>
              </Link>
            </div>

            <div>
              <Button className="rounded-full">
                Sign in to write{" "}
                <SquarePen className="ml-2 stroke-[1.5] w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:flex justify-between">
        <div className="flex items-center space-x-7">
          <div>
            <Link href="/dashboard">
              <p>Dashboard</p>
            </Link>
          </div>
          <div>
            <Button className="rounded-full">
              Sign in to write{" "}
              <SquarePen className="ml-2 stroke-[1.5] w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
