import {
  Alert,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {FormLogin} from '../components';

function LoginScreen({navigation}) {
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const {loginWithGoogle} = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

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
    <Center bg={Colors.neutral[50]} flex={1}>
      <Stack pt={10} pb={4} h={'35%'} w={'100%'} justifyContent={'center'}>
        <Stack alignItems={'center'}>
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            h={'98px'}
            w={'98px'}
            py={'10px'}
            bg={'secondary.500'}
            borderRadius={50}>
            <Image
              source={require('../assets/image/logoRounded.png')}
              alt="img_logo"
              h={'98px'}
              w={'98px'}
            />
          </Stack>
        </Stack>
        <Text
          fontSize={'2xl'}
          fontWeight={'bold'}
          color={Colors.secondary[50]}
          px={10}>
          Login to Continue
        </Text>
        <Text
          fontSize={'md'}
          color={'neutral.700'}
          mt={1}
          mb={'12px'}
          textAlign={'justify'}
          px={10}>
          Log in to your account and continue your learning journey in Koding
          Akademi.
        </Text>
      </Stack>
      <Center
        borderTopRadius={30}
        h={'65%'}
        pt={'28px'}
        bg="secondary.50"
        overflow={'hidden'}>
        <Image
          resizeMode="cover"
          source={require('../assets/image/bg.png')}
          alt="bg"
          w={'100%'}
          h={'200%'}
          position={'absolute'}
          top={0}
          left={0}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {showAlert && (
            <Stack mx={10}>
              <Alert
                status="danger"
                variant={'left-accent'}
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
            </Stack>
          )}
          <FormLogin navigation={navigation} onError={handleError} />
          <HStack justifyContent={'center'} my={5}>
            <Text
              fontFamily={'Inter'}
              fontSize={'12px'}
              color={Colors.neutral[50]}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.replace('Register')}>
              <Text
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={700}
                color={Colors.neutral[50]}>
                Register here!
              </Text>
            </Pressable>
          </HStack>
          <Text
            mb={5}
            textAlign={'center'}
            fontWeight={'thin'}
            fontSize={'12px'}
            color={'neutral.50'}>
            or continue with
          </Text>
          <Center>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleLogin}
            />
          </Center>
        </ScrollView>
      </Center>
    </Center>
  );
}

export default LoginScreen;
