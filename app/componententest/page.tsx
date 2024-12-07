import OneMonthCalendar from "@/components/Calendar/OneMonthCalendar";
import SixMonthCalendar from "@/components/Calendar/SixMonthCalendar";
import RoomContainer from "@/components/eventcontainer/RoomContainer";
import NavBar from "@/components/NavBar";
import RoomsTimetable from "@/components/Timetable/RoomsTimetableDay";
import Test from "../test/page";
import {
  getWeekNumber,
  getWeeksInMonth,
} from "@/helperfunctions/calenderfunctions";
import SemesterCalendarOverview from "@/components/Calendar/SemesterCalendarOverview";
import { getCurrentSemester } from "@/db/semester";
import SemesterCalendarWeeks from "@/components/Calendar/SemesterCalendarWeeks";
import OneWeekTimetable from "@/components/Timetable/OneWeekTimetable";
import AbbreviationContainer from "@/components/eventcontainer/AbbreviationContainer";

export default async function Componententest() {
  let today = new Date();
  let semester = await getCurrentSemester(
    new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
  );
  return (
    <>
      <div className="p-4 flex">
        {/* <OneWeekTimetable
          data=""
          length={5}
          week={getWeekNumber(today)}
          year={today.getFullYear()}
        ></OneWeekTimetable> */}
        {/* <SemesterCalendarWeeks path=""></SemesterCalendarWeeks>
        <SemesterCalendarOverview
          semester={semester}
          path=""
        ></SemesterCalendarOverview> */}
        <AbbreviationContainer
          starttime="08:15"
          endtime="09:45"
          eventtype="Vorlesung"
          abbreviation="MG-V"
          room="Ha-H401"
        ></AbbreviationContainer>
        <AbbreviationContainer
          starttime="08:15"
          endtime="09:45"
          eventtype="Vorlesung"
          abbreviation="MG-V"
          room="Ha-H401"
        ></AbbreviationContainer>
        <AbbreviationContainer
          starttime="08:15"
          endtime="09:45"
          eventtype="Vorlesung"
          abbreviation="MG-V"
          room="Ha-H401"
        ></AbbreviationContainer>
        <AbbreviationContainer
          starttime="08:15"
          endtime="09:45"
          eventtype="Vorlesung"
          abbreviation="MG-V"
          room="Ha-H401"
        ></AbbreviationContainer>
        <AbbreviationContainer
          starttime="08:15"
          endtime="09:45"
          eventtype="Vorlesung"
          abbreviation="MG-V"
          room="Ha-H401"
        ></AbbreviationContainer>
      </div>
    </>
  );
}
