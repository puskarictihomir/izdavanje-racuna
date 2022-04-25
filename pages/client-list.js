import { useState, useEffect } from "react";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useDisclosure } from "@chakra-ui/react";

import CreateClientModal from "../modules/CreateClientModal";

export default function ClientList(props) {
  const createClientDis = useDisclosure();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("api/client")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClients(data.klijenti);
      });
  }, [clients]);

  return (
    <Box m={10}>
      <Button mb={8} onClick={createClientDis.onOpen}>
        Novi klijent
      </Button>
      <Heading mb={4}>Popis klijenata</Heading>
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
          {clients?.map((c, i) => {
            return (
              <Tr key={i}>
                <Td>{c.naziv}</Td>
                <Td>{c.adresa}</Td>
                <Td>
                  {c.email}, {c.mobitel}
                </Td>
                <Td>{c.oib}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {createClientDis.isOpen && (
        <CreateClientModal isOpen={createClientDis.isOpen} onClose={createClientDis.onClose} setClients={setClients} />
      )}
    </Box>
  );
}
