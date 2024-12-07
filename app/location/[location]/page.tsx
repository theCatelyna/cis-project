import OneMonthCalendar from "@/components/Calendar/OneMonthCalendar";
import SixMonthCalendar from "@/components/Calendar/SixMonthCalendar";
import NavBar from "@/components/NavBar";
import RoomsTimetableDay from "@/components/Timetable/RoomsTimetableDay";

export default async function Rooms({
  params,
  searchParams,
}: {
  params: { location: string };
  searchParams: { date?: string };
}) {
  const { location } = await params;
  await searchParams;
  const locationEdited =
    String(location).charAt(0).toUpperCase() + String(location).slice(1);
  const dateParams = searchParams.date ?? "";
  const dateTmp = new Date(dateParams) ?? new Date();
  const date = new Date(
    Date.UTC(dateTmp.getFullYear(), dateTmp.getMonth(), dateTmp.getDate())
  );

  return (
    <>
      <NavBar>
        <OneMonthCalendar></OneMonthCalendar>
        <SixMonthCalendar
          date={date}
          path={"/location/" + location.toLowerCase()}
        ></SixMonthCalendar>
        <RoomsTimetableDay
          location={locationEdited}
          date={date}
        ></RoomsTimetableDay>
      </NavBar>
    </>
  );
}
