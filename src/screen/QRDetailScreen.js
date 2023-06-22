import React from 'react';
import QRComponent from '../components/QR/QRComponent';
import {Avatar, Center, Text, Stack, Spinner} from 'native-base';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import {useEffect} from 'react';
import {API_Profile} from '../controller/API_Profile';
import {useState} from 'react';
import formatDate from '../controller/formatDate';

const QRDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {expiredDate} = route.params;

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

  const expired_date = formatDate(expiredDate);

  return (
    <Stack alignItems={'center'} flex={1} bg={Colors.neutral[50]} py={'10px'}>
      <Stack alignItems={'center'} mb={'40px'}>
        <Avatar size={'74px'} bg={Colors.secondary[300]}>
          <Text
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'36px'}
            color={Colors.neutral[50]}>
            {profile.full_name.charAt(0).toUpperCase()}
          </Text>
        </Avatar>
        <Text
          mt={'10px'}
          color={Colors.neutral[700]}
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'20px'}>
          {profile.full_name}
        </Text>
      </Stack>
      <Stack
        borderWidth={4}
        borderColor={Colors.secondary[300]}
        borderRadius={8}>
        <Stack background={'neutral.50'} p={2} borderRadius={8}>
          <QRComponent size={200} />
        </Stack>
      </Stack>
      {expiredDate ? (
        <Stack justifyContent={'center'} alignItems={'center'} py={'8px'}>
          <Text fontFamily={'Inter'} fontSize={'14px'}>
            Status:{' '}
            {expiredDate && expiredDate < new Date() ? (
              <Text color={Colors.primary[600]}>Expired</Text>
            ) : (
              <Text color={Colors.primary[600]}>Active</Text>
            )}
          </Text>
          {expiredDate && <Text>Expired Date: {expired_date}</Text>}
        </Stack>
      ) : null}
    </Stack>
  );
};
export default QRDetailScreen;
