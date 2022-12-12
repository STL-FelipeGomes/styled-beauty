import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { createRef, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
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
  const toast = useToast();

  const { body } = document;
  body.style.overflowY = 'hidden';

  const registerStore = async () => {
    const { value: name } = nameRef.current;
    const { value: location } = locationRef.current;
    const { value: specialization } = specializationRef.current;
    const { value: openHours } = openHoursRef.current;
    const { value: typeService } = typeServiceRef.current;
    const { value: email } = emailRef.current;
    const { value: phone } = phoneRef.current;
    const { value: description } = descriptionRef.current;
    const { value: image } = imageRef.current;

    if (
      !name ||
      !location ||
      !specialization ||
      !openHours ||
      !typeService ||
      !email ||
      !phone ||
      !description ||
      !image
    ) {
      return toast({
        description: 'Todos os campos são obrigatórios',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
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
        specialization,
        serviceType: typeService,
        email,
        phone,
        description,
        userId,
      });

      const storeId = newStore.data.id;
      navigate(`/loja/${storeId}`);
    } catch (error) {
      console.log(error);
    }

    return true;
  };

  return (
    <Box>
      <Box padding="1rem 0 0 1rem">
        <Button as={Link} to="/home" variant="unstyled">
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
                <Input ref={imageRef} type="text" placeholder="URL da imagem" />
              </Stack>
            </Box>
          </Box>
          <Button
            marginTop="2rem"
            display="block"
            marginX="auto"
            background="greenX.700"
            borderRadius="15px"
            paddingY="0.5rem"
            width="100%"
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