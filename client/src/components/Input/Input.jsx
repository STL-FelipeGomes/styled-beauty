import { forwardRef } from 'react';
import { Input as InputChakra } from '@chakra-ui/react';

const Input = forwardRef(({ placeholder, type, maxDate }, ref) => {
  return (
    <InputChakra
      variant="unstyled"
      isRequired
      type={type}
      ref={ref}
      max={maxDate}
      minWidth="100%"
      width="auto"
      placeholder={placeholder}
      padding="0.5rem 2rem"
      borderRadius="1rem"
      background="blackX.400"
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
