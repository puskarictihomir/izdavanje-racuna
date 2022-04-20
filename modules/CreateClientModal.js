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
} from "@chakra-ui/react";

import { useState } from "react";

export default function CreateClientModal({ isOpen, onClose }) {
  const [client, setClient] = useState({
    naziv: "",
    tipDjelatnosti: "bez oznake",
    oib: "",
    adresa: "",
    grad: "",
    postBroj: "",
    drzava: "",
    telefon: "",
    fax: "",
    mobitel: "",
    email: "",
    internetStranica: "",
    iban: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((client) => ({
      ...client,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Klijent</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid mb={4} templateColumns="3fr 1fr 2fr">
              <Box mr={4}>
                <FormLabel>Naziv</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.naziv} name="naziv" />
              </Box>
              <Box mr={4}>
                <FormLabel>Tip djelatnosti</FormLabel>
                <Select onChange={(e) => handleChange(e)} value={client.tipDjelatnosti} name="tipDjelatnosti">
                  <option value="d.o.o.">d.o.o.</option>
                  <option value="obrt">obrt</option>
                  <option value="j.d.o.o.">j.d.o.o.</option>
                  <option value="fiz. osoba">fiz. osoba</option>
                  <option value="bez oznake">bez oznake</option>
                  <option value="udruga">udruga</option>
                  <option value="OPG">OPG</option>
                </Select>
              </Box>
              <Box>
                <FormLabel>OIB</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.oib} name="oib" />
              </Box>
            </Grid>
            <Grid mb={4} templateColumns="3fr 2fr 1fr">
              <Box mr={4}>
                <FormLabel>Adresa</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.adresa} name="adresa" />
              </Box>
              <Box mr={4}>
                <FormLabel>Grad</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.grad} name="grad" />
              </Box>
              <Box>
                <FormLabel>Pošt. broj</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.postBroj} name="postBroj" />
              </Box>
            </Grid>
            <Box mb={12} maxW="410px">
              <FormLabel>Država</FormLabel>
              <Input onChange={(e) => handleChange(e)} value={client.drzava} name="drzava" />
            </Box>

            <Grid mb={4} templateColumns="1fr 1fr 1fr">
              <Box mr={4}>
                <FormLabel>Telefon</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.telefon} name="telefon" />
              </Box>
              <Box mr={4}>
                <FormLabel>Fax</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.fax} name="fax" />
              </Box>
              <Box>
                <FormLabel>Mobitel</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.mobitel} name="mobitel" />
              </Box>
            </Grid>
            <Grid mb={4} templateColumns="1fr 1fr 1fr">
              <Box mr={4}>
                <FormLabel>E-mail adresa</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.email} name="email" />
              </Box>
              <Box mr={4}>
                <FormLabel>Internet stranica</FormLabel>
                <Input
                  onChange={(e) => handleChange(e)}
                  value={client.internetStranica}
                  placeholder="www"
                  name="internetStranica"
                />
              </Box>
              <Box>
                <FormLabel>IBAN</FormLabel>
                <Input onChange={(e) => handleChange(e)} value={client.iban} placeholder="HR" name="iban" />
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter justifyContent="left">
            <Button onClick={handleSubmit}>Unesi</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
