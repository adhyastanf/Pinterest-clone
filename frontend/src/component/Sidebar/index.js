import { Box, Stack, HStack, Icon, Flex, Card, CardBody, Text, Avatar, Heading, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import pinterest from '@/pinterest.png';
import { RiHomeFill, RiSettings4Fill, RiArrowRightSLine } from 'react-icons/ri';
import { BsCollectionFill } from 'react-icons/bs';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '@/features/authSlice';

export default function Sidebar() {
  const nav = [
    {
      icon: RiHomeFill,
      route: 'Home',
      link: '/',
    },
    {
      icon: RiSettings4Fill,
      route: 'Settings',
      link: '/settings',
    },
    {
      icon: BsCollectionFill,
      route: 'Collections',
      link: '/collections',
    },
  ];

  return (
    <Stack width='280px' py='12' spacing='8' >
      <HStack px={'5'}>
        <Image src={pinterest} width={28} height={28} />
        <Box flex={1} fontWeight='bold'>
          Pinterest
        </Box>
      </HStack>
      <Stack spacing='6' marginBottom={'8'}>
        {nav.map((data, i) => {
          return <NavSidebar key={i} icon={data.icon} route={data.route} link={data.link} />;
        })}
      </Stack>
      <NavProfile />
    </Stack>
    // <Stack width='280px' py='12' spacing='8' position='fixed' bottom='0' top='0' borderEnd={'2px solid'} borderColor='blackAlpha.100'>
    //   <HStack px={'5'}>
    //     <Image src={pinterest} width={28} height={28} alt='pinterestLogo' />
    //     <Heading flex={1} size='md'>
    //       Pinterest
    //     </Heading>
    //   </HStack>
    //   <Stack spacing='6'>
    //     {nav.map((data, i) => {
    //       return <NavSidebar key={i} icon={data.icon} route={data.route} link={data.link} />;
    //     })}
    //   </Stack>
    //   <NavProfile />
    // </Stack>
  );
}

const NavSidebar = ({ icon, route, link }) => {
  return (
    <Link href={link}>
      <HStack px={'5'} spacing='4'>
        <Icon as={icon} boxSize='5' color={'blackAlpha.500'} />
        <Box flex={1}>{route}</Box>
      </HStack>
    </Link>
  );
};

const NavProfile = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Box px={'5'}>
        <Flex gap='4'>
          <Card>
            <CardBody>
              <Text fontSize={'10px'} onClick={() => dispatch(login())}>
                Login
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text fontSize={'10px'} onClick={() => dispatch(logout())}>
                Logout
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    );
  }

  return (
    <Box px={'5'}>
      <Card>
        <CardBody>
          <Flex gap='4'>
            <Flex flex='1' gap='4' alignItems='center'>
              <Avatar name='Adhyasta Naufal Faadhilah' size='sm' src='https://bit.ly/sage-adebayo' />
              <Box>
                <Heading fontSize={'12px'}>Adhyasta Naufal Faadhilah</Heading>
                <Text fontSize={'10px'}>Creator, Chakra UI</Text>
              </Box>
            </Flex>
            <Link href={'/profile'}>
              <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<RiArrowRightSLine />} />
            </Link>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};
