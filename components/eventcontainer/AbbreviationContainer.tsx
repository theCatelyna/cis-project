import { getColorByEventtype } from "@/helperfunctions/eventfunctions";

export default function AbbreviationContainer({
  starttime,
  endtime,
  eventtype,
  abbreviation,
  room,
}: {
  starttime: string;
  endtime: string;
  eventtype: string;
  abbreviation: string;
  room: string;
}) {
  const { bg_head, bg_body } = getColorByEventtype(eventtype);
  return (
    <>
      <div className={bg_body + " rounded-lg w-24 text-sm"}>
        <div className={bg_head + " rounded-t-lg px-1"}>
          {starttime + " - " + endtime}
        </div>
        <div className="pb-2 px-2">
          <div className="font-bold">{abbreviation}</div>
          <div className="text-xs">{room}</div>
        </div>
      </div>
    </>
  );
}
