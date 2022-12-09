import { Box } from "@chakra-ui/react";

const Layout = ({ ...props }) => {
  return (
    <Box
      padding="1rem"
      display={props.display}
      alignItems={props.alignItems}
      flexDirection={props.flexDirection}
      justifyContent={props.justifyContent}
      height={props.height}
      gap={props.gap}
    >
      {console.log(props)}
      {props.children}
    </Box>
  );
};

export default Layout;
