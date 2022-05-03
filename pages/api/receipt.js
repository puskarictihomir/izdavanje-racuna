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
    await prisma.stavka.deleteMany({
      where: {
        racunId: +req.query.id,
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

    const azuriraniRacun = await prisma.racun.update({
      where: {
        id: +req.query.id,
      },
      data: {
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
        stavkeRacuna: {
          create: [...stavkeRacunaArray],
        },
      },
    });

    res.status(200).json({ azuriraniRacun });
  } else if (req.method === "DELETE") {
    await prisma.stavka.deleteMany({
      where: {
        racunId: +req.query.id,
      },
    });

    const obrisaniRacun = await prisma.racun.delete({
      where: {
        id: +req.query.id,
      },
    });

    res.status(200).json({ obrisaniRacun });
  }
}
