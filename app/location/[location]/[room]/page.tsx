import SemesterCalendarOverview from "@/components/Calendar/SemesterCalendarOverview";
import SemesterCalendarWeeks from "@/components/Calendar/SemesterCalendarWeeks";
import OneWeekTimetable from "@/components/Timetable/OneWeekTimetable";
import { getCurrentSemester } from "@/db/semester";
import { firstWeekday } from "@/helperfunctions/calenderfunctions";

export default async function Room({
  params,
  searchParams,
}: {
  params: { location: string; room: string };
  searchParams: { week: number; year: number };
}) {
  const { location, room } = await params;
  await searchParams;
  const dateTmp = new Date(firstWeekday(searchParams.week, searchParams.year));
  const date = new Date(
    Date.UTC(dateTmp.getFullYear(), dateTmp.getMonth(), dateTmp.getDate())
  );
  const semester = await getCurrentSemester(date);
  return (
    <>
      <SemesterCalendarOverview
        semester={semester}
        path={location + "/" + room}
      ></SemesterCalendarOverview>
      <SemesterCalendarWeeks
        path={location + "/" + room}
      ></SemesterCalendarWeeks>
      <div>
        <OneWeekTimetable></OneWeekTimetable>
      </div>
    </>
  );
}
