import React, {useEffect, useContext, useState} from 'react';
import {
  FlatList,
  Text,
  Image,
  Stack,
  Pressable,
  Spinner,
  HStack,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';
import {API_Events} from '../../controller/API_Events';

const AllEvent = ({searchText}) => {
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_Events(user.accessToken);
        const eventDates = response.flatMap(event => event.event_dates);
        const sortedEvents = response.sort((a, b) => {
          const dateA = new Date(a.event_dates[0].date);
          const dateB = new Date(b.event_dates[0].date);
          return dateB - dateA;
        });
        setEvents(sortedEvents);
        setEventDate(eventDates);
        setIsLoading(false);
      }
    };
    loadEvents();
  }, [user.accessToken]);

  console.log(events);

  const handlePress = id => {
    navigation.navigate('EventDetail', {id});
  };

  const convertedOptions = eventDate.map(option => {
    const formattedDate = formatDate(option.date);
    return {date: formattedDate};
  });

  const currentDate = new Date();

  const renderTextStatus = eventDates => {
    const hasUpcomingEvent = eventDates.some(
      date => new Date(date.date) > currentDate,
    );
    return hasUpcomingEvent;
  };

  const filteredData = events.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const eventStatusText = renderTextStatus(item.event_dates);
    return (
      <Pressable p={'4px'} w={'50%'} onPress={() => handlePress(item.id)}>
        <Stack
          opacity={eventStatusText ? 1 : 0.5}
          bgColor={'white'}
          p={2}
          borderRadius={8}
          borderColor={Colors.primary[600]}
          shadow={1}>
          <Image
            source={{uri: item.img_url}}
            w={'full'}
            h={100}
            alt={'image'}
            borderRadius={10}
          />
          <Text
            mb={'2px'}
            py={'4px'}
            numberOfLines={2}
            fontFamily={'Inter'}
            fontSize={'14px'}
            fontWeight={600}
            h={'50px'}
            color={Colors.primary[600]}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            color={Colors.neutral[900]}
            fontFamily={'Inter'}
            fontSize={'10px'}
            fontWeight={400}>
            {(() => {
              const eventDates = item.event_dates.map(eventdate =>
                formatDate(eventdate.date),
              );
              const uniqueDates = [...new Set(eventDates)];
              const filteredDates = uniqueDates.filter(date =>
                convertedOptions.some(option => option.date === date),
              );
              if (filteredDates.length > 1) {
                const startDate = filteredDates[0];
                const endDate = filteredDates[filteredDates.length - 1];
                return `${startDate} - ${endDate}`;
              } else {
                return filteredDates[0];
              }
            })()}
          </Text>
          <HStack justifyContent={'space-between'}>
            <Text
              color={Colors.primary[500]}
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={600}>
              {eventStatusText ? 'Upcoming' : 'Finished'}
            </Text>
            <Text
              color={Colors.primary[500]}
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={600}>
              quota: {item.participants}/{item.quota}
            </Text>
          </HStack>
        </Stack>
      </Pressable>
    );
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

  if (filteredData.length === 0) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Image
          source={require('../../assets/image/NoResults.png')}
          alt={'img'}
          h={230}
          w={208}
        />
        <Text textAlign={'center'} fontFamily={'Inter'} fontWeight={600}>
          No Result
        </Text>
        <Text fontFamily={'Inter'} textAlign={'center'} px={10}>
          Sorry, there are no results for this search. Please try another
          phrase..
        </Text>
      </Stack>
    );
  }

  return (
    <FlatList
      numColumns={2}
      px={'14px'}
      showsVerticalScrollIndicator={false}
      data={filteredData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default AllEvent;
