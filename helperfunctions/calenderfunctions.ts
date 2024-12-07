export function getWeeksInYear(year: number) {
  const firstDay = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const lastDay = new Date(Date.UTC(year, 11, 31)).getUTCDay();

  return firstDay === 4 || lastDay === 4 ? 53 : 52;
}

export function getWeekNumber(date: Date) {
  const year = date.getFullYear();
  const januaryFirst = +new Date(Date.UTC(year, 0, 1));
  const today = +new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate())
  );

  let dayOfWeek = new Date(year, 0, 1).getDay();
  (dayOfWeek === 0) ? dayOfWeek = 7 : dayOfWeek

  const dayOfYear = ((today - januaryFirst + 1) / 86400000) + dayOfWeek - 1;

  const week = Math.ceil(dayOfYear / 7);

  return week;
}

export function getWeeksInMonth(month: number, year: number, startmonth: number, endmonth: number) {
  let weeksInMonth = 0;
  const firstDay = new Date(Date.UTC(year, month, 1));
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const firstWeek = getWeekNumber(firstDay);
  const lastWeek = getWeekNumber(lastDay);

  weeksInMonth = lastWeek - firstWeek + 1;

  if([0,5,6].includes(firstDay.getDay()) && month != startmonth) {
    weeksInMonth--;
  }

  if([1,2,3].includes(lastDay.getDay()) && month != endmonth) {
    weeksInMonth--;
  }

  return weeksInMonth;
}

export function getFirstWeekday(weeknr: number, year: number) {
  if (weeknr === 1) {
    return new Date(Date.UTC(year - 1, 0, 1 + getWeeksInYear(year - 1) * 7));
  } else {
    return new Date(
      Date.UTC(
        year,
        0,
        1 + (weeknr - 1) * 7 - new Date(year, 0, 1).getDay() + 1
      )
    );
  }
};

export const monthsInYear = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
]

export const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

export const weekdaysFull = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];