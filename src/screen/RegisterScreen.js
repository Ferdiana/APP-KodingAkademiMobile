import {
  Alert,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  FormControl,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormRegister} from '../components';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function RegisterScreen({navigation}) {
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleError = error => {
    setErrorMsg(error.response.data.message);
    setShowAlert(true);
    setTimeout(() => {
      setErrorMsg('');
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      setErrorMsg('');
    };
  }, []);
  return (
    <Center flex={1}>
      <Stack h={'30%'} w={'100%'} justifyContent={'center'}>
        <Image
          source={require('../assets/image/bg.png')}
          alt="bg"
          position={'absolute'}
          resizeMode="cover"
          w={'100%'}
          h={'200%'}
          top={0}
        />
        <Center>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <Image
              source={require('../assets/image/logoRounded.png')}
              alt="img_logo"
              h={'98px'}
              w={'98px'}
            />
          </Stack>
        </Center>
        <Stack px={10}>
          <Text
            fontFamily={'Inter'}
            fontSize={'2xl'}
            fontWeight={'bold'}
            color={'neutral.50'}>
            Create Account
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={'md'}
            color={'neutral.50'}
            textAlign={'justify'}>
            Register an account and join Koding Akademi.
          </Text>
        </Stack>
      </Stack>
      <Stack h={'70%'} bg={'neutral.50'} borderTopRadius={30} pt={5} flex={1}>
        {showAlert && (
          <Alert
            status="danger"
            variant={'left-accent'}
            mx={10}
            mb={1}
            alignItems={'flex-start'}
            borderRadius={8}>
            <HStack space={'12px'}>
              <Alert.Icon />
              <Text fontFamily={'Inter'} fontSize={'12px'}>
                {errorMsg}
              </Text>
            </HStack>
          </Alert>
        )}
        <ScrollView
          flexGrow={1}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          flex={1}>
          <FormRegister navigation={navigation} onError={handleError} />

          <HStack my={'16px'} justifyContent={'center'}>
            <Text fontSize={'xs'}>Already have an account? </Text>
            <Pressable onPress={() => navigation.replace('Login')}>
              <Text fontSize={'xs'} fontWeight={'bold'} color={'primary.500'}>
                Login here!
              </Text>
            </Pressable>
          </HStack>
        </ScrollView>
      </Stack>
    </Center>
  );
}

export default RegisterScreen;
