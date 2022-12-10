import { forwardRef } from 'react';
import { Input as InputChakra } from '@chakra-ui/react';

const Input = forwardRef(({ placeholder, type }, ref) => {
  return (
    <InputChakra
      isRequired
      type={type}
      ref={ref}
      minWidth="100%"
      placeholder={placeholder}
      marginBottom="0.5rem"
      padding="0.5rem 2rem"
      borderRadius="1rem"
      background="blackX.400"
      border="2px solid #0F241D"
      focusBorderColor="red"
      _focus={{
        background: 'whiteX.700',
      }}
      _hover={{
        background: 'whiteX.700',
      }}
    />
  );
});

export default Input;