/*
  Warnings:

  - You are about to alter the column `datumIsporuke` on the `Racun` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `datumRacuna` on the `Racun` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `rokPlacanja` on the `Racun` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
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
    "datumRacuna" INTEGER NOT NULL,
    "rokPlacanja" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "internetStranica" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "datumIsporuke" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Racun" ("OIB", "adresa", "brojRacuna", "createdAt", "datumIsporuke", "datumRacuna", "email", "iban", "id", "internetStranica", "kupac", "napomene", "prikaziPorez", "rokPlacanja", "tipUsluge") SELECT "OIB", "adresa", "brojRacuna", "createdAt", "datumIsporuke", "datumRacuna", "email", "iban", "id", "internetStranica", "kupac", "napomene", "prikaziPorez", "rokPlacanja", "tipUsluge" FROM "Racun";
DROP TABLE "Racun";
ALTER TABLE "new_Racun" RENAME TO "Racun";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
