-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "sbn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_sbn_key" ON "Book"("sbn");
