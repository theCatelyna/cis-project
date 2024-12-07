import Link from "next/link";
import { getColorByEventtype } from "@/helperfunctions/eventfunctions";

interface containerProps {
  starttime: string;
  endtime: string;
  module: string;
  eventtype: string;
  teachers: string[];
}

export default function RoomContainer({
  starttime,
  endtime,
  module,
  eventtype,
  teachers,
}: containerProps) {
  const { bg_head, bg_body } = getColorByEventtype(eventtype);

  let teacher = [];

  for (const t in teachers) {
    teacher.push(
      <Link key={t} href="">
        {teachers[t]}
        <br />
      </Link>
    );
  }

  return (
    <>
      <div className={bg_body + " rounded-lg w-48 text-xs"}>
        <div className={bg_head + " rounded-t-lg px-1"}>
          {starttime + " - " + endtime}
        </div>
        <div className="pb-2 px-2 pt-1">
          <div className="font-bold">{module}</div>
          <div>{eventtype}</div>
          <div>{teacher}</div>
        </div>
      </div>
    </>
  );
}
