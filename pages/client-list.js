import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, Link, useDisclosure } from "@chakra-ui/react";

import { PrismaClient } from "@prisma/client";

import CreateClientModal from "../modules/CreateClientModal";

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

  const createClientDis = useDisclosure();

  return (
    <Box m={10}>
      <Button mb={8} onClick={createClientDis.onOpen}>
        Novi klijent
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
      {createClientDis.isOpen && (
        <CreateClientModal isOpen={createClientDis.isOpen} onClose={createClientDis.onClose} />
      )}
    </Box>
  );
}
