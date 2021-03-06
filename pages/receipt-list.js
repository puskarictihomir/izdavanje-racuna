import { useState, useEffect } from "react";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import CreateReceiptModal from "../modules/CreateReceiptModal";

import DeleteModal from "../components/DeleteModal";

import dayjs from "dayjs";

export default function ClientList(props) {
  const createReceiptDis = useDisclosure();
  const editReceiptDis = useDisclosure();
  const deleteReceiptDis = useDisclosure();

  const [receipts, setReceipts] = useState(null);

  const [recipeToEdit, setRecipeToEdit] = useState(null);

  const handleEditReceipt = (id) => {
    fetch(`api/receipt?id=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecipeToEdit(data.racun);
      });

    editReceiptDis.onOpen();
  };

  const handleDeleteClick = (id) => {
    setRecipeToEdit(id);
    deleteReceiptDis.onOpen();
  };

  const handleDeleteReceipt = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`api/receipt?id=${recipeToEdit}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecipeToEdit({});
      });
  };

  useEffect(() => {
    fetch("api/receipt")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReceipts(data.racuni);
      });
  }, [recipeToEdit]);

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
            const datumRacuna = new Date(r.datumRacuna);
            const rokPlacanja = new Date(r.rokPlacanja);

            return (
              <Tr key={i}>
                <Td>{r.brojRacuna}</Td>
                <Td>{r.kupac}</Td>
                <Td>IZNOS</Td>
                <Td>{dayjs(datumRacuna).format("DD/MM/YYYY HH:mm")}</Td>
                <Td>{dayjs(rokPlacanja).format("DD/MM/YYYY")}</Td>
                <Td>
                  <IconButton mr={2} icon={<EditIcon />} colorScheme="blue" onClick={() => handleEditReceipt(r.id)} />
                  <IconButton mr={2} icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteClick(r.id)} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {createReceiptDis.isOpen && (
        <CreateReceiptModal
          isOpen={createReceiptDis.isOpen}
          onClose={createReceiptDis.onClose}
          setRecipeToEdit={setRecipeToEdit}
        />
      )}

      {editReceiptDis.isOpen && !!recipeToEdit?.id && (
        <CreateReceiptModal
          isOpen={editReceiptDis.isOpen}
          onClose={editReceiptDis.onClose}
          recipeToEdit={recipeToEdit}
          edit={true}
          setRecipeToEdit={setRecipeToEdit}
        />
      )}

      {deleteReceiptDis.isOpen && (
        <DeleteModal
          isOpen={deleteReceiptDis.isOpen}
          onClose={deleteReceiptDis.onClose}
          handleRemove={handleDeleteReceipt}
        />
      )}
    </Box>
  );
}
