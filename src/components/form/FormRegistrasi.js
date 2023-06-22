import {Button, Center, FormControl, Input, Spinner, Stack} from 'native-base';
import React from 'react';
import Btn_Primary from '../button/Btn_Primary';
import {Dimensions} from 'react-native';
import {useState} from 'react';
import {register} from '../../controller/register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertDialogg from '../Alert/AlertDialog';

const screenWidth = Dimensions.get('window').width;

const Form = ({label, placeholder, onChangeText, value}) => {
  return (
    <Stack space={1}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        bgColor={'transparent'}
        borderColor={'neutral.100'}
        focusOutlineColor={'primary.500'}
        borderRadius={10}
        variant={'outline'}
        p={2}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </Stack>
  );
};

const FormRegister = ({onError, navigation}) => {
  const [email, setEmail] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [phone_number, setPhone_Number] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await register(full_name, email, phone_number, password, confirmPassword);
      setShowAlert(true);
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  return (
    <Center>
      <FormControl>
        <Stack space={2} px={10}>
          <Form
            label={'Full Name'}
            value={full_name}
            onChangeText={setFull_Name}
            placeholder={'Enter your full name'}
          />
          <Form
            label={'Email'}
            value={email}
            onChangeText={setEmail}
            placeholder={'Enter your email address'}
          />
          <Form
            label={'Phone Number'}
            value={phone_number}
            onChangeText={setPhone_Number}
            placeholder={'Enter your phone number'}
          />
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={password}
              onChangeText={setPassword}
              placeholder={'Enter your chosen password'}
              type={showPassword1 ? 'text' : 'password'}
              InputRightElement={
                <Button
                  bg={'transparent'}
                  _pressed={{bg: 'transparent'}}
                  _hover={{bg: 'transparent'}}
                  onPress={handleShowPassword1}>
                  <Ionicons
                    name={showPassword1 ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#C2CCD6'}
                  />
                </Button>
              }
            />
            <FormControl.HelperText>
              Minimum 8 characters, letters & numbers.
            </FormControl.HelperText>
          </Stack>
          <Stack>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={'Re-Enter your chosen password'}
              type={showPassword1 ? 'text' : 'password'}
              InputRightElement={
                <Button
                  bg={'transparent'}
                  _pressed={{bg: 'transparent'}}
                  _hover={{bg: 'transparent'}}
                  onPress={handleShowPassword1}>
                  <Ionicons
                    name={showPassword1 ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#C2CCD6'}
                  />
                </Button>
              }
            />
            <FormControl.HelperText>
              Both password must match.
            </FormControl.HelperText>
          </Stack>
        </Stack>
        <Stack h={10} mt={5}>
          <Btn_Primary
            w={screenWidth}
            text={'Register'}
            padding={10}
            onPress={handleSubmit}
          />
          {showAlert && (
            <AlertDialogg
              alertText={
                'Email Verification Token has been sent to your email address!'
              }
              handleAlertClose={handleAlertClose}
              onPress={() => navigation.replace('Login')}
            />
          )}
        </Stack>
      </FormControl>
    </Center>
  );
};

export default FormRegister;
