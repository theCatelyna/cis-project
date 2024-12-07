import { Prisma } from "@prisma/client";

export type Location = Prisma.LocationGetPayload<{
    include: {
        _count: {
          select: {
            rooms: true,
          };
        };
      };
}>;