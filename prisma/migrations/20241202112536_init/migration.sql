-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Location_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `seats` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `locationId` INTEGER NOT NULL,

    UNIQUE INDEX `Room_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Faculty_name_key`(`name`),
    UNIQUE INDEX `Faculty_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,
    `degreeId` INTEGER NOT NULL,
    `studytypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Programme_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Degree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Degree_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studytype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Studytype_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam_regulation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `publishing_date` VARCHAR(191) NOT NULL,
    `programmeId` INTEGER NOT NULL,

    UNIQUE INDEX `Exam_regulation_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,
    `min_points` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `intended_semester` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Module_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moduleinformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_regulationId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `moduletypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Moduleinformation_exam_regulationId_moduleId_moduletypeId_key`(`exam_regulationId`, `moduleId`, `moduletypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moduletype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Moduletype_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Frequency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Frequency_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventtype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Eventtype_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventinformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `frequencyId` INTEGER NOT NULL,
    `eventtypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Eventinformation_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grouptable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Grouptable_groupname_key`(`groupname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `starttime` TIME NOT NULL,
    `endtime` TIME NOT NULL,
    `max_size` INTEGER NOT NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `eventtypeId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `grouptableId` INTEGER NULL,

    UNIQUE INDEX `Event_moduleId_eventtypeId_semesterId_date_starttime_endtime_key`(`moduleId`, `eventtypeId`, `semesterId`, `date`, `starttime`, `endtime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `last_login` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `register_number` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `isEnrolled` BOOLEAN NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Student_register_number_key`(`register_number`),
    UNIQUE INDEX `Student_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semester` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startdate` DATE NOT NULL,
    `startlecturedate` DATE NOT NULL,
    `endlecturedate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `semestertypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Semester_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semestertype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Semestertype_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `starttime` TIME NOT NULL,
    `endtime` TIME NOT NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `exam_formId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam_form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abbreviation` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Exam_form_abbreviation_key`(`abbreviation`),
    UNIQUE INDEX `Exam_form_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `date_changed` DATETIME(3) NOT NULL,
    `days_shown` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `type_changeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type_change` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_change_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LocationToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LocationToUser_AB_unique`(`A`, `B`),
    INDEX `_LocationToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FacultyToLocation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FacultyToLocation_AB_unique`(`A`, `B`),
    INDEX `_FacultyToLocation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProgrammeToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProgrammeToStudent_AB_unique`(`A`, `B`),
    INDEX `_ProgrammeToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DegreeToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DegreeToStudent_AB_unique`(`A`, `B`),
    INDEX `_DegreeToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Exam_regulationToModule` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Exam_regulationToModule_AB_unique`(`A`, `B`),
    INDEX `_Exam_regulationToModule_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModuleToSemestertype` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModuleToSemestertype_AB_unique`(`A`, `B`),
    INDEX `_ModuleToSemestertype_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventinformationToModule` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventinformationToModule_AB_unique`(`A`, `B`),
    INDEX `_EventinformationToModule_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GrouptableToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GrouptableToStudent_AB_unique`(`A`, `B`),
    INDEX `_GrouptableToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventToUser_AB_unique`(`A`, `B`),
    INDEX `_EventToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ExamToRoom` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ExamToRoom_AB_unique`(`A`, `B`),
    INDEX `_ExamToRoom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ExamToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ExamToUser_AB_unique`(`A`, `B`),
    INDEX `_ExamToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NotificationToType_change` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NotificationToType_change_AB_unique`(`A`, `B`),
    INDEX `_NotificationToType_change_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Programme` ADD CONSTRAINT `Programme_degreeId_fkey` FOREIGN KEY (`degreeId`) REFERENCES `Degree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Programme` ADD CONSTRAINT `Programme_studytypeId_fkey` FOREIGN KEY (`studytypeId`) REFERENCES `Studytype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Programme` ADD CONSTRAINT `Programme_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_regulation` ADD CONSTRAINT `Exam_regulation_programmeId_fkey` FOREIGN KEY (`programmeId`) REFERENCES `Programme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moduleinformation` ADD CONSTRAINT `Moduleinformation_exam_regulationId_fkey` FOREIGN KEY (`exam_regulationId`) REFERENCES `Exam_regulation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moduleinformation` ADD CONSTRAINT `Moduleinformation_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moduleinformation` ADD CONSTRAINT `Moduleinformation_moduletypeId_fkey` FOREIGN KEY (`moduletypeId`) REFERENCES `Moduletype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eventinformation` ADD CONSTRAINT `Eventinformation_frequencyId_fkey` FOREIGN KEY (`frequencyId`) REFERENCES `Frequency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eventinformation` ADD CONSTRAINT `Eventinformation_eventtypeId_fkey` FOREIGN KEY (`eventtypeId`) REFERENCES `Eventtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_eventtypeId_fkey` FOREIGN KEY (`eventtypeId`) REFERENCES `Eventtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_grouptableId_fkey` FOREIGN KEY (`grouptableId`) REFERENCES `Grouptable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semester` ADD CONSTRAINT `Semester_semestertypeId_fkey` FOREIGN KEY (`semestertypeId`) REFERENCES `Semestertype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_exam_formId_fkey` FOREIGN KEY (`exam_formId`) REFERENCES `Exam_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocationToUser` ADD CONSTRAINT `_LocationToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocationToUser` ADD CONSTRAINT `_LocationToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToLocation` ADD CONSTRAINT `_FacultyToLocation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToLocation` ADD CONSTRAINT `_FacultyToLocation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgrammeToStudent` ADD CONSTRAINT `_ProgrammeToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Programme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgrammeToStudent` ADD CONSTRAINT `_ProgrammeToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DegreeToStudent` ADD CONSTRAINT `_DegreeToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Degree`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DegreeToStudent` ADD CONSTRAINT `_DegreeToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Exam_regulationToModule` ADD CONSTRAINT `_Exam_regulationToModule_A_fkey` FOREIGN KEY (`A`) REFERENCES `Exam_regulation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Exam_regulationToModule` ADD CONSTRAINT `_Exam_regulationToModule_B_fkey` FOREIGN KEY (`B`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModuleToSemestertype` ADD CONSTRAINT `_ModuleToSemestertype_A_fkey` FOREIGN KEY (`A`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModuleToSemestertype` ADD CONSTRAINT `_ModuleToSemestertype_B_fkey` FOREIGN KEY (`B`) REFERENCES `Semestertype`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventinformationToModule` ADD CONSTRAINT `_EventinformationToModule_A_fkey` FOREIGN KEY (`A`) REFERENCES `Eventinformation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventinformationToModule` ADD CONSTRAINT `_EventinformationToModule_B_fkey` FOREIGN KEY (`B`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GrouptableToStudent` ADD CONSTRAINT `_GrouptableToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Grouptable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GrouptableToStudent` ADD CONSTRAINT `_GrouptableToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToUser` ADD CONSTRAINT `_EventToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToUser` ADD CONSTRAINT `_EventToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExamToRoom` ADD CONSTRAINT `_ExamToRoom_A_fkey` FOREIGN KEY (`A`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExamToRoom` ADD CONSTRAINT `_ExamToRoom_B_fkey` FOREIGN KEY (`B`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExamToUser` ADD CONSTRAINT `_ExamToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExamToUser` ADD CONSTRAINT `_ExamToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NotificationToType_change` ADD CONSTRAINT `_NotificationToType_change_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NotificationToType_change` ADD CONSTRAINT `_NotificationToType_change_B_fkey` FOREIGN KEY (`B`) REFERENCES `Type_change`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
