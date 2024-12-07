"use client";

import Image from "next/image";

export default function Header() {
  const redirectHome = () => {
    window.location.href = "https://www.fh-swf.de";
  };

  return (
    <>
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
      </div>
    </>
  );
}
