import prisma from "@/lib/prisma"

export async function getRoomByLocation(location: string) {
    const roomsByLocation = await prisma.room.findMany({
        where: {
          Location: {
            name: location,
          },
        },
    });

    return roomsByLocation;
}