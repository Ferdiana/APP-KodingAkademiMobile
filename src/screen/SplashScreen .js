import React, {useContext, useEffect} from 'react';
import {Center, Text} from 'native-base';
import {AuthContext} from '../controller/AuthContext';

const SplashScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate('home');
      } else {
        navigation.navigate('OnBoarding');
      }
    }, 2000); //Delay for 2 seconds to show the splash screen
  }, [user, navigation]);

  return (
    <Center flex={1}>
      <Text>Loading</Text>
    </Center>
  );
};

export default SplashScreen;
