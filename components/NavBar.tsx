"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function NavBar({ children }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isExtended, setExtended] = useState(false);

  const pathname = usePathname();

  const redirectHome = () => {
    window.location.href = "https://www.fh-swf.de";
  };

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  const toggleExtended = () => {
    setExtended(!isExtended);
  };

  return (
    <>
      <div className="flex flex-row items-start justify-start">
        {/* Header */}
        <div className="fixed w-full z-50 shadow-xl flex items-center justify-between bg-white">
          <button className="" onClick={redirectHome}>
            <Image
              className="p-4"
              src="/fhLogo.png"
              width={250}
              height={77}
              alt="FH Logo"
            ></Image>
          </button>

          <button className="" onClick={toggleOpen}>
            {isOpen ? (
              <Image
                className="sm:hidden mr-2"
                src="/icons/close.png"
                width={56}
                height={56}
                alt="menu"
              ></Image>
            ) : (
              <Image
                className="sm:hidden mr-2"
                src="/icons/menu.png"
                width={56}
                height={56}
                alt="menu"
              ></Image>
            )}
          </button>
        </div>

        {/* Navbar/Sidebar */}
        <div
          className={
            isOpen
              ? "fixed flex flex-col justify-between sm:w-72 h-screen shadow-r-xl z-40 pt-28 bg-white"
              : "fixed sm:flex hidden flex-col justify-between sm:w-72 h-screen shadow-r-xl z-40 pt-28 bg-white"
          }
        >
          <div>
            {/* Semesteranzeige */}
            {/* <div className="flex justify-center bg-slate-300 rounded-full p-2 mx-16">
          <div className="">WS 2024/25 </div>
          <button>
            <Image
              src="/icons/arrow_down.png"
              width={32}
              height={32}
              alt="arrow_down"
            ></Image>
          </button>
        </div> */}

            {/* Stundenplan */}
            <div
              className={
                pathname.includes("schedule")
                  ? "bg-blue-300 h-12 p-2 flex items-center justify-between"
                  : "h-12 p-2 flex items-center justify-between"
              }
            >
              <div className="flex items-center w-full">
                <Image
                  className=""
                  src="/icons/calendar.png"
                  width={48}
                  height={48}
                  alt="calendar"
                ></Image>
                <Link className="pl-2 text-lg" href="/schedule">
                  Stundenplan
                </Link>
              </div>

              <button className="" onClick={toggleExtended}>
                {isExtended ? (
                  <Image
                    className=""
                    src="/icons/arrow_up.png"
                    width={64}
                    height={64}
                    alt="arrow_up"
                  ></Image>
                ) : (
                  <Image
                    className=""
                    src="/icons/arrow_down.png"
                    width={64}
                    height={64}
                    alt="arrow_down"
                  ></Image>
                )}
              </button>
            </div>

            {/* Accordeon */}
            {isExtended ? (
              <div>
                <div
                  className={
                    pathname.includes("location")
                      ? "bg-blue-300 h-12 p-2 pl-16"
                      : "h-12 p-2 pl-16"
                  }
                >
                  <Link className="" href="/location">
                    Raumplan
                  </Link>
                </div>
                <div
                  className={
                    pathname.includes("lecturers")
                      ? "bg-blue-300 h-12 p-2 pl-16"
                      : "h-12 p-2 pl-16"
                  }
                >
                  <Link className="" href="/lecturers">
                    Dozenten
                  </Link>
                </div>
                <div
                  className={
                    pathname.includes("courses")
                      ? "bg-blue-300 h-12 p-2 pl-16"
                      : "h-12 p-2 pl-16"
                  }
                >
                  <Link className="" href="/courses">
                    Studiengänge
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Modulwahl */}
            <div
              className={
                pathname.includes("moduleeditor")
                  ? "bg-blue-300 h-12 p-2 flex items-center"
                  : "h-12 p-2 flex items-center"
              }
            >
              <Image
                src="/icons/edit.png"
                width={48}
                height={48}
                alt="edit"
              ></Image>
              <Link className="pl-2 text-lg" href="/moduleeditor">
                Modulwahl
              </Link>
            </div>

            {/* Studienverlaufsplan*/}
            <div
              className={
                pathname.includes("courseplan")
                  ? "bg-blue-300 h-12 p-2 flex items-center"
                  : "h-12 p-2 flex items-center"
              }
            >
              <Image
                src="/icons/map.png"
                width={48}
                height={48}
                alt="map"
              ></Image>
              <Link className="pl-2 text-lg" href="/courseplan">
                Studienverlaufsplan
              </Link>
            </div>
          </div>

          <div className="p-4 flex items-end justify-center">
            <button className="bg-primary text-white p-2 rounded">
              Ausloggen
            </button>
          </div>
        </div>
        <div className="ml-4 sm:ml-72 mt-28 w-full mb-1">{children}</div>
      </div>
    </>
  );
}
