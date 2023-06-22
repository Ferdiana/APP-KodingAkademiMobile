import {Center, FormControl, Input, Stack, Button, Text} from 'native-base';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../controller/AuthContext';
import Btn_Primary from '../button/Btn_Primary';
import {Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const FormLogin = ({navigation, onError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Center>
      <FormControl>
        <Stack space={'12px'} px={10}>
          <Stack space={'6px'}>
            <Text
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={500}
              color={'neutral.50'}>
              Email
            </Text>
            <Input
              bgColor={'neutral.50'}
              borderColor={'neutral.100'}
              focusOutlineColor={'neutral.900'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Enter your email address'}
            />
          </Stack>
          <Stack space={'6px'}>
            <Text
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={500}
              color={'neutral.50'}>
              Password
            </Text>
            <Input
              bgColor={'neutral.50'}
              borderColor={'neutral.100'}
              focusOutlineColor={'neutral.900'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={password}
              onChangeText={setPassword}
              placeholder={'Enter your password'}
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Button
                  bg={'transparent'}
                  _pressed={{bg: 'transparent'}}
                  _hover={{bg: 'transparent'}}
                  onPress={handleShowPassword}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#C2CCD6'}
                  />
                </Button>
              }
            />
          </Stack>
        </Stack>
        <Button
          onPress={() => navigation.navigate('ForgotPass')}
          variant={'link'}
          justifyContent={'flex-end'}
          px={10}
          mb={2}>
          <Text fontSize={'xs'} fontWeight={'light'} color={'neutral.50'}>
            Forgot Password?
          </Text>
        </Button>
        <Stack h={10}>
          <Btn_Primary
            w={screenWidth}
            text={'Login'}
            padding={10}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </Stack>
      </FormControl>
    </Center>
  );
};

export default FormLogin;
