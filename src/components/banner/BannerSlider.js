import React, {useContext, useEffect, useState} from 'react';
import {Image, Center, Pressable} from 'native-base';
import Swiper from 'react-native-swiper';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {API_EventsLimit} from '../../controller/API_Events';

const BannerSlider = () => {
  const [events, setEvents] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadEvents = async () => {
      if (user.accessToken) {
        const eventsData = await API_EventsLimit(user.accessToken);
        setEvents(eventsData);
      }
    };
    loadEvents();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('EventDetail', {id});
  };
  return (
    <Swiper
      autoplay={true}
      loop={true}
      height={120}
      paginationStyle={{bottom: 5}}
      dotColor={Colors.neutral[100]}
      activeDotColor={Colors.neutral[900]}
      style={{overflow: 'hidden'}}>
      {events.map(Banner => (
        <Pressable key={Banner.id} onPress={() => handlePress(Banner.id)}>
          <Center mx={5}>
            <Image
              source={{uri: `${Banner.img_url}`}}
              alt={'img'}
              w={'100%'}
              h={'100%'}
              borderRadius={10}
            />
          </Center>
        </Pressable>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
