"use client";

import {
  getFirstWeekday,
  getWeekNumber,
  monthsInYear,
} from "@/helperfunctions/calenderfunctions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SemesterOverview({
  semester,
  path,
}: {
  semester: any;
  path: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  const getMonth = (month: number, year: number) => {
    let monthWeeks = [];
    let firstDay = new Date(Date.UTC(year, month, 1));
    let lastDay = new Date(Date.UTC(year, month + 1, 0));
    let firstWeek;
    let lastWeek;

    if (
      [0, 5, 6].includes(firstDay.getDay()) &&
      semester!.startdate.getMonth() != firstDay.getMonth()
    ) {
      firstWeek = getWeekNumber(
        new Date(
          Date.UTC(
            firstDay.getFullYear(),
            firstDay.getMonth(),
            firstDay.getDate() + 7
          )
        )
      );
    } else {
      firstWeek = getWeekNumber(firstDay);
    }

    if (
      [1, 2, 3].includes(lastDay.getDay()) &&
      semester!.enddate.getMonth() != lastDay.getMonth()
    ) {
      lastWeek = getWeekNumber(
        new Date(
          Date.UTC(
            lastDay.getFullYear(),
            lastDay.getMonth(),
            lastDay.getDate() - 7
          )
        )
      );
    } else {
      lastWeek = getWeekNumber(lastDay);
    }

    for (let week = firstWeek; week < lastWeek + 1; week++) {
      let isLecturetime =
        getFirstWeekday(week, year) >= semester!.startlecturedate &&
        getFirstWeekday(week, year) <= semester!.endlecturedate;
      console.log(week + " " + getFirstWeekday(week, year));
      monthWeeks.push(
        <td
          key={week}
          className={
            isLecturetime ? "text-blue-700 px-1" : "text-slate-500 px-1"
          }
        >
          <Link href={{ pathname: path, query: { week: week, year: year } }}>
            {week}
          </Link>
        </td>
      );
    }

    return monthWeeks;
  };

  const getSemester = () => {
    let semesterCalendar = [];

    if (semester!.startdate.getFullYear() != semester!.enddate.getFullYear()) {
      for (let month = semester!.startdate.getMonth(); month < 12; month++) {
        semesterCalendar.push(
          <tr key={month}>
            <td className="pl-1 pr-5">{monthsInYear[month]}</td>
            {getMonth(month, semester!.startdate.getFullYear())}
          </tr>
        );
      }

      for (let month = 0; month < semester!.enddate.getMonth() + 1; month++) {
        semesterCalendar.push(
          <tr key={month}>
            <td className="pl-1 pr-5">{monthsInYear[month]}</td>
            {getMonth(month, semester!.enddate.getFullYear())}
          </tr>
        );
      }
    } else {
    }

    return semesterCalendar;
  };

  return (
    <>
      <div
        className={
          isOpen
            ? "2xl:hidden flex flex-col w-4/5 rounded-lg bg-slate-100 min-w-min max-w-min"
            : "2xl:hidden flex flex-col w-4/5 rounded-lg bg-slate-100 min-w-min"
        }
      >
        <button
          onClick={toggleOpen}
          className={
            isOpen
              ? "flex justify-between rounded-t-lg bg-slate-200 py-1 px-3"
              : "flex justify-between rounded-lg bg-slate-200 py-1 px-3"
          }
        >
          <div className="">Semesterübersicht</div>
          <div>
            {isOpen ? (
              <Image
                src="/icons/arrow_up.png"
                width={32}
                height={32}
                alt="dropdown"
              ></Image>
            ) : (
              <Image
                src="/icons/arrow_down.png"
                width={32}
                height={32}
                alt="up"
              ></Image>
            )}
          </div>
        </button>
        {isOpen ? (
          <div className="flex rounded-b-lg bg-slate-100 py-1 px-3">
            <table className="">{getSemester()}</table>
            <div className="ml-10 mr-1">
              <div className="text-blue-700">Vorlesungszeit</div>
              <div className="whitespace-nowrap text-slate-500">
                Vorlesungsfreie Zeit
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
