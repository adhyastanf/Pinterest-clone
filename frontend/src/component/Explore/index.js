import { Box, Text } from '@chakra-ui/react';
import { use } from 'react';

async function getData() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export default function ExploreHome() {
  const data = use(getData());

  return (

      <Box>
        {data.map((data, idx) => {
          return <Text key={idx}>{data.title}</Text>;
        })}
      </Box>

  );
}



