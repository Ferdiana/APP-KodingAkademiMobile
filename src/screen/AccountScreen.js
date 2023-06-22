import {
  Alert,
  HStack,
  Pressable,
  Spinner,
  Stack,
  Text,
  View,
} from 'native-base';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import formatDate from '../controller/formatDate';
import {AlertDialogg, Btn_Primary} from '../components';
import {API_ResetPassword} from '../controller/API_ForgotPass';
import {useEffect} from 'react';
import {API_Profile} from '../controller/API_Profile';

const Form = ({title, body, onPress, icon, shadow, borderWidth, color}) => {
  return (
    <Pressable onPress={onPress} w={'full'} alignItems={'center'}>
      <HStack
        borderWidth={borderWidth}
        borderColor={Colors.neutral[200]}
        px={'20px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={Colors.neutral[50]}
        h={'44px'}
        w={'90%'}
        borderRadius={'8px'}
        shadow={shadow}>
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'12px'}
          color={'neutral.700'}>
          {title}
        </Text>
        <HStack alignItems={'center'} space={'5px'}>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'12px'}
            color={color}>
            {body}
          </Text>
          <Icon name={icon} size={18} color={'#191F25'} />
        </HStack>
      </HStack>
    </Pressable>
  );
};

const AccountScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const formattedDate = profile.birth_date
    ? formatDate(profile.birth_date)
    : null;
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);
  const shouldRefresh = route.params?.shouldRefresh || false;

  useEffect(() => {
    const loadProfile = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_Profile(user.accessToken);
        setProfile(response);
      }
      setIsLoading(false);
    };
    loadProfile();
  }, [user.accessToken, shouldRefresh]);

  const handleResetPassword = async (accessToken, email) => {
    try {
      setIsLoading(true);
      await API_ResetPassword(user.accessToken, email);
      setSuccessMsg('Reset password link has been sent to your email');
      setShowInfoAlert(true);
      setTimeout(() => {
        setShowInfoAlert(false);
      }, 5000);
      setRefreshPage(!refreshPage);
    } catch (error) {
      setErrorMsg('An error occurred. Please try again.');
      setShowInfoAlert(true);
      setTimeout(() => {
        setShowInfoAlert(false);
      }, 5000);
      setRefreshPage(!refreshPage);
    } finally {
      setShowAlert(false);
    }
    setIsLoading(false);
  };

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
    <View flex={1} bg={Colors.neutral[50]}>
      {showInfoAlert && (
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
      <Stack flex={1} space={'16px'} py={'10px'}>
        <Form borderWidth={1} title={'Email'} body={profile.email} />
        <Form borderWidth={1} title={'Full Name'} body={profile.full_name} />
        <Form
          borderWidth={1}
          title={'Phone Number'}
          body={profile.phone_number}
        />
        <Form
          borderWidth={1}
          title={'Address'}
          body={profile.address ? profile.address : 'Address is null'}
          color={profile.address ? 'neutral.900' : 'neutral.400'}
        />
        <Form
          borderWidth={1}
          title={'Birth Date'}
          body={formattedDate ? formattedDate : 'Birth date is null'}
          color={formattedDate ? 'neutral.900' : 'neutral.400'}
        />
        <Form
          shadow={1}
          title={'Reset Password'}
          onPress={() => setShowAlert(true)}
        />
        {showAlert && (
          <AlertDialogg
            textCencel={'No'}
            textOk={'Yes'}
            alertText={'Are you sure you want to change your password?'}
            displayTwoButtons={true}
            handleAlertClose={() => setShowAlert(false)}
            onPress={handleResetPassword}
          />
        )}
      </Stack>
      <Stack justifyContent={'center'} alignItems={'center'} pb={'20px'}>
        <Btn_Primary
          text={'Edit Profile'}
          w={'90%'}
          onPress={() => navigation.navigate('EditProfile')}
        />
      </Stack>
    </View>
  );
};

export default AccountScreen;
