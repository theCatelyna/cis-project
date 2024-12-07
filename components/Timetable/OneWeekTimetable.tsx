import {
  getFirstWeekday,
  monthsInYear,
  weekdays,
  weekdaysFull,
} from "@/helperfunctions/calenderfunctions";

export default function OneWeekTimetable({
  data,
  length,
  week,
  year,
}: {
  data: any;
  length: number;
  week: number;
  year: number;
}) {
  let firstDay = getFirstWeekday(week, year);
  let lastDay = new Date(
    Date.UTC(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + length
    )
  );
  const getHeader = () => {
    let header = [];

    for (let day = 0; day < length; day++) {
      let currentDay = new Date(
        Date.UTC(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          firstDay.getDate() + day
        )
      );
      header.push(
        <th key={day} className="font-normal border border-black py-1 px-2">
          <div className="flex flex-col sm:hidden">
            {firstDay.getDay() === 0
              ? weekdays[6]
              : weekdays[currentDay.getDay() - 1]}
            <div className="font-bold">
              {(firstDay.getDate() < 10 ? "0" : "") +
                (firstDay.getDate() + day)}
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            {(firstDay.getDay() === 0
              ? weekdaysFull[6]
              : weekdaysFull[currentDay.getDay() - 1]) + ", "}
            <div className="font-bold">
              {(firstDay.getDate() < 10 ? "0" : "") +
                (firstDay.getDate() + day) +
                "." +
                (firstDay.getMonth() + 1) +
                "." +
                firstDay.getFullYear()}
            </div>
          </div>
        </th>
      );
    }

    return header;
  };

  const getContent = () => {
    let content = [];

    content.push("");

    return content;
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col sm:hidden items-center font-bold">
          {firstDay.getMonth() != lastDay.getMonth()
            ? monthsInYear[firstDay.getMonth()] +
              " " +
              firstDay.getFullYear() +
              "/" +
              monthsInYear[lastDay.getMonth()] +
              " " +
              lastDay.getFullYear()
            : monthsInYear[firstDay.getMonth()] + " " + firstDay.getFullYear()}
        </div>
        <table className="table-fixed w-full">
          <thead>
            <tr>{getHeader()}</tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
