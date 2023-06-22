import React, {useContext, useState} from 'react';
import {
  Text,
  Stack,
  Box,
  ZStack,
  Avatar,
  HStack,
  Pressable,
  Spinner,
} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageBackground} from 'react-native';
import Colors from '../theme/colors';
import {AlertDialogg} from '../components';
import {useEffect} from 'react';
import {API_Profile} from '../controller/API_Profile';

const ButtonProfile = ({text, borderColor, icon, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        space={'24px'}
        px={'20px'}
        alignItems={'center'}
        bg={'neutral.50'}
        h={'50px'}
        borderRadius={'8px'}
        shadow={1}>
        <Icon name={icon} size={24} color={'#191F25'} />
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'14px'}
          color={'neutral.700'}>
          {text}
        </Text>
      </HStack>
    </Pressable>
  );
};

function ProfileScreen({navigation}) {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [user.accessToken]);

  const {logout} = useContext(AuthContext);

  const handleSubmit = async () => {
    await logout();
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
    <Stack bg={'neutral.50'} flex={1}>
      <ImageBackground
        source={require('../assets/image/bg.png')}
        resizeMode="cover">
        <Box w={'full'} h={'160px'} />
      </ImageBackground>
      <ZStack w={'full'} justifyContent={'center'} alignItems={'center'}>
        <Box w={'100%'} px={'38px'}>
          <Stack
            bg={'neutral.50'}
            h={'155px'}
            borderRadius={8}
            shadow={4}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text
              fontFamily={'Inter'}
              fontWeight={600}
              fontSize={'20px'}
              color={'neutral.700'}>
              {profile.full_name}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontWeight={400}
              fontSize={'14px'}
              mt={'10px'}
              color={'neutral.700'}>
              {profile.email}
            </Text>
          </Stack>
        </Box>
        <Box>
          <Avatar
            mb={'155px'}
            size={'74px'}
            bg={Colors.secondary[50]}
            borderWidth={4}
            borderColor={'neutral.50'}>
            <Text
              fontFamily={'Inter'}
              fontWeight={600}
              fontSize={'36px'}
              color={Colors.neutral[50]}>
              {profile.full_name.charAt(0).toUpperCase()}
            </Text>
          </Avatar>
        </Box>
      </ZStack>
      <Stack px={'38px'} mt={'120px'} space={'16px'}>
        <ButtonProfile
          onPress={() => navigation.navigate('Account')}
          text={'Account'}
          icon={'person'}
        />
        <ButtonProfile
          onPress={() => navigation.navigate('MyCourse')}
          text={'My Course'}
          icon={'menu-book'}
        />
        <ButtonProfile
          onPress={() => navigation.navigate('AttendedEvent')}
          text={'Attended Events'}
          icon={'event'}
        />
        <ButtonProfile
          onPress={() => navigation.navigate('Transactions')}
          text={'Transactions'}
          icon={'receipt-long'}
        />
        <ButtonProfile
          onPress={() => setShowAlert(true)}
          text={'Logout'}
          icon={'logout'}
        />
        {showAlert && (
          <AlertDialogg
            textCencel={'No'}
            textOk={'Logout'}
            alertText={'Are you sure you want to logout?'}
            displayTwoButtons={true}
            handleAlertClose={() => setShowAlert(false)}
            onPress={handleSubmit}
          />
        )}
      </Stack>
    </Stack>
  );
}
export default ProfileScreen;
