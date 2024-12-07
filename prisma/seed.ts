import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient()

async function main() {
    const data = require("../dbData/data.json");
    console.log("Seeding the database...");

    //add location
    for(const loca of data.location) {
        const location = await prisma.location.upsert({
            where: {
                name: loca
            },
            update: {},
            create: {
                name: loca,
            }
        })
    }

    //add room
    for(const r in data.room) {
        const room = await prisma.room.upsert({
            where: {
                abbreviation: data.room[r].abbreviation
            },
            update: {
                name: data.room[r].name,
                seats: data.room[r].seats,
                Location: {
                    connect: {
                        name: data.room[r].location
                    }
                },
                description: data.room[r].description,
            },
            create: {
                abbreviation: data.room[r].abbreviation,
                name: data.room[r].name,
                seats: data.room[r].seats,
                Location: {
                    connect: {
                        name: data.room[r].location
                    }
                },
                description: data.room[r].description,
            },
        });
    }

    //add faculty
    for(const f in data.faculty) {
        const faculty = await prisma.faculty.upsert({
            where: {
                abbreviation: data.faculty[f].abbreviation
            },
            update: {
                name: data.faculty[f].name,
                abbreviation: data.faculty[f].abbreviation,
                location: {
                    connect: data.faculty[f].location.map((loc: string) => ({name: loc}))
                },
            },
            create: {
                name: data.faculty[f].name,
                abbreviation: data.faculty[f].abbreviation,
                location: {
                    connect: data.faculty[f].location.map((loc: string) => ({name: loc}))
                },
            }
        });
    }

    for(const deg in data.degree) {
        const degree = await prisma.degree.upsert({
            where: {
                name: data.degree[deg]
            },
            update: {
                name: data.degree[deg]
            },
            create: {
                name: data.degree[deg]
            }
        })
    }

    for(const st in data.studytype) {
        const studytype = await prisma.studytype.upsert({
            where: {
                name: data.studytype[st]
            },
            update: {

            },
            create: {
                name: data.studytype[st]
            }
        })
    }

    for(const prog in data.programm) {
        const programme = await prisma.programme.upsert({
            where: {
                abbreviation: data.programm[prog].abbreviation,
            },
            update: {
                name: data.programm[prog].name,
                abbreviation: data.programm[prog].abbreviation,
                degree: {
                    connect: {
                        name: data.programm[prog].degree,
                    }
                },
                studytype: {
                    connect: {
                        name: data.programm[prog].studytype,
                    }
                },
                Faculty: {
                    connect: {
                        name: data.programm[prog].faculty,
                    }
                }
            },
            create: {
                name: data.programm[prog].name,
                abbreviation: data.programm[prog].abbreviation,
                degree: {
                    connect: {
                        name: data.programm[prog].degree,
                    }
                },
                studytype: {
                    connect: {
                        name: data.programm[prog].studytype,
                    }
                },
                Faculty: {
                    connect: {
                        name: data.programm[prog].faculty,
                    }
                }
            }
        })
    }

    for(const er in data.exam_regulation) {
        const exam_regulation = await prisma.exam_regulation.upsert({
            where: {
                abbreviation: data.exam_regulation[er].abbreviation
            },
            update: {
                abbreviation: data.exam_regulation[er].abbreviation,
                publishing_date: data.exam_regulation[er].publishing_date,
                Programme: {
                    connect: {
                        abbreviation: data.exam_regulation[er].programme
                    }
                }
            },
            create: {
                abbreviation: data.exam_regulation[er].abbreviation,
                publishing_date: data.exam_regulation[er].publishing_date,
                Programme: {
                    connect: {
                        abbreviation: data.exam_regulation[er].programme
                    }
                }
            }
        })
    }

    for(const mt in data.moduletype) {
        const moduletype = await prisma.moduletype.upsert({
            where: {
                abbreviation: data.moduletype[mt].abbreviation
            },
            update: {
                abbreviation: data.moduletype[mt].abbreviation,
                name: data.moduletype[mt].name
            },
            create: {
                abbreviation: data.moduletype[mt].abbreviation,
                name: data.moduletype[mt].name
            }
        })
    }

    for(const fr in data.frequency) {
        const frequency = await prisma.frequency.upsert({
            where: {
                abbreviation: data.frequency[fr].abbreviation
            },
            update: {

            },
            create: {
                abbreviation: data.frequency[fr].abbreviation,
                description: data.frequency[fr].description
            }
        })
    }

    for(const et in data.eventtype) {
        const eventtype = await prisma.eventtype.upsert({
            where: {
                abbreviation: data.eventtype[et].abbreviation
            },
            update: {
                abbreviation: data.eventtype[et].abbreviation,
                name: data.eventtype[et].name
            },
            create: {
                abbreviation: data.eventtype[et].abbreviation,
                name: data.eventtype[et].name
            }
        })
    }

    for(const ei in data.eventinformation) {
        const eventinformation = await prisma.eventinformation.upsert({
            where: {
                abbreviation: data.eventinformation[ei].abbreviation
            },
            update: {
                abbreviation: data.eventinformation[ei].abbreviation,
                frequency: {
                    connect: {
                        abbreviation: data.eventinformation[ei].frequency
                    }
                },
                eventtype: {
                    connect: {
                        abbreviation: data.eventinformation[ei].eventtype
                    }
                },
                duration: data.eventinformation[ei].duration
            },
            create: {
                abbreviation: data.eventinformation[ei].abbreviation,
                frequency: {
                    connect: {
                        abbreviation: data.eventinformation[ei].frequency
                    }
                },
                eventtype: {
                    connect: {
                        abbreviation: data.eventinformation[ei].eventtype
                    }
                },
                duration: data.eventinformation[ei].duration
            }
        })
    }

    for(const r in data.role) {
        const role = await prisma.role.upsert({
            where: {
                name: data.role[r]
            },
            update: {

            },
            create: {
                name: data.role[r]
            }
        })
    }

    for(const u in data.user) {
        const user = await prisma.user.upsert({
            where: {
                username: data.user[u].username
            },
            update: {
                username: data.user[u].username,
                hashedPassword: data.user[u].hashedPassword,
                first_name: data.user[u].first_name,
                surname: data.user[u].surname,
                last_login: data.user[u].last_login,
                role: {
                    connect: data.user[u].role.map((role: string) => ({name: role}))
                }
            },
            create: {
                username: data.user[u].username,
                hashedPassword: data.user[u].hashedPassword,
                first_name: data.user[u].first_name,
                surname: data.user[u].surname,
                last_login: data.user[u].last_login,
                role: {
                    connect: data.user[u].role.map((role: string) => ({name: role}))
                }
            }
        })
    }

    for(const st in data.semestertype) {
        const semestertype = await prisma.semestertype.upsert({
            where: {
                name: data.semestertype[st]
            },
            update: {

            },
            create: {
                name: data.semestertype[st]
            }
        })
    }

    for(const m in data.module) {
        if(Object.keys(data.module[m].person_in_charge).length != 0) {
            const module = await prisma.module.upsert({
                where: {
                    abbreviation: data.module[m].abbreviation
                },
                update: {
                    name: data.module[m].name,
                    abbreviation: data.module[m].abbreviation,
                    min_points: data.module[m].min_points,
                    points: data.module[m].points,
                    person_in_charge: {
                        connect: {
                            username: data.module[m].person_in_charge 
                        }
                    },
                    intended_semester: data.module[m].intended_semester,
                    eventinformation: {
                        connect: data.module[m].eventinformation.map((mi: string) => ({abbreviation: mi}))
                    },
                    Semestertype: {
                        connect: data.module[m].semestertype.map((st: string) => ({name: st}))
                    }
                },
                create: {
                    name: data.module[m].name,
                    abbreviation: data.module[m].abbreviation,
                    min_points: data.module[m].min_points,
                    points: data.module[m].points,
                    person_in_charge: {
                        connect: {
                            username: data.module[m].person_in_charge
                        }
                    },
                    intended_semester: data.module[m].intended_semester,
                    eventinformation: {
                        connect: data.module[m].eventinformation.map((mi: string) => ({abbreviation: mi}))
                    },
                    Semestertype: {
                        connect: data.module[m].semestertype.map((st: string) => ({name: st}))
                    }
                }
            })
        } else {
            const module = await prisma.module.upsert({
                where: {
                    abbreviation: data.module[m].abbreviation
                },
                update: {
                    name: data.module[m].name,
                    abbreviation: data.module[m].abbreviation,
                    min_points: data.module[m].min_points,
                    points: data.module[m].points,
                    person_in_charge: {},
                    intended_semester: data.module[m].intended_semester,
                    eventinformation: {
                        connect: data.module[m].eventinformation.map((mi: string) => ({abbreviation: mi}))
                    }
                },
                create: {
                    name: data.module[m].name,
                    abbreviation: data.module[m].abbreviation,
                    min_points: data.module[m].min_points,
                    points: data.module[m].points,
                    person_in_charge: {},
                    intended_semester: data.module[m].intended_semester,
                    eventinformation: {
                        connect: data.module[m].eventinformation.map((mi: string) => ({abbreviation: mi}))
                    }
                }
            })
        }
    }

    for(const mi in data.moduleinformation) {
        const exam_regulation = await prisma.exam_regulation.findUnique({
            where: {
                abbreviation: data.moduleinformation[mi].exam_regulation
            }
        })

        const module = await prisma.module.findUnique({
            where: {
                abbreviation: data.moduleinformation[mi].module
            }
        })

        const moduletype = await prisma.moduletype.findUnique({
            where: {
                abbreviation: data.moduleinformation[mi].moduletype
            }
        })

        const moduleinformation = await prisma.moduleinformation.upsert({
            where: {
                exam_regulationId_moduleId_moduletypeId: {
                    exam_regulationId: exam_regulation!.id,
                    moduleId: module!.id,
                    moduletypeId: moduletype!.id
                }
            },
            update: {

            },
            create: {
                exam_regulation: {
                    connect: {
                        abbreviation: data.moduleinformation[mi].exam_regulation
                    }
                },
                module: {
                    connect: {
                        abbreviation: data.moduleinformation[mi].module
                    }
                },
                moduletype: {
                    connect: {
                        abbreviation: data.moduleinformation[mi].moduletype
                    }
                }
            }
            
        })
    }

    for(const sem in data.semester) {
        const semester = await prisma.semester.upsert({
            where: {
                abbreviation: data.semester[sem].abbreviation
            },
            update: {
                abbreviation: data.semester[sem].abbreviation,
                name: data.semester[sem].name,
                semestertype: {
                    connect: {
                        name: data.semester[sem].semestertype
                    }
                },
                startdate: data.semester[sem].startdate,
                startlecturedate: data.semester[sem].startlecturedate,
                endlecturedate: data.semester[sem].endlecturedate,
                enddate: data.semester[sem].enddate
            },
            create: {
                abbreviation: data.semester[sem].abbreviation,
                name: data.semester[sem].name,
                semestertype: {
                    connect: {
                        name: data.semester[sem].semestertype
                    }
                },
                startdate: data.semester[sem].startdate,
                startlecturedate: data.semester[sem].startlecturedate,
                endlecturedate: data.semester[sem].endlecturedate,
                enddate: data.semester[sem].enddate
            }
        })
    }

    for(const gt in data.grouptable) {
        const group = await prisma.grouptable.upsert({
            where: {
                groupname: data.grouptable[gt]
            },
            update: {

            },
            create: {
                groupname: data.grouptable[gt]
            }
        })
    }

    for(const ev in data.event) {
        const module = await prisma.module.findUnique({
            where: {
                abbreviation: data.event[ev].module
            }
        })

        const eventtype = await prisma.eventtype.findUnique({
            where: {
                abbreviation: data.event[ev].eventtype
            }
        })

        const semester = await prisma.semester.findUnique({
            where: {
                abbreviation: data.event[ev].semester
            }
        })

        let starttime = new Date(data.event[ev].starttime);
        let starttimeUtc = new Date(starttime.getTime() + starttime.getTimezoneOffset() * 60000);
        let endtime = new Date(data.event[ev].endtime);
        let endtimeUtc = new Date(endtime.getTime() + endtime.getTimezoneOffset() * 60000);

        const event = await prisma.event.upsert({
            where: {
                moduleId_eventtypeId_semesterId_date_starttime_endtime: {
                    moduleId: module!.id,
                    eventtypeId: eventtype!.id,
                    semesterId: semester!.id,
                    date: data.event[ev].date,
                    starttime: data.event[ev].starttime,
                    endtime: data.event[ev].endtime
                }
            },
            update: {
                module: {
                    connect: {
                        abbreviation: data.event[ev].module
                    }
                },
                Eventtype: {
                    connect: {
                        abbreviation: data.event[ev].eventtype
                    }
                },
                semester: {
                    connect: {
                        abbreviation: data.event[ev].semester
                    }
                },
                date: data.event[ev].date,
                starttime: starttimeUtc,
                endtime: endtimeUtc,
                room: {
                    connect: {
                        abbreviation: data.event[ev].room
                    }
                },
                teacher: {
                    connect: data.event[ev].teacher.map((teacher: string) => ({username: teacher}))
                },
                max_size: data.event[ev].max_size,
                lastUpdate: new Date(),
                Grouptable: {
                    connect: {
                        groupname: data.event[ev].group
                    }
                }
            },
            create: {
                module: {
                    connect: {
                        abbreviation: data.event[ev].module
                    }
                },
                Eventtype: {
                    connect: {
                        abbreviation: data.event[ev].eventtype
                    }
                },
                semester: {
                    connect: {
                        abbreviation: data.event[ev].semester
                    }
                },
                date: data.event[ev].date,
                starttime: starttimeUtc,
                endtime: endtimeUtc,
                room: {
                    connect: {
                        abbreviation: data.event[ev].room
                    }
                },
                teacher: {
                    connect: data.event[ev].teacher.map((teacher: string) => ({username: teacher}))
                },
                max_size: data.event[ev].max_size,
                lastUpdate: new Date(),
                Grouptable: {
                    connect: {
                        groupname: data.event[ev].group
                    }
                }
            }
        })
    }

    for(const ef in data.exam_form) {
        const exam_form = await prisma.exam_form.upsert({
            where: {
                abbreviation: data.exam_form[ef].abbreviation
            },
            update: {
                abbreviation: data.exam_form[ef].abbreviation,
                description: data.exam_form[ef].description
            },
            create: {
                abbreviation: data.exam_form[ef].abbreviation,
                description: data.exam_form[ef].description
            }
        })
    }

    console.log("Seeding complete.")
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})