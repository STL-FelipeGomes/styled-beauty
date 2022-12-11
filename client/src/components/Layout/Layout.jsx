import { Box } from '@chakra-ui/react';

const Layout = ({
  display,
  alignItems,
  flexDirection,
  justifyContent,
  height,
  gap,
  children,
}) => {
  return (
    <Box
      padding="1rem"
      display={display}
      alignItems={alignItems}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      height={height}
      gap={gap}
      margin="0 auto"
      width="375px"
    >
      {children}
    </Box>
  );
};

export default Layout;
