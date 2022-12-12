import { PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Layout from '../../components/Layout';
import PreviewCard from '../../components/PreviewCard';
import { index } from '../../services/api';

const Home = () => {
  const [select, setSelect] = useState(true);
  const [order, setOrder] = useState(true);
  const [distance, setDistance] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await index();
      setStores(data);
    })();
  }, []);

  return (
    <Layout>
      <Flex alignItems="center" mb={4} gap={2} w="100%">
        <ChakraLink
          as={Link}
          to="/lojas/cadastrar"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="greenX.700"
          _hover={{ color: 'greenX.600' }}
        >
          <PlusSquareIcon fontSize="1.5rem" />
        </ChakraLink>
        <InputGroup>
          <Input
            type="text"
            placeholder="Estabelecimento ou serviço"
            width="100%"
          />
          <InputRightElement h={50} pr={4}>
            <Search2Icon fontWeight="500" color="greenX.700" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        borderBottom="1px solid"
        borderColor="blackX.400"
        justifyContent="space-between"
      >
        <Button
          variant="unstyled"
          width="48%"
          borderRadius="0"
          borderBottom={select && '2px solid'}
          borderColor={select && 'greenX.700'}
          color={select ? 'greenX.700' : 'blackX.500'}
          fontWeight="600"
          onClick={() => setSelect(!select)}
        >
          Estabelecimentos
        </Button>
        <Button
          variant="unstyled"
          width="48%"
          borderRadius="0"
          borderBottom={!select && '2px solid'}
          borderColor={!select && 'greenX.700'}
          color={!select ? 'greenX.700' : 'blackX.500'}
          fontWeight="600"
          onClick={() => setSelect(!select)}
        >
          Serviços
        </Button>
      </Flex>
      <Flex marginTop="0.5rem" alignItems="center" gap={2}>
        <Button
          variant="unstyled"
          fontSize="0.9rem"
          p={2}
          borderRadius="full"
          border="1px solid"
          borderColor="blackX.400"
          display="flex"
          alignItems="center"
          color="blackX.500"
          onClick={() => setOrder(!order)}
        >
          <Text>Ordenar</Text>
          <Icon as={order ? SlArrowDown : SlArrowUp} boxSize="1rem" ml={1} />
        </Button>
        <Button
          variant="unstyled"
          fontSize="0.9rem"
          p={2}
          borderRadius="full"
          border="1px solid"
          borderColor="blackX.400"
          display="flex"
          alignItems="center"
          color="blackX.500"
          onClick={() => setDistance(!distance)}
        >
          <Text>Distância</Text>
          <Icon as={distance ? SlArrowDown : SlArrowUp} boxSize="1rem" ml={1} />
        </Button>
        <Button
          variant="unstyled"
          fontSize="0.9rem"
          p={2}
          borderRadius="full"
          border="1px solid"
          borderColor="blackX.400"
          display="flex"
          alignItems="center"
          color="blackX.500"
          onClick={() => setFavorite(!favorite)}
        >
          <Text>Favoritos</Text>
          <Icon
            as={favorite ? AiFillHeart : AiOutlineHeart}
            boxSize="1rem"
            color={favorite ? 'green.700' : 'blackX.500'}
            ml={1}
          />
        </Button>
      </Flex>
      <Box>
        {stores.map((store) => (
          <PreviewCard
            key={store.id}
            id={store.id}
            image={store.logo}
            nameInstitution={store.name}
            evaluation={store.rating}
            nameOwner="store"
            description={store.description}
            favorite={false}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default Home;
