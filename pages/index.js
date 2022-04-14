import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const racuni = await prisma.racun.findMany();

  return {
    props: {
      racuni,
    },
  };
}

export default function Home(props) {
  const racuni = props.racuni;

  return (
    <div>
      {racuni.map((r, i) => {
        return <div key={i}>{r.title}</div>;
      })}
    </div>
  );
}
