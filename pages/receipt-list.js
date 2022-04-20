import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { PrismaClient } from "@prisma/client";

import CreateReceiptModal from "../modules/CreateReceiptModal";

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

  const createReceiptDis = useDisclosure();

  const handleEditReceipt = (id) => {};

  return (
    <Box m={10}>
      <Button mb={8} onClick={createReceiptDis.onOpen}>
        Novi račun
      </Button>
      <Heading mb={4}>Izlazni računi</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Broj računa</Th>
            <Th>Kupac</Th>
            <Th>Iznos računa</Th>
            <Th>Datum računa</Th>
            <Th>Rok plaćanja</Th>
            <Th>Opcije</Th>
          </Tr>
        </Thead>
        <Tbody>
          {racuni.map((r, i) => {
            return (
              <Tr key={i}>
                <Td>{r.id}</Td>
                <Td>{r.title}</Td>
                <Td>{r.content}</Td>
                <Td>Datum računa</Td>
                <Td>Rok plaćanja</Td>
                <Td>
                  <IconButton mr={2} icon={<EditIcon />} colorScheme="blue" onClick={() => handleEditReceipt(r.id)} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {createReceiptDis.isOpen && (
        <CreateReceiptModal isOpen={createReceiptDis.isOpen} onClose={createReceiptDis.onClose} />
      )}
    </Box>
  );
}
