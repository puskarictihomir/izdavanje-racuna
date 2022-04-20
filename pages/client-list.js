import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, Link } from "@chakra-ui/react";

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

export default function ClientList(props) {
  const racuni = props.racuni;

  return (
    <Box m={10}>
      <Button mb={8}>
        <Link href="/">Novi klijent</Link>
      </Button>
      <Heading mb={4}>Popis klijenata ({racuni.length})</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Naziv</Th>
            <Th>Adresa</Th>
            <Th>Kontakt</Th>
            <Th>OIB</Th>
          </Tr>
        </Thead>
        <Tbody>
          {racuni.map((r, i) => {
            return (
              <Tr key={i}>
                <Td>{r.id}</Td>
                <Td>{r.title}</Td>
                <Td>{r.content}</Td>
                <Td>OIB</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
