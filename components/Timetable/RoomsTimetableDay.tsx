import RoomContainer from "../eventcontainer/RoomContainer";
import Link from "next/link";
import { getRoomByLocation } from "@/db/room";
import { getEventsByRoom } from "@/db/event";
import { getWeekNumber } from "@/helperfunctions/calenderfunctions";

export default async function RoomsTimetableDay({
  location,
  date,
}: {
  location: string;
  date: Date;
}) {
  let tableHeaderTop = [];

  for (let i = 8; i < 20; i++) {
    tableHeaderTop.push(
      <td key={i} colSpan={4} align="left" className={"border border-gray-400"}>
        {i}
      </td>
    );
  }

  let tableHeaderBottom = [];

  for (let i = 8; i < 20; i++) {
    for (let j = 0; j < 60; j += 15) {
      tableHeaderBottom.push(
        <td key={i + "." + j} className="border border-gray-400 text-center">
          {j === 0 ? "00" : j}
        </td>
      );
    }
  }

  const roomsByLocation = await getRoomByLocation(location);

  let rooms = [];

  for (const room in roomsByLocation) {
    let events = [];

    const eventsInRoom = await getEventsByRoom(
      roomsByLocation[room].abbreviation,
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    );

    const getHoursInMinutes = (hours: number, minutes: number) => {
      return hours * 60 + minutes;
    };

    if (eventsInRoom.length > 0) {
      let startHour = 8;
      let startMinute = 0;
      let endHour = 20;
      let endMinute = 60;
      let hour = startHour;
      let minute = startMinute;
      let key = "";

      for (const event in eventsInRoom) {
        let timeunit = 0;

        let teachers = [];
        for (const teacher in eventsInRoom[event].teacher) {
          teachers.push(
            eventsInRoom[event].teacher[teacher].first_name +
              " " +
              eventsInRoom[event].teacher[teacher].surname
          );
        }

        loop: for (; hour < endHour; hour++) {
          for (; minute < endMinute; minute += 15) {
            if (
              getHoursInMinutes(
                eventsInRoom[event].starttime.getHours(),
                eventsInRoom[event].starttime.getMinutes()
              ) > getHoursInMinutes(hour, minute)
            ) {
              events.push(<td key={hour + ":" + minute}></td>);
            }

            if (
              getHoursInMinutes(
                eventsInRoom[event].starttime.getHours(),
                eventsInRoom[event].starttime.getMinutes()
              ) === getHoursInMinutes(hour, minute)
            ) {
              key = hour + ":" + minute;
            }

            if (
              getHoursInMinutes(
                eventsInRoom[event].starttime.getHours(),
                eventsInRoom[event].starttime.getMinutes()
              ) <= getHoursInMinutes(hour, minute) &&
              getHoursInMinutes(
                eventsInRoom[event].endtime.getHours(),
                eventsInRoom[event].endtime.getMinutes()
              ) >= getHoursInMinutes(hour, minute)
            ) {
              timeunit++;
            }

            if (
              getHoursInMinutes(
                eventsInRoom[event].endtime.getHours(),
                eventsInRoom[event].endtime.getMinutes()
              ) === getHoursInMinutes(hour, minute)
            ) {
              events.push(
                <td key={key} colSpan={6}>
                  <RoomContainer
                    starttime={eventsInRoom[event].starttime
                      .toLocaleTimeString()
                      .substring(0, 5)}
                    endtime={eventsInRoom[event].endtime
                      .toLocaleTimeString()
                      .substring(0, 5)}
                    module={eventsInRoom[event].module.name}
                    eventtype={eventsInRoom[event].Eventtype.name}
                    teachers={teachers}
                    key={eventsInRoom[event].module.abbreviation}
                  ></RoomContainer>
                </td>
              );
              timeunit = 0;
              break loop;
            }
          }

          if (minute === 60) {
            minute = 0;
          }
        }
      }
    }

    rooms.push(
      <tr className="border border-gray-400" key={roomsByLocation[room].id}>
        <td className="border border-gray-400 sticky left-0 font-normal">
          <div className="rounded-lg bg-white p-2 whitespace-nowrap">
            <Link
              href={{
                pathname:
                  "/location/" +
                  location.toLocaleLowerCase() +
                  "/" +
                  roomsByLocation[room].abbreviation,
                query: { week: getWeekNumber(date) },
              }}
            >
              {roomsByLocation[room].name}
            </Link>
            <div className="text-sm">
              {roomsByLocation[room].seats + " Plätze"}
            </div>
          </div>
        </td>
        {events}
      </tr>
    );

    events = [];
  }

  return (
    <>
      <div className="sm:flex flex-col justify-center items-center">
        <div className="mb-2">
          Raumübersicht für <b>{location}</b> den{" "}
          <b>
            {(date.getDate() < 10 ? "0" : "") +
              date.getDate() +
              "." +
              (date.getMonth() < 9 ? "0" : "") +
              (date.getMonth() + 1) +
              "." +
              date.getFullYear()}
          </b>
        </div>
        <div className="overflow-scroll sticky top-0">
          <table
            cellPadding={5}
            className="table-auto border border-spacing-0 border-gray-400"
          >
            <thead className="border border-gray-400 z-10">
              <tr>
                <th rowSpan={2} className="border border-gray-400">
                  Raum
                </th>
                {tableHeaderTop}
              </tr>
              <tr className="border border-gray-400">{tableHeaderBottom}</tr>
            </thead>
            <tbody>{rooms}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
