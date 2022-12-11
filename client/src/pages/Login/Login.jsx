import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react';
import { createRef, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/Input/Input';

const Login = () => {
  const [show, setShow] = useState(false);
  const emailRef = createRef();
  const passwordRef = createRef();

  const loginUser = () => {
    const { value: email } = emailRef.current;
    const { value: password } = passwordRef.current;

    if (email && password) {
      console.log('loginUser');
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
          onClick={loginUser}
        >
          Entrar
        </Button>
      </form>
      <Link href="/cadastrar-se" color="blackX.500">
        Cadastrar-se
      </Link>
      <Link href="/" color="blackX.500">
        Esqueci minha senha
      </Link>
    </Layout>
  );
};

export default Login;
