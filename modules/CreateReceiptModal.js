import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  Box,
  Grid,
  Select,
  Checkbox,
  Text,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";

export default function CreateReceiptModal({ isOpen, onClose, edit = false }) {
  const [receipt, setReceipt] = useState({
    tipUsluge: "programiranje",
    brojRacuna: "",
    prikaziPorez: false,
    kupac: "",
    adresa: "",
    OIB: "",
    napomene: "",
    datumRacuna: "",
    rokPlacanja: "",
    email: "",
    internetStranica: "",
    iban: "",
    datumIsporuke: "",
  });

  const [stavkeRacuna, setStavkeRacuna] = useState([
    {
      opis: "opis",
      mjera: "mjera",
      kolicina: "količina",
      cijena: 0,
      popust: "popust",
    },
  ]);

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    setReceipt((receipt) => ({
      ...receipt,
      [name]: value,
    }));
  };

  const handleStavkeRacunaChange = (e, i) => {
    const { name, value } = e.target;

    let newArr = [...stavkeRacuna];
    newArr[i][name] = value;

    setStavkeRacuna(newArr);
  };

  const handleAddStavkaRacuna = () => {
    setStavkeRacuna([
      ...stavkeRacuna,
      {
        opis: "",
        mjera: "",
        kolicina: "",
        cijena: 0,
        popust: "",
      },
    ]);
  };

  const ukupnaCijena = stavkeRacuna.reduce((accumulator, object) => {
    return accumulator + object.cijena;
  }, 0);

  const handleRemoveStavkaRacuna = (i) => {
    setStavkeRacuna(stavkeRacuna.filter((el, index) => index !== i));
  };

  const handleSubmit = () => {};

  const handleDeleteReceipt = () => {};

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{edit ? "Uređivanje računa" : "Kreiraj račun"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid alignItems="center" mb={4} templateColumns="1fr 1fr 1fr">
              <Box mr={4}>
                <FormLabel>Tip usluge</FormLabel>
                <Select onChange={(e) => handleChange(e)} value={receipt.tipUsluge} name="tipUsluge">
                  <option value="programiranje">Programiranje</option>
                  <option value="ostalo">Ostalo</option>
                  <option value="josNesto">josNesto</option>
                </Select>
              </Box>
              <Box mr={4}>
                <FormLabel>Broj računa</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.brojRacuna} name="brojRacuna" />
              </Box>
              <Box>
                <Checkbox mt={6} value={receipt.prikaziPorez}>
                  Prikaži porez?
                </Checkbox>
              </Box>
            </Grid>
            <Grid mb={4} templateColumns="2fr 3fr 1fr">
              <Box mr={4}>
                <FormLabel>Kupac</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.kupac} name="kupac" />
              </Box>
              <Box mr={4}>
                <FormLabel>Adresa</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.adresa} name="adresa" />
              </Box>
              <Box>
                <FormLabel>OIB</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.OIB} name="OIB" />
              </Box>
            </Grid>

            <Box mb={12}>
              <FormLabel>Stavke računa</FormLabel>
              {stavkeRacuna.map((el, i) => {
                return (
                  <Box mb={8} p={4} key={i}>
                    <Box textAlign="right">
                      <IconButton
                        isRound={true}
                        icon={<CloseIcon />}
                        colorScheme="red"
                        onClick={() => handleRemoveStavkaRacuna(i)}
                        size="xs"
                      />
                    </Box>

                    <Box mb={4}>
                      <FormLabel>Opis usluge/proizvoda</FormLabel>
                      <Input
                        onChange={(e) => handleStavkeRacunaChange(e, i)}
                        value={stavkeRacuna[i].opis}
                        name="opis"
                      />
                    </Box>
                    <Grid mb={4} templateColumns="1fr 1fr 1fr 1fr">
                      <Box mr={4}>
                        <FormLabel>Jed. mjera</FormLabel>
                        <Select
                          onChange={(e) => handleStavkeRacunaChange(e, i)}
                          value={stavkeRacuna[i].mjera}
                          name="mjera"
                        >
                          <option value="god">god</option>
                          <option value="ostalo">Ostalo</option>
                          <option value="josNesto">josNesto</option>
                        </Select>
                      </Box>
                      <Box mr={4}>
                        <FormLabel>Količina</FormLabel>
                        <Input
                          onChange={(e) => handleStavkeRacunaChange(e, i)}
                          value={stavkeRacuna[i].kolicina}
                          name="kolicina"
                        />
                      </Box>
                      <Box mr={4}>
                        <FormLabel>Cijena</FormLabel>
                        <Input
                          onChange={(e) => handleStavkeRacunaChange(e, i)}
                          value={stavkeRacuna[i].cijena}
                          name="cijena"
                          type="number"
                        />
                      </Box>
                      <Box>
                        <FormLabel>Popust</FormLabel>
                        <Input
                          onChange={(e) => handleStavkeRacunaChange(e, i)}
                          value={stavkeRacuna[i].popust}
                          name="popust"
                        />
                      </Box>
                    </Grid>
                  </Box>
                );
              })}

              <Flex justifyContent="space-between">
                <IconButton mr={2} icon={<AddIcon />} colorScheme="blue" onClick={() => handleAddStavkaRacuna()} />
                <Box>
                  <Text fontWeight={900} fontSize="30px" display="inline" mr={2}>
                    {ukupnaCijena}
                  </Text>
                  <Text display="inline" fontSize="20px">
                    HRK
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Grid mb={4} templateColumns="1fr 1fr 1fr">
              <Box mr={4}>
                <FormLabel>Datum računa</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.datumRacuna} name="datumRacuna" />
              </Box>
              <Box mr={4}>
                <FormLabel>Rok plaćanja</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.rokPlacanja} name="rokPlacanja" />
              </Box>
              <Box>
                <FormLabel>Datum isporuke</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.datumIsporuke} name="datumIsporuke" />
              </Box>
            </Grid>

            <Box mb={4}>
              <FormLabel>Napomene (na računu)</FormLabel>
              <Input onChange={(e) => handleChange(e)} value={receipt.napomene} name="napomene" />
            </Box>
          </ModalBody>

          <ModalFooter>
            {edit ? (
              <Flex justifyContent="space-between">
                <Button onClick={handleSubmit}>Spremi promjene</Button>
                <Button colorScheme="red" onClick={handleDeleteReceipt}>
                  Izbriši ovaj račun
                </Button>
              </Flex>
            ) : (
              <Button>Spremi</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
