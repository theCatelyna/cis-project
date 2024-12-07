import { getCurrentSemester } from "@/db/semester";
import {
  getWeekNumber,
  getWeeksInYear,
  getFirstWeekday,
} from "@/helperfunctions/calenderfunctions";
import { monthsInYear, weekdays } from "@/helperfunctions/calenderfunctions";
import Link from "next/link";

export default async function SixMonthCalendar({
  path,
  date,
}: {
  path: string;
  date: Date;
}) {
  let today = new Date();

  const semester = await getCurrentSemester(today);

  let firstMonth = semester!.startdate.getMonth() || 0;
  let lastMonth = semester!.enddate.getMonth() || 0;

  let weekdaysCalendar = [];

  for (const weekday in weekdays) {
    weekdaysCalendar.push(
      <th key={weekdays[weekday]} className="p-1 font-normal">
        {weekdays[weekday]}
      </th>
    );
  }

  const getWeek = (weeknr: number, monthnr: number, year: number) => {
    let week = [];
    let firstDay = getFirstWeekday(weeknr, year);
    let month = firstDay.getMonth();
    let day = firstDay.getDate();

    for (; day < firstDay.getDate() + 7; day++) {
      let currentDay = new Date(Date.UTC(year, month, day));
      let key_day = year + "-" + (month + 1) + "-" + day;

      if (currentDay.getMonth() === monthnr) {
        if (
          currentDay.getFullYear() === date.getFullYear() &&
          currentDay.getMonth() === date.getMonth() &&
          currentDay.getDate() === date.getDate()
        ) {
          week.push(
            <td
              key={key_day}
              className="rounded-full bg-primary text-white text-center"
            >
              <Link
                href={{
                  pathname: path,
                  query: { date: key_day },
                }}
              >
                {currentDay.getDate()}
              </Link>
            </td>
          );
        } else {
          if (
            currentDay.getFullYear() === today.getFullYear() &&
            currentDay.getMonth() === today.getMonth() &&
            currentDay.getDate() === today.getDate()
          ) {
            week.push(
              <td
                key={key_day}
                className="rounded-full bg-neutral text-white text-center"
              >
                <Link
                  href={{
                    pathname: path,
                    query: { date: key_day },
                  }}
                >
                  {currentDay.getDate()}
                </Link>
              </td>
            );
          } else {
            week.push(
              <td key={key_day} className="text-center">
                <Link
                  href={{
                    pathname: path,
                    query: { date: key_day },
                  }}
                >
                  {currentDay.getDate()}
                </Link>
              </td>
            );
          }
        }
      } else {
        week.push(
          <td key={key_day} className="text-neutral text-center">
            <Link
              href={{
                pathname: path,
                query: { date: key_day },
              }}
            >
              {currentDay.getDate()}
            </Link>
          </td>
        );
      }
    }

    return week;
  };

  const getMonthCalendar = (monthnr: number, year: number) => {
    let lastday = new Date(Date.UTC(year, monthnr + 1, 0));
    let firstDate = new Date(Date.UTC(year, monthnr, 1));
    let firstWeek = getWeekNumber(firstDate);
    let lastWeek = getWeekNumber(lastday);

    let monthCalendar = [];

    for (let week = firstWeek; week < lastWeek + 1; week++) {
      monthCalendar.push(
        <tr key={week}>
          <td className="p-1 border-r">
            {getWeeksInYear(year) === 52 && week === 53 ? 1 : week}
          </td>
          {getWeek(week, monthnr, year)}
        </tr>
      );
    }

    return monthCalendar;
  };

  const getSemesterCalendar = () => {
    let semesterCalendar = [];

    if (firstMonth > lastMonth) {
      for (let monthnr = firstMonth; monthnr < 12; monthnr++) {
        semesterCalendar.push(
          <div
            key={monthnr}
            className="flex flex-col items-center border rounded-lg p-1"
          >
            <div className="flex items-center">
              {monthsInYear[monthnr] + " " + semester!.startdate.getFullYear()}
            </div>
            <div>
              <table>
                <thead>
                  <th></th>
                  {weekdaysCalendar}
                </thead>
                <tbody>
                  {getMonthCalendar(monthnr, semester!.startdate.getFullYear())}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      for (let monthnr = 0; monthnr <= lastMonth; monthnr++) {
        semesterCalendar.push(
          <div
            key={monthnr}
            className="flex flex-col items-center border rounded-lg p-1"
          >
            <div className="flex items-center">
              {monthsInYear[monthnr] + " " + semester!.enddate.getFullYear()}
            </div>
            <div>
              <table>
                <thead>
                  <td></td>
                  {weekdaysCalendar}
                </thead>
                <tbody>
                  {getMonthCalendar(monthnr, semester!.enddate.getFullYear())}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    } else {
      for (let monthnr = firstMonth; monthnr < lastMonth; monthnr++) {
        semesterCalendar.push(
          <div
            key={monthnr}
            className="flex flex-col items-center border rounded-lg p-1"
          >
            <div className="flex items-center">
              {monthsInYear[monthnr] + " " + semester!.startdate.getFullYear()}
            </div>
            <div>
              <table>
                <thead>
                  <td></td>
                  {weekdaysCalendar}
                </thead>
                <tbody>
                  {getMonthCalendar(monthnr, semester!.enddate.getFullYear())}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    return semesterCalendar;
  };

  return (
    <>
      <div className="hidden 2xl:flex flex-col items-center">
        <div>{semester?.name}</div>
        <div className="flex m-4 space-x-2 text-sm">
          {getSemesterCalendar()}
        </div>
      </div>
    </>
  );
}
