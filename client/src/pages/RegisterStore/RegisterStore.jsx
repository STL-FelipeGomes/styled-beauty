import {
  Box,
  Button,
  Icon,
  Text,
  Radio,
  RadioGroup,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { createRef, useRef } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/Input/Input';

const RegisterStore = () => {
  const nameRef = createRef();
  const locationRef = createRef();
  const openHoursRef = createRef();
  const specializationRef = createRef();
  const typeServiceRef = useRef();
  const emailRef = createRef();
  const phoneRef = createRef();
  const descriptionRef = createRef();

  const { body } = document;
  body.style.overflowY = 'hidden';

  const registerStore = () => {
    const { value: name } = nameRef.current;
    const { value: location } = locationRef.current;
    const { value: specialization } = specializationRef.current;
    const { value: openHours } = openHoursRef.current;
    const { value: typeService } = typeServiceRef.current;
    const { value: email } = emailRef.current;
    const { value: phone } = phoneRef.current;
    const { value: description } = descriptionRef.current;

    console.log(
      name,
      location,
      specialization,
      openHours,
      typeService,
      email,
      phone,
      description
    );
  };

  return (
    <Box>
      <Box padding="1rem 0 0 1rem">
        <Button
          variant="unstyled"
          onClick={() => (window.location.href = '/home')}
        >
          <ChevronLeftIcon fontSize="1.5rem" color="greenX.700" />
        </Button>
      </Box>
      <Layout
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        height="100vh"
        gap="2rem"
      >
        <Icon boxSize="6rem" as={FaUserCircle} />
        <Box as="form">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1rem"
          >
            <Box width="min-content">
              <Stack spacing="10px">
                <Input
                  ref={nameRef}
                  type="ext"
                  placeholder="Nome do estabelecimento"
                />
                <Input type="text" ref={locationRef} placeholder="Endereço" />
                <Input
                  ref={openHoursRef}
                  type="text"
                  placeholder="Horário de funcionamento"
                />
                <Input
                  ref={specializationRef}
                  type="text"
                  placeholder="Especialização"
                />
                <Flex
                  alignItems="center"
                  gap="5px"
                  justifyContent="space-between"
                >
                  <Text fontSize="0.9rem">Tipo de serv.: </Text>
                  <RadioGroup defaultValue="2">
                    <Stack spacing={1} direction="row">
                      <Radio
                        ref={typeServiceRef}
                        colorScheme="green"
                        value="institute"
                      >
                        Estabel.
                      </Radio>
                      <Radio
                        ref={typeServiceRef}
                        colorScheme="green"
                        value="autonomy"
                      >
                        Autôn.
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <Input ref={emailRef} type="email" placeholder="Email" />
                <Input
                  ref={phoneRef}
                  type="number"
                  placeholder="Numero de telefone/celular"
                />
                <Input
                  ref={descriptionRef}
                  type="text"
                  placeholder="Descrição do serviço"
                />
              </Stack>
            </Box>
          </Box>
          <Button
            type="submit"
            marginTop="2rem"
            display="block"
            marginX="auto"
            background="greenX.700"
            borderRadius="15px"
            paddingY="0.5rem"
            width="15.6rem"
            fontWeight="500"
            color="whiteX.600"
            _hover={{ background: 'greenX.600' }}
            transition="0.3s"
            onClick={registerStore}
          >
            Entrar
          </Button>
        </Box>
      </Layout>
    </Box>
  );
};

export default RegisterStore;
