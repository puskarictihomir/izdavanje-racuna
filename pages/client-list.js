import { useState, useEffect } from "react";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import CreateClientModal from "../modules/CreateClientModal";

import DeleteModal from "../components/DeleteModal";

export default function ClientList(props) {
  const createClientDis = useDisclosure();
  const deleteClientDis = useDisclosure();

  const [clients, setClients] = useState([]);

  const [clientId, setClientId] = useState(null);

  const handleDeleteClick = (id) => {
    setClientId(id);
    deleteClientDis.onOpen();
  };

  const handleDeleteClient = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`api/client?id=${clientId}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientId(null);
      });
  };

  useEffect(() => {
    fetch("api/client")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClients(data.klijenti);
      });
  }, [clients, clientId]);

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
            <Th>Opcije</Th>
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
                <Td>
                  <IconButton mr={2} icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteClick(c.id)} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {createClientDis.isOpen && (
        <CreateClientModal isOpen={createClientDis.isOpen} onClose={createClientDis.onClose} setClients={setClients} />
      )}

      {deleteClientDis.isOpen && (
        <DeleteModal
          isOpen={deleteClientDis.isOpen}
          onClose={deleteClientDis.onClose}
          handleRemove={handleDeleteClient}
        />
      )}
    </Box>
  );
}
