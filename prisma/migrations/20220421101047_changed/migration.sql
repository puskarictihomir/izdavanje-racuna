/*
  Warnings:

  - You are about to drop the column `content` on the `Racun` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Racun` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Racun` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - Added the required column `OIB` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresa` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brojRacuna` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datumIsporuke` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datumRacuna` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iban` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internetStranica` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kupac` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `napomene` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prikaziPorez` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rokPlacanja` to the `Racun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipUsluge` to the `Racun` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Stavka" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "opis" TEXT NOT NULL,
    "mjera" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL,
    "cijena" INTEGER NOT NULL,
    "popust" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Racun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipUsluge" TEXT NOT NULL,
    "brojRacuna" TEXT NOT NULL,
    "prikaziPorez" BOOLEAN NOT NULL,
    "kupac" TEXT NOT NULL,
    "adresa" TEXT NOT NULL,
    "OIB" INTEGER NOT NULL,
    "napomene" TEXT NOT NULL,
    "datumRacuna" DATETIME NOT NULL,
    "rokPlacanja" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "internetStranica" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "datumIsporuke" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Racun" ("createdAt", "id") SELECT "createdAt", "id" FROM "Racun";
DROP TABLE "Racun";
ALTER TABLE "new_Racun" RENAME TO "Racun";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
