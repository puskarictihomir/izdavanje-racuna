import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET" && req.query && req.query.id) {
    const racun = await prisma.racun.findUnique({
      where: {
        id: +req.query.id,
      },
    });

    res.status(200).json({ racun });
  } else if (req.method === "POST") {
    console.log("req.body from racun", req.body);

    const racun = await prisma.racun.create({
      data: { ...req.body },
    });

    res.status(200).send({ racun });
  } else if (req.method === "GET") {
    const racuni = await prisma.racun.findMany();

    res.status(200).json({ racuni });
  } else if (req.method === "PATCH") {
    const azuriraniRacun = await prisma.racun.update({
      where: {
        id: +req.query.id,
      },
      data: { ...req.body },
    });

    res.status(200).json({ azuriraniRacun });
  }
}
