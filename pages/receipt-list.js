import { useState, useEffect } from "react";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import CreateReceiptModal from "../modules/CreateReceiptModal";

export default function ClientList(props) {
  const createReceiptDis = useDisclosure();

  const [receipts, setReceipts] = useState(null);

  const handleEditReceipt = (id) => {};

  useEffect(() => {
    fetch("api/receipt")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReceipts(data.racuni);
      });
  }, []);

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
          {receipts?.map((r, i) => {
            return (
              <Tr key={i}>
                <Td>{r.brojRacuna}</Td>
                <Td>{r.kupac}</Td>
                <Td>IZNOS</Td>
                <Td>{r.datumRacuna}</Td>
                <Td>{r.rokPlacanja}</Td>
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
