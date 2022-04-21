import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const klijent = await prisma.klijent.create({
      data: { ...req.body },
    });

    res.status(200).send(klijent);
  } else if (req.method === "GET") {
    const klijenti = await prisma.klijent.findMany();

    res.status(200).json({ klijenti });
  }
}
