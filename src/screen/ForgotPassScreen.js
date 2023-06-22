import {
  Alert,
  FormControl,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import {Btn_Primary} from '../components';
import {Dimensions} from 'react-native';
import {API_ForgotPassword} from '../controller/API_ForgotPass';
import Colors from '../theme/colors';

const screenWidth = Dimensions.get('window').width;

const ForgotPassScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await API_ForgotPassword(email);
      setSuccessMsg('Reset password link has been sent to your email');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      setRefreshPage(!refreshPage);
    } catch (error) {
      setErrorMsg('An error occurred. Please try again.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      setRefreshPage(!refreshPage);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setRefreshPage(!refreshPage);
    });
    return focusHandler;
  }, [navigation, refreshPage]);

  if (isLoading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Spinner
          accessibilityLabel="Loading posts"
          size="large"
          color={Colors.secondary[500]}
        />
      </Stack>
    );
  }

  return (
    <Stack flex={1} bg={'neutral.50'}>
      {showAlert && (
        <Alert
          status={successMsg ? 'success' : 'error'}
          variant={'left-accent'}
          mx={'18px'}
          mb={1}
          alignItems={'flex-start'}
          borderRadius={8}>
          <HStack space={'10px'}>
            <Alert.Icon />
            <Text fontFamily={'Inter'} fontSize={'12px'}>
              {successMsg ? successMsg : errorMsg}
            </Text>
          </HStack>
        </Alert>
      )}
      <Stack px={5}>
        <Text
          mt={2}
          fontFamily={'Inter'}
          fontWeight={700}
          fontSize={'2xl'}
          color={'secondary.50'}>
          Forgot Password
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'sm'}
          color={'neutral.500'}
          mb={2}>
          Enter your registered email. We will send you a verification code to
          reset your password.
        </Text>
      </Stack>
      <Stack space={5}>
        <FormControl>
          <Stack space={1} px={5}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Enter your email address'}
            />
          </Stack>
        </FormControl>
        <Btn_Primary
          w={screenWidth}
          text={'Send'}
          padding={5}
          onPress={handleSubmit}
        />
      </Stack>
    </Stack>
  );
};
export default ForgotPassScreen;
