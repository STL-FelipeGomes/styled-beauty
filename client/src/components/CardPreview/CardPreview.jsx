import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';

import { AiFillHeart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { HiUser } from 'react-icons/hi';

const CardPreview = ({
  image,
  nameInstitution,
  evaluation,
  nameOwner,
  description,
  favorite,
  id,
}) => {
  return (
    <Card marginTop="1rem" borderRadius="5px">
      <CardBody
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Flex as="a" href={`/loja/${id}`} alignItems="center" maxWidth="100%">
          <Avatar src={image} boxSize="3.5rem" name={nameInstitution} />
          <Box marginLeft="0.5rem" width="13rem" fontSize="0.8rem">
            <Flex as="p" fontSize="1rem" fontWeight="500">
              {nameInstitution}
            </Flex>
            <Flex as="p" alignItems="center">
              <Icon as={AiFillStar} marginRight="5px" />
              {evaluation}
            </Flex>
            <Flex as="p" alignItems="center">
              <Icon as={HiUser} marginRight="5px" />
              {nameOwner}
            </Flex>
            <Text noOfLines={1}>
              {`${description}asdasdaasdas12312sdasdasdasdasdasdasdasdasdasd`}
            </Text>
          </Box>
        </Flex>
        <Button
          variant="unstyled"
          height="auto"
          padding="0"
          minWidth="0"
          borderRadius="0"
        >
          <Icon
            boxSize="1.5rem"
            color={favorite ? 'greenX.700' : 'blackX.500'}
            as={favorite ? AiFillHeart : AiOutlineHeart}
            variant="unstyled"
          />
        </Button>
      </CardBody>
    </Card>
  );
};

export default CardPreview;
