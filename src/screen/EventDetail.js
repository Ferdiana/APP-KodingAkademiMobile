import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  Stack,
  Center,
  Image,
  ScrollView,
  Pressable,
  HStack,
  ZStack,
  Spinner,
  Alert,
} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {Dropdown} from 'react-native-element-dropdown';
import {API_DetailEvents} from '../controller/API_Events';
import {API_AddCart, API_GetCart} from '../controller/API_Cart';
import Icon from 'react-native-vector-icons/Feather';
import formatDate from '../controller/formatDate';

const EventDetailScreen = ({route, navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const {user} = useContext(AuthContext);
  const [eventDetail, setEventDetail] = useState({});
  const [dropdownOption, setDropdownOption] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');

  useEffect(() => {
    const {id} = route.params;
    const loadData = async () => {
      const eventDetailResponse = await API_DetailEvents(id, user.accessToken);
      setEventDetail(eventDetailResponse);

      const currentDate = new Date();
      const filteredDates = eventDetailResponse.event_dates.filter(
        date => new Date(date.date) > currentDate,
      );
      setDropdownOption(filteredDates);

      if (user.accessToken) {
        const cartItems = await API_GetCart(user.accessToken);
        const count = cartItems.cart_items.length;
        setCartItemCount(count);
      }
      setIsLoading(false);
    };
    loadData();
  }, [route.params, user.accessToken, refreshPage]);

  const handleAddToCart = async () => {
    if (selectedDate) {
      try {
        const response = await API_AddCart(
          user.accessToken,
          eventDetail.id,
          selectedDate.date,
        );
        setsuccessMsg(response.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        setRefreshPage(!refreshPage);
      } catch (error) {
        setErrorMsg(error.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        console.error(error.message);
        setRefreshPage(!refreshPage);
      }
    } else {
      setErrorMsg('Event date is invalid');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      setRefreshPage(!refreshPage);
    }
  };

  const currentDate = new Date(); // Get the current date

  const convertedOptions = dropdownOption.map(option => {
    const formattedDate = formatDate(option.date);
    const isDatePassed = new Date(option.date) < currentDate;
    if (isDatePassed) {
      return null;
    }
    return {date: formattedDate};
  });

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
    <Stack bg={Colors.neutral[50]} flex={1}>
      {showAlert && (
        <Alert
          status={successMsg ? 'success' : 'error'}
          variant={'left-accent'}
          mx={'18px'}
          mb={1}
          alignItems={'flex-start'}
          borderRadius={8}>
          <HStack space={'12px'}>
            <Alert.Icon />
            <Text fontFamily={'Inter'} fontSize={'12px'}>
              {successMsg ? successMsg : errorMsg}
            </Text>
          </HStack>
        </Alert>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'full'} h={'324px'} px={'18px'} py={'10px'}>
          <Image
            borderRadius={8}
            source={{uri: eventDetail.img_url}}
            alt="img_product"
            h={'100%'}
            width={'100%'}
          />
        </Center>
        <Stack px={'18px'}>
          <Text fontFamily={'Inter'} fontWeight={600} fontSize={'20px'}>
            {eventDetail.name}
          </Text>
          <Text fontFamily={'Inter'} fontWeight={500} fontSize={'16px'}>
            {eventDetail.price
              ? `Rp${eventDetail.price.toLocaleString('id-ID')}`
              : 'FREE'}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Description
          </Text>
          <HTMLContentView
            value={eventDetail.description}
            stylesheet={styles}
          />
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Remaining quota
          </Text>
          <Text fontFamily={'Inter'} fontWeight={400} fontSize={'12px'}>
            {eventDetail.participants}/{eventDetail.quota} Participants
          </Text>
          <Stack space={'5px'} mb={'80px'}>
            <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
              Choose Event Date
            </Text>
            <Dropdown
              style={styles.Dropdown}
              fontFamily="Inter"
              data={convertedOptions}
              valueField="date"
              labelField={'date'}
              placeholder={'Select Date'}
              value={selectedDate.date}
              onChange={itemValue => setSelectedDate(itemValue)}
            />
          </Stack>
        </Stack>
      </ScrollView>
      <HStack
        px={'18px'}
        py={'8px'}
        alignItems={'center'}
        space={'8px'}
        justifyContent={'space-between'}>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Stack
            w={'46px'}
            h={'46px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Icon name="shopping-cart" color={Colors.neutral[900]} size={28} />
            {cartItemCount > 0 && (
              <ZStack
                position="absolute"
                top={'0'}
                right={'0'}
                bg="primary.500"
                alignItems="center"
                borderRadius={100}
                width={'18px'}
                height={'18px'}>
                <Text
                  fontFamily={'Inter'}
                  color="white"
                  fontSize={12}
                  fontWeight="semibold">
                  {cartItemCount}
                </Text>
              </ZStack>
            )}
          </Stack>
        </Pressable>
        <Stack w={'82%'}>
          <Btn_Primary
            w={'100%'}
            onPress={handleAddToCart}
            text={'Add to cart'}
          />
        </Stack>
      </HStack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  Dropdown: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  p: {
    textAlign: 'justify',
    lineHeight: 18,
    fontSize: 12,
  },
  ul: {
    textAlign: 'justify',
  },
  li: {
    textAlign: 'justify',
  },
});

export default EventDetailScreen;
