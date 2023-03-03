import { Input, InputGroup, InputLeftElement, Flex, IconButton } from '@chakra-ui/react';
import { RiSearch2Line, RiAddFill } from 'react-icons/ri';

export const Search = () => {
  return (
    <InputGroup size={'md'}>
      <InputLeftElement pointerEvents='none' children={<RiSearch2Line color='gray.300' />} />
      <Input placeholder='Search' />
    </InputGroup>
  );
};

export const Header = () => {
  return (
    <Flex gap={'4'}>
      <Search />
      <BtnIcon />
    </Flex>
  );
};

export const BtnIcon = () => {
  return <IconButton aria-label='Add Collection' icon={<RiAddFill />} />;
};
