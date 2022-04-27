/*
  Warnings:

  - You are about to drop the column `prikaziPorez` on the `Racun` table. All the data in the column will be lost.
  - You are about to drop the column `tipUsluge` on the `Racun` table. All the data in the column will be lost.
  - You are about to drop the column `popust` on the `Stavka` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Racun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brojRacuna" TEXT NOT NULL,
    "kupac" TEXT NOT NULL,
    "adresa" TEXT NOT NULL,
    "OIB" INTEGER NOT NULL,
    "napomene" TEXT NOT NULL,
    "datumRacuna" INTEGER NOT NULL,
    "rokPlacanja" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "internetStranica" TEXT NOT NULL,
    "datumIsporuke" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Racun" ("OIB", "adresa", "brojRacuna", "createdAt", "datumIsporuke", "datumRacuna", "email", "id", "internetStranica", "kupac", "napomene", "rokPlacanja") SELECT "OIB", "adresa", "brojRacuna", "createdAt", "datumIsporuke", "datumRacuna", "email", "id", "internetStranica", "kupac", "napomene", "rokPlacanja" FROM "Racun";
DROP TABLE "Racun";
ALTER TABLE "new_Racun" RENAME TO "Racun";
CREATE TABLE "new_Stavka" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "opis" TEXT NOT NULL,
    "mjera" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL,
    "cijena" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "racunId" INTEGER NOT NULL,
    CONSTRAINT "Stavka_racunId_fkey" FOREIGN KEY ("racunId") REFERENCES "Racun" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stavka" ("cijena", "createdAt", "id", "kolicina", "mjera", "opis", "racunId") SELECT "cijena", "createdAt", "id", "kolicina", "mjera", "opis", "racunId" FROM "Stavka";
DROP TABLE "Stavka";
ALTER TABLE "new_Stavka" RENAME TO "Stavka";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
