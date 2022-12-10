import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { createRef, useState } from 'react';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/Input/Input';
import auth from '../../database';

const RegisterUser = () => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toast = useToast();

  const nameRef = createRef();
  const dateRef = createRef();
  const emailRef = createRef();
  const emailConfirmationRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const registerUser = async (event) => {
    const { value: name } = nameRef.current;
    const { value: date } = dateRef.current;
    const { value: email } = emailRef.current;
    const { value: emailconfirmation } = emailConfirmationRef.current;
    const { value: password } = passwordRef.current;
    const { value: passwordConfirmation } = passwordConfirmationRef.current;

    console.log(email, emailconfirmation);

    if (email !== emailconfirmation) {
      console.log('entrando aqui');
      toast({
        description: 'Email de confirmação diferente!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      event.preventDefault();
      emailConfirmationRef.current.style.borderColor = '#FF843F';
      return true;
    }
    emailConfirmationRef.current.style.borderColor = '#0F241D';

    if (passwordConfirmation !== password) {
      toast({
        description: 'Senha de confirmação diferente!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      event.preventDefault();
      passwordConfirmationRef.current.style.borderColor = '#FF843F';
      return true;
    }
    return false;
  };

  return (
    <Layout
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      gap="2rem"
    >
      <Icon boxSize="6rem" as={FaUserCircle} />
      <form>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Box width="min-content">
            <Input type="text" ref={nameRef} placeholder="Nome" />
            <Input type="date" ref={dateRef} placeholder="Data de nascimento" />
            <Input type="email" ref={emailRef} placeholder="Email" />
            <Input
              type="email"
              ref={emailConfirmationRef}
              placeholder="Confirmar email"
            />
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                ref={passwordRef}
                placeholder="Senha"
              />
              <InputRightElement width="4.5rem">
                <Button variant="unstyled" onClick={() => setShow(!show)}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                type={showConfirmation ? 'text' : 'password'}
                ref={passwordConfirmationRef}
                placeholder="Confirmar senha"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant="unstyled"
                  onClick={() => setShowConfirmation(!showConfirmation)}
                >
                  {showConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button
            marginTop="1rem"
            padding="0.3rem 1rem"
            borderRadius="5px"
            border="1px solid rgba(99, 99, 99, 0.2)"
          >
            <Icon as={FcGoogle} boxSize="2.5rem" />
          </Button>
        </Box>
        <Button
          type="submit"
          marginTop="2rem"
          background="greenX.700"
          borderRadius="15px"
          paddingY="0.5rem"
          width="15.6rem"
          fontWeight="500"
          color="whiteX.600"
          _hover={{ background: 'greenX.600' }}
          transition="0.3s"
          onClick={(event) => registerUser(event)}
        >
          Cadastrar
        </Button>
      </form>
    </Layout>
  );
};

export default RegisterUser;
