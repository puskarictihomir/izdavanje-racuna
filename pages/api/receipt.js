import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const racun = await prisma.racun.create({
      data: { ...req.body },
    });

    res.status(200).send(racun);
  } else if (req.method === "GET") {
    const racuni = await prisma.racun.findMany();

    res.status(200).json({ racuni });
  }
}
