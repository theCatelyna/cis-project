import { getCurrentSemester } from "@/db/semester";
import {
  getWeekNumber,
  getWeeksInMonth,
  getWeeksInYear,
} from "@/helperfunctions/calenderfunctions";
import { monthsInYear } from "@/helperfunctions/calenderfunctions";
import Link from "next/link";

export default async function SemesterCalenderWeeek({
  path,
}: {
  path: string;
}) {
  const semester = await getCurrentSemester(new Date());

  let firstWeek = getWeekNumber(semester!.startdate);
  let lastWeek = getWeekNumber(semester!.enddate);
  let max_week = getWeeksInYear(semester!.startdate.getFullYear());

  let months = [];
  let calenderWeek = [];
  let description = [];

  if (semester!.startdate.getFullYear() != semester!.enddate.getFullYear()) {
    for (let month = semester!.startdate.getMonth(); month < 12; month++) {
      let weeksInMonth = getWeeksInMonth(
        month,
        semester!.startdate.getFullYear(),
        semester!.startdate.getMonth(),
        semester!.enddate.getMonth()
      );

      months.push(
        <th
          colSpan={weeksInMonth}
          key={month}
          className="font-normal border border-black"
        >
          {monthsInYear[month] + " " + semester!.startdate.getFullYear()}
        </th>
      );
    }

    for (let month = 0; month <= semester!.enddate.getMonth(); month++) {
      let weeksInMonth = getWeeksInMonth(
        month,
        semester!.enddate.getFullYear(),
        semester!.startdate.getMonth(),
        semester!.enddate.getMonth()
      );

      months.push(
        <th
          colSpan={weeksInMonth}
          key={month}
          className="font-normal border border-black"
        >
          {monthsInYear[month] + " " + semester!.enddate.getFullYear()}
        </th>
      );
    }
  } else {
    for (
      let month = semester!.startdate.getMonth();
      month < semester!.enddate.getMonth();
      month++
    ) {
      months.push(
        <th
          colSpan={getWeeksInMonth(
            month,
            semester!.startdate.getFullYear(),
            semester!.startdate.getMonth(),
            semester!.enddate.getMonth()
          )}
          key={month}
          className="font-normal border border-black"
        >
          {monthsInYear[month] + " " + semester!.startdate.getFullYear()}
        </th>
      );
    }
  }

  if (firstWeek > lastWeek) {
    for (let week = firstWeek; week <= max_week; week++) {
      calenderWeek.push(
        <td key={week} className="border border-black p-1 text-blue-800">
          <Link
            href={{
              pathname: path,
              query: { week: week, year: semester!.startdate.getFullYear() },
            }}
          >
            {week}
          </Link>
        </td>
      );
    }

    for (let week = 1; week <= lastWeek; week++) {
      calenderWeek.push(
        <td key={week} className="border border-black p-1 text-blue-800">
          <Link
            href={{
              pathname: path,
              query: { week: week, year: semester!.enddate.getFullYear() },
            }}
          >
            {week}
          </Link>
        </td>
      );
    }
  } else {
    for (let week = firstWeek; week < lastWeek; week++) {
      calenderWeek.push(
        <td key={week} className="border border-black p-1 text-blue-800">
          <Link
            href={{
              pathname: path,
              query: { week: week, year: semester!.startdate.getFullYear() },
            }}
          >
            {week}
          </Link>
        </td>
      );
    }
  }

  let firstLecturDay = semester!.startlecturedate;
  let lastLectureDay = semester!.endlecturedate;

  if (semester!.startdate.getFullYear() != semester!.enddate.getFullYear()) {
    description.push(
      <td
        key={1}
        colSpan={getWeekNumber(firstLecturDay) - firstWeek}
        className="border border-black"
      >
        Semesterferien
      </td>
    );

    description.push(
      <td
        key={2}
        colSpan={
          getWeekNumber(lastLectureDay) -
          (getWeekNumber(firstLecturDay) -
            getWeeksInYear(semester!.startdate.getFullYear()))
        }
        className="border border-black"
      >
        Vorlesungszeit
      </td>
    );

    description.push(
      <td
        key={3}
        colSpan={lastWeek - getWeekNumber(lastLectureDay) + 1}
        className="border border-black"
      >
        Semesterferien
      </td>
    );
  } else {
    description.push(
      <td
        key={1}
        colSpan={getWeekNumber(firstLecturDay) - firstWeek}
        className="border border-black"
      >
        Semesterferien
      </td>
    );

    description.push(
      <td
        key={2}
        colSpan={getWeekNumber(lastLectureDay) - getWeekNumber(firstLecturDay)}
        className="border border-black"
      >
        Vorlesungszeit
      </td>
    );

    description.push(
      <td
        key={3}
        colSpan={lastWeek - getWeekNumber(lastLectureDay) + 1}
        className="border border-black"
      >
        Semesterferien
      </td>
    );
  }

  return (
    <>
      <div className="hidden 2xl:flex rounded-lg">
        <table className="border border-black table-fixed w-4/5 text-center">
          <thead>
            <tr>
              <th className="font-normal">{semester!.abbreviation}</th>
              {months}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black font-bold">KW</td>
              {calenderWeek}
            </tr>
            <tr>
              <td></td>
              {description}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
