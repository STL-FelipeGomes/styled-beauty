import { ChevronLeftIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
} from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import { HiLocationMarker, HiUser } from 'react-icons/hi';
import { MdDescription } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import { show } from '../../services/api';

const Store = () => {
  const [favorite, setFavorite] = useState(false);
  const [store, setStore] = useState([]);
  const [ownerName, setOwnerName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await show({ id });

      const ownerFullName = data.owners[0].fullName;
      const fullNameParts = ownerFullName.split(' ');
      setOwnerName(`${fullNameParts[0] ?? ''} ${fullNameParts[1] ?? ''}`);

      setStore(data);
    })();
  }, []);

  const handleRating = (rating) => {
    const ratings = [];
    for (let i = 1; i <= 5; i += 1) {
      ratings.push(
        <Icon
          key={i}
          as={i <= rating ? AiFillStar : AiOutlineStar}
          color={i <= rating ? 'greenX.700' : 'black.500'}
        />
      );
    }
    return ratings;
  };

  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Button as={Link} to="/home" variant="unstyled">
          <ChevronLeftIcon fontSize="1.5rem" color="greenX.700" />
        </Button>
        <Button
          variant="unstyled"
          display="flex"
          alignItems="center"
          onClick={() => setFavorite(!favorite)}
        >
          <Icon
            as={favorite ? AiFillHeart : AiOutlineHeart}
            boxSize="1.2rem"
            color={favorite ? 'green.700' : 'blackX.500'}
          />
        </Button>
      </Flex>
      <Box marginTop="1rem">
        <Text
          display="flex"
          alignItems="center"
          marginBottom="1rem"
          fontSize="1.2rem"
          fontWeight="500"
        >
          <Icon as={FaStoreAlt} color="greenX.700" marginRight="5px" />
          {store.name}
        </Text>
        <Image
          border="2px solid"
          borderRadius="5px"
          borderColor="blackX.500"
          src={
            store.logo ||
            'https://static.ricmais.com.br/uploads/2020/08/meme-cabeleireira-leila-1029x600.jpg'
          }
          maxWidth="250px"
          margin="0 auto"
        />

        <Flex marginTop="1rem" justifyContent="flex-start" gap="2px">
          {handleRating(store.rating)}
        </Flex>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={HiUser} marginRight="5px" color="greenX.700" />
          {ownerName}
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={HiLocationMarker} marginRight="5px" color="greenX.700" />
          {store.address}
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={MdDescription} marginRight="5px" color="greenX.700" />
          {store.description}
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <EmailIcon marginRight="5px" color="greenX.700" />
          {store.email}
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <PhoneIcon marginRight="5px" color="greenX.700" />
          {store.phone}
        </Text>
      </Box>
    </Layout>
  );
};

export default Store;
