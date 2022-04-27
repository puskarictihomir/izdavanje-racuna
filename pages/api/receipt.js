import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET" && req.query && req.query.id) {
    const racun = await prisma.racun.findUnique({
      where: {
        id: +req.query.id,
      },
      include: {
        stavkeRacuna: true,
      },
    });

    res.status(200).json({ racun });
  } else if (req.method === "POST") {
    const racun = await prisma.racun.create({
      data: {
        ...req.body,
        stavkeRacuna: {
          create: [...req.body.stavkeRacuna],
        },
      },
    });

    res.status(200).send({ racun });
  } else if (req.method === "GET") {
    const racuni = await prisma.racun.findMany();

    res.status(200).json({ racuni });
  } else if (req.method === "PATCH") {
    await prisma.racun.update({
      where: {
        id: +req.query.id,
      },
      data: {
        stavkeRacuna: {
          set: [],
        },
      },
    });

    const stavkeRacunaArray = req.body.stavkeRacuna.map((el) => {
      return {
        opis: el.opis,
        mjera: el.mjera,
        kolicina: el.kolicina,
        cijena: el.cijena,
      };
    });

    const azuriraniRacun = await prisma.racun.upsert({
      where: {
        id: +req.query.id,
      },
      update: {
        brojRacuna: req.body.brojRacuna,
        kupac: req.body.kupac,
        adresa: req.body.adresa,
        OIB: req.body.OIB,
        napomene: req.body.napomene,
        datumRacuna: req.body.datumRacuna,
        rokPlacanja: req.body.rokPlacanja,
        email: req.body.email,
        internetStranica: req.body.internetStranica,
        datumIsporuke: req.body.datumIsporuke,
      },
      create: {
        stavkeRacuna: [...stavkeRacunaArray],
      },
    });

    res.status(200).json({ azuriraniRacun });
  } else if (req.method === "DELETE") {
    console.log("req.query.id", req.query.id);
    const obrisaniRacun = await prisma.racun.delete({
      where: {
        id: +req.query.id,
      },
    });

    res.status(200).json({ obrisaniRacun });
  }
}
