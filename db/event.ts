import prisma from "@/lib/prisma";

export async function getEventsByRoom(room: string, date: Date) {
  const eventsByRoom = await prisma.event.findMany({
      where: {
        room: {
          abbreviation: room
        },
        date: {
          lte: date,
          gte: date,
        },
      },
      include: {
        teacher: true,
        Grouptable: true,
        module: true,
        Eventtype: true,
        room: true,
        semester: true,
      },
      orderBy: {
        date: "asc",
      },
    });

  return eventsByRoom;
}