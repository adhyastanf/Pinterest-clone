
import { Flex, Center, Box } from '@chakra-ui/react';

export default function LayoutForm({ children }) {
  return (
    <Flex height='100vh'>
      <LeftSide />
      <RightSide>{children}</RightSide>
    </Flex>
  );
}

const LeftSide = () => {
  return (
    <Box
      bgColor={'tomato'}
      width={[
        '100%', // 0-30em
        '50%', // 30em-48em
        '25%', // 48em-62em
        '15%', // 62em+
      ]}
    >
      test
    </Box>
  );
};
const RightSide = ({ children }) => {
  return (
    <Center flex={1}>
      <Box>{children}</Box>
    </Center>
  );
};
