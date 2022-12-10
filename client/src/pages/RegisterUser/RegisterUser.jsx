import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { createRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/Input/Input';

const RegisterUser = () => {
  const [show, setShow] = useState(false);

  const nameRef = createRef();
  const dateRef = createRef();
  const emailRef = createRef();
  const emailConfirmationRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const registerUser = () => {
    const { value: name } = nameRef.current;
    const { value: date } = dateRef.current;
    const { value: email } = emailRef.current;
    const { value: emailconfirmation } = emailConfirmationRef.current;
    const { value: password } = passwordRef.current;
    const { value: passwordConfirmation } = passwordConfirmationRef.current;

    if (
      name &&
      date &&
      email &&
      emailconfirmation &&
      password &&
      passwordConfirmation
    ) {
      console.log('permitiu');
    }
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
                <Button onClick={() => setShow(!show)} h="2.625rem">
                  {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              type="text"
              ref={passwordConfirmationRef}
              placeholder="Confirmar senha"
            />
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
          onClick={registerUser}
        >
          Cadastrar
        </Button>
      </form>
    </Layout>
  );
};

export default RegisterUser;
