"use client";

import Image from "next/image";
import { getWeekNumber } from "@/helperfunctions/calenderfunctions";
import { monthsInYear, weekdays } from "@/helperfunctions/calenderfunctions";

export default function OneMonthCalendar() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let dayone = new Date(year, month, 1).getDay();
  let lastday = new Date(year, month + 1, 0 - 1);
  let firstDate = new Date(year, month, -dayone + 3);
  let firstWeek = getWeekNumber(firstDate);
  let lastWeek = getWeekNumber(lastday);
  let currentMonth = month;

  let weekdaysCalendar = [];

  for (const weekday in weekdays) {
    weekdaysCalendar.push(
      <th key={weekdays[weekday]} className="p-1 font-normal">
        {weekdays[weekday]}
      </th>
    );
  }

  const firstWeekday = (weeknr: number) => {
    return new Date(year, 0, 1 + (weeknr - 1) * 7);
  };

  const getWeek = (weeknr: number) => {
    let week = [];
    let firstDay = firstWeekday(weeknr);
    let year = firstDay.getFullYear();
    let month = firstDay.getMonth();
    let day = firstDay.getDate();

    for (; day < firstDay.getDate() + 7; day++) {
      let currentDay = new Date(year, month, day);

      if (currentDay.getMonth() === currentMonth) {
        if (
          currentDay.getFullYear() === today.getFullYear() &&
          currentDay.getMonth() === today.getMonth() &&
          currentDay.getDate() === today.getDate()
        ) {
          week.push(
            <td
              key={currentDay.getDate()}
              className="rounded-full bg-primary text-white text-center"
            >
              <button>{currentDay.getDate()}</button>
            </td>
          );
        } else {
          week.push(
            <td key={currentDay.getDate()} className="text-center">
              <button>{currentDay.getDate()}</button>
            </td>
          );
        }
      } else {
        week.push(
          <td key={currentDay.getDate()} className="text-neutral text-center">
            <button>{currentDay.getDate()}</button>
          </td>
        );
      }
    }

    return week;
  };

  let calendar = [];

  for (let week = firstWeek; week < lastWeek + 1; week++) {
    calendar.push(
      <tr key={week}>
        <td className="p-1 border-r">{week}</td>
        {getWeek(week)}
      </tr>
    );
  }

  function increaseMonth() {
    currentMonth++;
  }

  function decreaseMonth() {
    currentMonth--;
  }

  return (
    <>
      <div className="2xl:hidden flex flex-col items-center justify-center w-60 border rounded-lg p-1">
        <div className="flex items-center">
          <button onClick={decreaseMonth}>
            <Image
              src="/icons/chevron_left.png"
              width={32}
              height={32}
              alt="left"
            ></Image>
          </button>
          {monthsInYear[month] + " " + year}
          <button onClick={increaseMonth}>
            <Image
              src="/icons/chevron_right.png"
              width={32}
              height={32}
              alt="right"
            ></Image>
          </button>
        </div>
        <div>
          <table>
            <thead>
              <th></th>
              {weekdaysCalendar}
            </thead>
            <tbody>{calendar}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
