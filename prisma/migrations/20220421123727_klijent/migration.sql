/*
  Warnings:

  - Added the required column `racunId` to the `Stavka` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Klijent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "naziv" TEXT NOT NULL,
    "tipDjelatnosti" TEXT NOT NULL,
    "oib" INTEGER NOT NULL,
    "adresa" TEXT NOT NULL,
    "grad" TEXT NOT NULL,
    "postBroj" TEXT NOT NULL,
    "drzava" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "mobitel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "internetStranica" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stavka" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "opis" TEXT NOT NULL,
    "mjera" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL,
    "cijena" INTEGER NOT NULL,
    "popust" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "racunId" INTEGER NOT NULL,
    CONSTRAINT "Stavka_racunId_fkey" FOREIGN KEY ("racunId") REFERENCES "Racun" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stavka" ("cijena", "createdAt", "id", "kolicina", "mjera", "opis", "popust") SELECT "cijena", "createdAt", "id", "kolicina", "mjera", "opis", "popust" FROM "Stavka";
DROP TABLE "Stavka";
ALTER TABLE "new_Stavka" RENAME TO "Stavka";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
