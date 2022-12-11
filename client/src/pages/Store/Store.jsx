import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { MdDescription } from 'react-icons/md';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { HiUser, HiLocationMarker } from 'react-icons/hi';
import { FaStoreAlt } from 'react-icons/fa';
import Layout from '../../components/Layout/Layout';

const Store = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Button
          variant="unstyled"
          onClick={() => (window.location.href = '/home')}
        >
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
          Cabeleireira Leila
        </Text>
        <Image
          SlideDirection="left"
          border="2px solid"
          borderRadius="5px"
          borderColor="blackX.500"
          src="https://static.ricmais.com.br/uploads/2020/08/meme-cabeleireira-leila-1029x600.jpg"
          maxWidth="250px"
          margin="0 auto"
        />

        <Flex marginTop="1rem" justifyContent="flex-start" gap="2px">
          <Icon as={AiFillStar} color="greenX.700" />
          <Icon as={AiFillStar} color="greenX.700" />
          <Icon as={AiFillStar} color="greenX.700" />
          <Icon as={AiFillStar} color="greenX.700" />
          <Icon as={AiOutlineStar} color="black.500" />
        </Flex>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={HiUser} marginRight="5px" color="greenX.700" />
          Leila
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={HiLocationMarker} marginRight="5px" color="greenX.700" />
          Na rua
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <Icon as={MdDescription} marginRight="5px" color="greenX.700" />
          Na rua
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <EmailIcon marginRight="5px" color="greenX.700" />
          cabeleireiraleila@gmail.com
        </Text>
        <Text marginTop="0.5rem" display="flex" alignItems="center">
          <PhoneIcon marginRight="5px" color="greenX.700" />
          4002-8922
        </Text>
      </Box>
    </Layout>
  );
};

export default Store;
