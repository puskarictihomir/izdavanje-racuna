import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const stavke = await prisma.stavka.findMany();

    res.status(200).json({ stavke });
  } else if (req.method === "POST") {
    console.log("req.body", req.body);
    return;

    const stavke = await prisma.stavka.createMany({
      data: req.body.map((el) => el),
      skipDuplicates: true,
    });

    res.status(200).send({ stavke });
  }
}
