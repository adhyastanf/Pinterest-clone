'use client';
import LayoutForm from '@/component/LayoutForm';
import { FormControl, FormLabel, Center, FormErrorMessage, Input, Box, Button, Stack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { GrPinterest } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from '@/utils/validation';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const onSubmit = (data) => console.log(data);

  const inputObj = [
    { name: 'Email', id: 'email' },
    { name: 'Password', id: 'password' },
  ];

  return (
    <LayoutForm>
      <Center>
        <Icon as={GrPinterest} color='red' boxSize='8' />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {inputObj.map((data, idx) => {
            return <InputForm key={idx} register={register} id={data.id} errors={errors} />;
          })}
          <Button colorScheme='teal' type='submit'>
            Submit
          </Button>
        </Stack>
      </form>
    </LayoutForm>
  );
}

const InputForm = ({ id, errors, register }) => {
  return (
    <>
      <FormControl isInvalid={errors[id]}>
        <FormLabel>{id}</FormLabel>
        <Input id={id} {...register(id)} type={id} />
        <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
      </FormControl>
      {/* {!isError ? <FormHelperText>{helper}</FormHelperText> : <FormErrorMessage>{error}</FormErrorMessage>} */}
    </>
  );
};
