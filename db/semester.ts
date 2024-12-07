import prisma from "@/lib/prisma";

export async function getCurrentSemester(date: Date) {
    const semester = await prisma.semester.findFirst({
        where: {
          AND: [
            {
              startdate: {
                lte: date,
              },
            },
            {
              enddate: {
                gt: date,
              },
            },
          ],
        },
      });

      return semester;
}