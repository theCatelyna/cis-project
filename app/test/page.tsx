import { getWeekNumber } from "@/helperfunctions/calenderfunctions";

export default function Test() {
  let date = new Date(Date.UTC(2024, 11, 1));

  console.log(date + " " + getWeekNumber(date));

  //   for (let month = 8; month < 12; month++) {
  //     let max_days = 0;
  //     [0, 2, 4, 6, 7, 9, 11].includes(month) ? (max_days = 31) : null;
  //     [3, 5, 8, 10].includes(month) ? (max_days = 30) : null;
  //     [1].includes(month) ? (max_days = 28) : null;

  //     for (let day = 1; day <= max_days; day++) {
  //       console.log(
  //         new Date(date.getFullYear(), month, day) +
  //           " " +
  //           getWeekNumber(new Date(date.getFullYear(), month, day))
  //       );
  //     }
  //   }

  //   for (let month = 0; month < 2; month++) {
  //     let max_days = 0;
  //     [0, 2, 4, 6, 7, 9, 11].includes(month) ? (max_days = 31) : null;
  //     [3, 5, 8, 10].includes(month) ? (max_days = 30) : null;
  //     [1].includes(month) ? (max_days = 28) : null;

  //     for (let day = 1; day <= max_days; day++) {
  //       console.log(
  //         new Date(date.getFullYear(), month, day) +
  //           " " +
  //           getWeekNumber(new Date(date.getFullYear(), month, day))
  //       );
  //     }
  //   }

  return (
    <>
      <div></div>
    </>
  );
}
