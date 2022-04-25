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

import dayjs from "dayjs";

export default function CreateReceiptModal({
  isOpen,
  onClose,
  edit = false,
  recipeToEdit = null,
  setRecipeToEdit = null,
}) {
  let datumRacuna = "";
  let rokPlacanja = "";
  let datumIsporuke = "";

  if (recipeToEdit?.id) {
    datumRacuna = new Date(recipeToEdit?.datumRacuna);
    rokPlacanja = new Date(recipeToEdit?.rokPlacanja);
    datumIsporuke = new Date(recipeToEdit?.datumIsporuke);
  }

  const [receipt, setReceipt] = useState({
    tipUsluge: recipeToEdit?.tipUsluge || "programiranje",
    brojRacuna: recipeToEdit?.brojRacuna || "",
    prikaziPorez: recipeToEdit?.prikaziPorez || false,
    kupac: recipeToEdit?.kupac || "",
    adresa: recipeToEdit?.adresa || "",
    OIB: recipeToEdit?.OIB || "",
    napomene: recipeToEdit?.napomene || "",
    datumRacuna: datumRacuna ? dayjs(datumRacuna).format("YYYY-MM-DD HH:mm:ss") : "",
    rokPlacanja: rokPlacanja ? dayjs(rokPlacanja).format("YYYY-MM-DD") : "",
    email: recipeToEdit?.email || "",
    internetStranica: recipeToEdit?.internetStranica || "",
    iban: recipeToEdit?.iban || "",
    datumIsporuke: datumIsporuke ? dayjs(datumIsporuke).format("YYYY-MM-DD") : "",
    napomene: recipeToEdit?.napomene || "",
  });

  const [stavkeRacuna, setStavkeRacuna] = useState([
    {
      opis: "",
      mjera: "",
      kolicina: "",
      cijena: 0,
      popust: "",
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

    if (name === "kolicina" || name === "cijena") {
      newArr[i][name] = +value;
    } else {
      newArr[i][name] = value;
    }

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

  const handleSubmit = () => {
    const datumRacuna = new Date(receipt.datumRacuna).getTime();
    const rokPlacanja = new Date(receipt.rokPlacanja).getTime();
    const datumIsporuke = new Date(receipt.datumIsporuke).getTime();

    const racun = {
      tipUsluge: receipt.tipUsluge,
      brojRacuna: receipt.brojRacuna,
      prikaziPorez: false,
      kupac: receipt.kupac,
      adresa: receipt.adresa,
      OIB: +receipt.OIB,
      napomene: receipt.napomene,
      datumRacuna,
      rokPlacanja,
      email: receipt.email,
      internetStranica: receipt.internetStranica,
      iban: receipt.iban,
      datumIsporuke,
      napomene: receipt.napomene,
    };

    const requestOptions = {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(racun),
    };

    const stavkeRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stavkeRacuna),
    };

    /*  fetch(`api/receiptItem`, stavkeRequestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStavkeRacuna(data.stavke);
      }); */

    if (edit) {
      fetch(`api/receipt?id=${recipeToEdit.id}`, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRecipeToEdit(data.azuriraniRacun);
        });
    } else {
      fetch("api/receipt", requestOptions).then(() => {
        setRecipeToEdit({});
      });
    }

    onClose();
  };

  const closeModal = () => {
    setRecipeToEdit(null);
    onClose();
  };

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={closeModal}>
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
                <Input onChange={(e) => handleChange(e)} value={receipt.OIB} name="OIB" type="number" />
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
                          type="number"
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
                <Input
                  onChange={(e) => handleChange(e)}
                  value={receipt.datumRacuna}
                  name="datumRacuna"
                  type="datetime-local"
                />
              </Box>
              <Box mr={4}>
                <FormLabel>Rok plaćanja</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={receipt.rokPlacanja} name="rokPlacanja" type="date" />
              </Box>
              <Box>
                <FormLabel>Datum isporuke</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  value={receipt.datumIsporuke}
                  name="datumIsporuke"
                  type="date"
                />
              </Box>
            </Grid>

            <Box mb={4}>
              <FormLabel>Napomene (na računu)</FormLabel>
              <Input onChange={(e) => handleChange(e)} value={receipt.napomene} name="napomene" />
            </Box>
          </ModalBody>

          <ModalFooter>
            {edit ? (
              <Button onClick={handleSubmit}>Spremi promjene</Button>
            ) : (
              <Button onClick={handleSubmit}>Spremi</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
