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
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import auth, { provider } from '../../database';
import { authenticateWithGoogle, signUp } from '../../services/api';

import Input from '../../components/Input';
import Layout from '../../components/Layout';
import useWarning from '../../hooks/useWarning';

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const nameRef = createRef();
  const dateRef = createRef();
  const emailRef = createRef();
  const emailConfirmationRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const navigate = useNavigate();
  const warning = useWarning();

  const registerUser = async () => {
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    const email = emailRef.current.value;
    const emailConfirmation = emailConfirmationRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    let errors = 0;

    if (!name) {
      warning('O campo nome é obrigatório!');
      errors += 1;
    }

    if (!date) {
      warning('O campo data de nascimento é obrigatório!');
      errors += 1;
    }

    if (!email) {
      warning('O campo e-mail é obrigatório!');
      errors += 1;
    } else if (!emailConfirmation) {
      warning('O campo confirmação de e-mail é obrigatório!');
      errors += 1;
    }

    if (!password) {
      warning('O campo senha é obrigatório!');
      errors += 1;
    } else if (password.length < 6) {
      warning('As senhas precisam ter no mínimo 6 (seis) caracteres!');
      errors += 1;
    } else if (!passwordConfirmation) {
      warning('O campo confirmação de senha é obrigatório!');
      errors += 1;
    }

    if (email && emailConfirmation && email !== emailConfirmation) {
      warning('Os endereços de e-mail não são iguais!');
      errors += 1;
    }

    if (password && passwordConfirmation && passwordConfirmation !== password) {
      warning('As senhas não são iguais!');
      errors += 1;
    }

    if (errors) {
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await signUp({
        id: user.uid,
        fullName: name,
        birthDate: date,
      });

      return navigate('/');
    } catch ({ code }) {
      if (code === 'auth/invalid-email') {
        return warning('Endereço de e-mail inválido!');
      }
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
            Faça seu cadastro
          </Heading>

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
          <InputGroup>
            <Input
              type={showPasswordConfirmation ? 'text' : 'password'}
              ref={passwordConfirmationRef}
              placeholder="Confirmar senha"
            />
            <InputRightElement h={50} pr={4}>
              <Button
                variant="unstyled"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              >
                {showPasswordConfirmation ? <ViewIcon /> : <ViewOffIcon />}
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
            onClick={registerUser}
          >
            Cadastrar
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
          Já possui uma conta?
          <ChakraLink as={Link} to="/entrar" color="greenX.700">
            &nbsp;Clique aqui
          </ChakraLink>
        </Text>
      </Box>
    </Layout>
  );
};

export default RegisterUser;
