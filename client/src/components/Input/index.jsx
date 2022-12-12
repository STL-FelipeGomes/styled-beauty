import { Input as InputChakra } from '@chakra-ui/react';
import { forwardRef } from 'react';

const Input = forwardRef(({ placeholder, type, maxDate }, ref) => {
  return (
    <InputChakra
      isRequired
      variant="unstyled"
      type={type}
      ref={ref}
      max={maxDate}
      minWidth="100%"
      width="auto"
      placeholder={placeholder}
      p="0.75rem 1rem"
      borderRadius={4}
      background="blackX.300"
      border="1px solid #0F241D"
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
