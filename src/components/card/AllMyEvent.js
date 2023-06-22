import React, {useState, useContext, useEffect} from 'react';
import {Box, FlatList, HStack, Image, Spinner, Stack, Text} from 'native-base';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';
import {API_MyEvent} from '../../controller/API_MyEvent';

const AllMyEvent = ({searchText, selectedCategory}) => {
  const [myEvent, setMyEvent] = useState([]);
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_MyEvent(user.accessToken);
        const sortedDataa = response.sort(
          (a, b) => new Date(b.end_date) - new Date(a.end_date),
        );
        setMyEvent(sortedDataa);
        setIsLoading(false);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  const filteredData = myEvent.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const isExpired = date => {
    const currentDate = new Date();
    const expiredDate = new Date(date);
    if (expiredDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = ({item}) => {
    if (
      selectedCategory &&
      selectedCategory.toLowerCase() !==
        (isExpired(item.end_date) ? 'finished' : 'upcoming')
    ) {
      return null;
    }
    const formattedDate = formatDate(item.end_date);
    const expired = isExpired(item.end_date);

    console.log(myEvent);

    return (
      <Stack my={'5px'} mx={'18px'}>
        <Stack
          opacity={expired ? 0.5 : 1}
          w={'100%'}
          borderRadius={8}
          p={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.img_url}`}}
                alt="image_article"
              />
            </Box>
            <Stack pr={'8px'} w={'60%'} justifyContent={'space-evenly'}>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                Date {''}
                {formattedDate}
              </Text>
              {/* <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                {item.custom_field_1}
              </Text> */}
              <Text
                color={Colors.primary[500]}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}>
                {expired ? 'Finished' : 'Upcoming'}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Stack>
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
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Text>No event available.</Text>
      </Stack>
    );
  }

  return (
    <Stack flex={1}>
      {filteredData.length === 0 ? (
        <Stack mt={'40px'} justifyContent={'center'} alignItems={'center'}>
          <Image
            source={require('../../assets/image/emptymycourse.png')}
            alt={'img'}
            h={230}
            w={208}
          />
          <Text fontWeight={'bold'} fontSize={'24'}>
            No Events
          </Text>
          <Text textAlign={'center'}>
            You haven't taken any events. Let's take the events you want now.
          </Text>
        </Stack>
      ) : (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Stack>
  );
};

export default AllMyEvent;
