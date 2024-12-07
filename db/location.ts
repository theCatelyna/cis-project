import prisma from "@/lib/prisma";
import { Location } from "./types"

export async function getAllLocations(): Promise<Location[]> {
    const allLocations = await prisma.location.findMany({
        include: {
          _count: {
            select: {
              rooms: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

    return allLocations;
}