import { Box, Button, Icon, Input, Link } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
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
      <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
        <Box width="min-content">
          <Input
            placeholder="Email"
            marginBottom="0.5rem"
            padding="0.5rem 2rem"
            borderRadius="1rem"
            background="blackX.400"
            border="2px solid #0F241D"
            focusBorderColor="red"
            _focus={{
              background: "whiteX.700",
            }}
            _hover={{
              background: "whiteX.700",
            }}
          />
          <Input
            placeholder="Senha"
            padding="0.5rem 2rem"
            borderRadius="1rem"
            background="blackX.400"
            border="2px solid #0F241D"
            _focus={{
              background: "whiteX.700",
            }}
            _hover={{
              background: "whiteX.700",
            }}
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
        background="greenX.700"
        borderRadius="5px"
        paddingY="0.5rem"
        width="15.6rem"
        fontWeight="500"
        color="whiteX.600"
        _hover={{ background: "greenX.600" }}
        transition="0.3s"
      >
        Entrar
      </Button>
      <Link href="/" color="blackX.500">
        Esqueci minha senha
      </Link>
    </Layout>
  );
};

export default Login;
