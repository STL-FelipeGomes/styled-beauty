import { PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import CardPreview from '../../components/CardPreview/CardPreview';
import Input from '../../components/Input/Input';
import Layout from '../../components/Layout/Layout';
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
      <Flex alignItems="center" marginBottom="1rem">
        <Button
          variant="unstyled"
          onClick={() => (window.location.href = '/cadastrar-loja')}
        >
          <PlusSquareIcon fontSize="1.5rem" color="greenX.700" />
        </Button>
        <InputGroup>
          <Input type="text" placeholder="Estabelecimento ou serviço" />
          <InputRightElement>
            <Search2Icon
              fontWeight="500"
              marginRight="1.5rem"
              color="greenX.700"
            />
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
      <Flex
        marginTop="0.5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="unstyled"
          height="auto"
          fontSize="0.9rem"
          padding="0.2rem 0.5rem"
          borderRadius="full"
          border="1px solid"
          borderColor="blackX.400"
          display="flex"
          alignItems="center"
          color="blackX.500"
          onClick={() => setOrder(!order)}
        >
          <Text>Ordenar</Text>
          <Icon
            as={order ? RiArrowDropDownLine : RiArrowDropUpLine}
            boxSize="1.2rem"
          />
        </Button>
        <Button
          variant="unstyled"
          height="auto"
          fontSize="0.9rem"
          padding="0.2rem 0.5rem"
          borderRadius="full"
          border="1px solid"
          borderColor="blackX.400"
          display="flex"
          alignItems="center"
          color="blackX.500"
          onClick={() => setDistance(!distance)}
        >
          <Text>Distância</Text>
          <Icon
            as={distance ? RiArrowDropDownLine : RiArrowDropUpLine}
            boxSize="1.2rem"
          />
        </Button>
        <Button
          variant="unstyled"
          height="auto"
          fontSize="0.9rem"
          padding="0.2rem 0.5rem"
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
            boxSize="1.2rem"
            color={favorite ? 'green.700' : 'blackX.500'}
          />
        </Button>
      </Flex>
      <Box>
        {stores.map((store) => (
          <CardPreview
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
