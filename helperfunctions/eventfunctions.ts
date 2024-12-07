export function getColorByEventtype(eventtype: string) {
    let bg_head = "";
    let bg_body = "";

    switch (eventtype) {
        case "Vorlesung":
          bg_head = "bg-yellow-300";
          bg_body = "bg-yellow-200";
          break;
        case "Übung":
          bg_head = "bg-lime-300";
          bg_body = "bg-lime-200";
          break;
        case "Praktikum":
          bg_head = "bg-purple-300";
          bg_body = "bg-purple-200";
          break;
        case "Seminar":
          bg_head = "bg-sky-300";
          bg_body = "bg-sky-200";
          break;
        case "Wahlpflichtfach":
          bg_head = "bg-pink-300";
          bg_body = "bg-pink-200";
          break;
        case "Tutorium":
          bg_head = "bg-violet-400";
          bg_body = "bg-violet-300";
          break;
        case "Besprechung":
          bg_head = "bg-orange-400";
          bg_body = "bg-orange-300";
          break;
        case "Prüfung":
          bg_head = "bg-red-500";
          bg_body = "bg-red-400";
          break;
      }

    return {bg_head: bg_head, bg_body: bg_body};
}