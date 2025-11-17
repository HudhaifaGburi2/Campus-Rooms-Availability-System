-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('CLASSROOM', 'CONFERENCE', 'LAB', 'OFFICE', 'AUDITORIUM', 'LIBRARY', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "buildings" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floors" (
    "id" UUID NOT NULL,
    "building_id" UUID NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "map_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "floors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL,
    "floor_id" UUID NOT NULL,
    "room_number" VARCHAR(50) NOT NULL,
    "type" "RoomType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "coordinates" JSONB,
    "equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "class_name" VARCHAR(255) NOT NULL,
    "booked_by" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_logs" (
    "id" UUID NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "total_rows" INTEGER NOT NULL,
    "error_count" INTEGER NOT NULL,
    "errors" JSONB,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "import_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buildings_name_key" ON "buildings"("name");

-- CreateIndex
CREATE INDEX "buildings_name_idx" ON "buildings"("name");

-- CreateIndex
CREATE INDEX "floors_building_id_idx" ON "floors"("building_id");

-- CreateIndex
CREATE UNIQUE INDEX "floors_building_id_floor_number_key" ON "floors"("building_id", "floor_number");

-- CreateIndex
CREATE INDEX "rooms_floor_id_idx" ON "rooms"("floor_id");

-- CreateIndex
CREATE INDEX "rooms_type_idx" ON "rooms"("type");

-- CreateIndex
CREATE INDEX "rooms_capacity_idx" ON "rooms"("capacity");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_floor_id_room_number_key" ON "rooms"("floor_id", "room_number");

-- CreateIndex
CREATE INDEX "schedules_room_id_idx" ON "schedules"("room_id");

-- CreateIndex
CREATE INDEX "schedules_start_time_end_time_idx" ON "schedules"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "import_logs_created_at_idx" ON "import_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "floors_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
