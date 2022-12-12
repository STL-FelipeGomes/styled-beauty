import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import Layout from '../../components/Layout';
import auth, { provider } from '../../database';
import useWarning from '../../hooks/useWarning';
import { authenticateWithGoogle, signIn } from '../../services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = createRef();
  const passwordRef = createRef();

  const navigate = useNavigate();
  const warning = useWarning();

  const loginUser = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let errors = 0;

    if (!email) {
      warning('O campo e-mail é obrigatório!');
      errors += 1;
    }

    if (!password) {
      warning('O campo senha é obrigatório!');
      errors += 1;
    }

    if (errors) {
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await signIn({ token: user.accessToken });
      localStorage.setItem('token', user.accessToken);

      return navigate('/');
    } catch ({ code }) {
      if (code === 'auth/invalid-email') {
        return warning('Endereço de e-mail inválido!');
      }

      return warning('Informações inválidas!');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      const { uid, email, displayName, accessToken } = user;

      await authenticateWithGoogle({
        id: uid,
        email,
        fullName: displayName,
      });

      localStorage.setItem('token', accessToken);

      return navigate('/');
    } catch (error) {}
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        w="100%"
      >
        <Heading as="h1" size="2xl" mb={8} color="greenX.600">
          Styled Beauty
        </Heading>
        <Stack w="100%" spacing="1rem">
          <Heading as="h2" size="md" textAlign="center" mb={2}>
            Faça seu login
          </Heading>

          <Input ref={emailRef} type="email" placeholder="E-mail" />
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              ref={passwordRef}
              placeholder="Senha"
            />
            <InputRightElement h={50} pr={4}>
              <Button
                variant="unstyled"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            background="greenX.700"
            borderRadius={4}
            py={6}
            width="100%"
            fontWeight="500"
            color="whiteX.600"
            _hover={{ background: 'greenX.600' }}
            transition="0.3s"
            onClick={loginUser}
          >
            Entrar
          </Button>
        </Stack>

        <Button
          my={4}
          w="100%"
          py={6}
          borderRadius={4}
          border="1px solid rgba(99, 99, 99, 0.2)"
          onClick={signInWithGoogle}
        >
          <Icon as={FcGoogle} boxSize="1.5rem" />
          &nbsp;Entrar com o Google
        </Button>

        <Text textAlign="center">
          Não possui uma conta ainda?&nbsp;
          <ChakraLink as={Link} to="/cadastrar" color="greenX.700">
            Clique aqui
          </ChakraLink>
        </Text>
      </Box>
    </Layout>
  );
};

export default Login;
