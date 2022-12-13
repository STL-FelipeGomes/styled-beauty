import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { createRef, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import useWarning from '../../hooks/useWarning';
import { signIn, store } from '../../services/api';

const RegisterStore = () => {
  const nameRef = createRef();
  const locationRef = createRef();
  const openHoursRef = createRef();
  const specializationRef = createRef();
  const typeServiceRef = useRef();
  const emailRef = createRef();
  const phoneRef = createRef();
  const descriptionRef = createRef();
  const imageRef = createRef();

  const navigate = useNavigate();
  const warning = useWarning();

  const registerStore = async () => {
    const image = imageRef.current.value;
    const name = nameRef.current.value;
    const location = locationRef.current.value;
    const openHours = openHoursRef.current.value;
    const description = descriptionRef.current.value;
    const specialization = specializationRef.current.value;
    const typeService = typeServiceRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    let errors = 0;

    if (!image) {
      warning('O campo imagem é obrigatório!');
      errors += 1;
    }

    if (!name) {
      warning('O campo nome é obrigatório!');
      errors += 1;
    }

    if (!location) {
      warning('O campo endereço é obrigatório!');
      errors += 1;
    }

    if (!openHours) {
      warning('O campo horário de funcionamento é obrigatório!');
      errors += 1;
    }

    if (!description) {
      warning('O campo descrição é obrigatório!');
      errors += 1;
    }

    if (!specialization) {
      warning('O campo especialização é obrigatório!');
      errors += 1;
    }

    if (!typeService) {
      warning('O campo tipo de serviço é obrigatório!');
      errors += 1;
    }

    if (!email) {
      warning('O campo e-mail é obrigatório!');
      errors += 1;
    }

    if (!phone) {
      warning('O campo número de telefone é obrigatório!');
      errors += 1;
    }

    if (errors) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const user = await signIn({ token });
      const userId = user.data.uid;
      const newStore = await store({
        logo: image,
        name,
        address: location,
        openingHours: openHours,
        description,
        specialization,
        serviceType: typeService,
        email,
        phone,
        userId,
      });

      const storeId = newStore.data.id;
      return navigate(`/lojas/${storeId}`);
    } catch (error) {}
  };

  return (
    <Layout
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      height="100%"
      gap="2rem"
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Button
          as={Link}
          to="/"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ChevronLeftIcon fontSize="1.5rem" color="greenX.700" />
        </Button>
        <Heading as="h1" size="md" color="greenX.700">
          Styled Beauty
        </Heading>
      </Flex>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        w="100%"
      >
        <Heading as="h2" size="lg" color="greenX.700">
          Crie seu negócio
        </Heading>
        <Stack spacing="10px" w="100%">
          <Input
            ref={imageRef}
            type="text"
            placeholder="Link de uma imagem do negócio"
          />
          <Input ref={nameRef} type="ext" placeholder="Nome" />
          <Input type="text" ref={locationRef} placeholder="Endereço" />
          <Input
            ref={openHoursRef}
            type="text"
            placeholder="Horário de funcionamento"
          />
          <Textarea
            ref={descriptionRef}
            placeholder="Escreve aqui uma breve descrição sobre seu negócio"
            borderRadius={4}
            background="blackX.300"
            border="1px"
            borderColor="#0F241D"
            focusBorderColor="red"
            _focus={{
              background: 'whiteX.700',
              boxShadow: 'none',
            }}
            _hover={{
              background: 'whiteX.700',
            }}
          />
          <Input
            ref={specializationRef}
            type="text"
            placeholder="Especialização"
          />
          <Flex alignItems="center" gap="5px" justifyContent="space-between">
            <Text>Tipo de serviço: </Text>
            <RadioGroup defaultValue="2">
              <Wrap as={Stack} spacing={2} direction="row">
                <WrapItem
                  as={Radio}
                  ref={typeServiceRef}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  colorScheme="green"
                  value="institute"
                >
                  Loja
                </WrapItem>
                <WrapItem
                  as={Radio}
                  ref={typeServiceRef}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  colorScheme="green"
                  value="autonomy"
                >
                  Autônomo
                </WrapItem>
              </Wrap>
            </RadioGroup>
          </Flex>
          <Input ref={emailRef} type="email" placeholder="E-mail" />
          <Input
            ref={phoneRef}
            type="number"
            placeholder="Numero de telefone/celular"
          />
          <Button
            background="greenX.700"
            borderRadius={4}
            py={6}
            width="100%"
            fontWeight="500"
            color="whiteX.600"
            _hover={{ background: 'greenX.600' }}
            transition="0.3s"
            onClick={registerStore}
          >
            Criar
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
};

export default RegisterStore;
