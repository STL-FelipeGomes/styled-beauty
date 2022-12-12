import { useToast } from '@chakra-ui/react';

export default () => {
  const toast = useToast();

  return (description) => {
    toast({
      description,
      status: 'warning',
      duration: 2000, // 2 seconds
      isClosable: true,
      position: 'top',
      background: 'red',
    });
  };
};
