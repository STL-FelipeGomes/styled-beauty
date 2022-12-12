import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Layout from '../../components/Layout/Layout';
import auth, { provider } from '../../database';
import { signIn, signUp } from '../../services/api';

const Login = () => {
  const [show, setShow] = useState(false);

  const emailRef = createRef();
  const passwordRef = createRef();

  const toast = useToast();
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    const { value: email } = emailRef.current;
    const { value: password } = passwordRef.current;

    if (!email || !password) {
      toast({
        description: 'Todos os campos são obrigatórios!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await signIn({ token: user.accessToken });

      localStorage.setItem('token', user.accessToken);

      navigate('/home');
    } catch (error) {
      toast({
        description: 'Email ou senha incorretos!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        background: 'red',
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      const { uid, displayName, accessToken } = user;

      await signUp({
        id: uid,
        fullName: displayName,
        birthDate: '0000-00-00',
      });

      localStorage.setItem('token', accessToken);

      return navigate('/home');
    } catch (error) {
      return console.log(error);
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
      <Box as="form">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Stack width="min-content" spacing="0.5rem">
            <Input ref={emailRef} type="email" placeholder="Email" />
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
          </Stack>
          <Button
            marginTop="1rem"
            padding="0.3rem 1rem"
            borderRadius="5px"
            border="1px solid rgba(99, 99, 99, 0.2)"
            onClick={signInWithGoogle}
          >
            <Icon as={FcGoogle} boxSize="2.5rem" />
          </Button>
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
          onClick={(event) => loginUser(event)}
        >
          Entrar
        </Button>
      </Box>
      <ChakraLink as={Link} to="/cadastrar-se" color="blackX.500">
        Cadastrar-se
      </ChakraLink>
      <ChakraLink as={Link} to="/" color="blackX.500">
        Esqueci minha senha
      </ChakraLink>
    </Layout>
  );
};

export default Login;
