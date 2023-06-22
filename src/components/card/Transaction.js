import React from 'react';
import {useState} from 'react';
import {
  Stack,
  Text,
  HStack,
  Image,
  FlatList,
  Pressable,
  Spinner,
} from 'native-base';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../controller/AuthContext';
import {API_Transaction} from '../../controller/API_Transaction';
import Colors from '../../theme/colors';

const Transaction = ({searchText, selectedCategory, refresh, onRefresh}) => {
  const [transaction, setTransaction] = useState([]);
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTransaction = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        try {
          const response = await API_Transaction(user.accessToken);
          setTransaction(response);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          onRefresh();
        }
      }
    };
    loadTransaction();
  }, [user.accessToken, refresh, onRefresh]);

  const filteredData = transaction.filter(
    item =>
      (selectedCategory === null ||
        item.order_status.toLowerCase() === selectedCategory.toLowerCase()) &&
      item.order.some(orderItem =>
        orderItem.Product.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
  );

  const handlePress = id => {
    navigation.navigate('DetailTransactions', {id});
  };
  const formatDate = dateString => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const localizedDate = date.toLocaleString('id-ID', options);

    return localizedDate;
  };

  const renderItem = ({item}) => {
    let date;
    switch (item.order_status) {
      case 'success':
        date = item.transaction.map(trans => formatDate(trans.date));
        break;
      case 'pending':
        date = formatDate(item.createdAt);
        break;
      case 'canceled':
        date = formatDate(item.updatedAt);
        break;
      default:
        date = '';
        break;
    }
    const numberOfProducts = item.order.length;

    return (
      <Pressable key={item.id} onPress={() => handlePress(item.id)}>
        <Stack
          bg={Colors.neutral[50]}
          shadow={1}
          p={'8px'}
          mt={'2px'}
          mb={'10px'}
          mx={'18px'}
          borderRadius={8}>
          <HStack
            mb={'2px'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text fontFamily={'Inter'} fontWeight={500} fontSize={'12px'}>
              {date}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontWeight={500}
              fontSize={'12px'}
              color={Colors.primary[500]}
              textTransform={'capitalize'}>
              {item.order_status}
            </Text>
          </HStack>
          <HStack space={'8px'} h={'80px'} w={'100%'}>
            <Image
              w={'40%'}
              borderRadius={8}
              source={{uri: item.order[0].Product.img_url}}
              alt={item.order[0].Product.name}
            />
            <Stack w={'60%'} pr={'8px'} justifyContent={'space-between'}>
              <Text
                fontFamily={'Inter'}
                fontWeight={600}
                fontSize={'12px'}
                numberOfLines={1}>
                {item.order[0].Product.name}
              </Text>
              <Text
                fontFamily={'Inter'}
                fontWeight={500}
                fontSize={'10px'}
                color={Colors.neutral[500]}>
                {item.order[0].Product.discount_price ? (
                  <Text>
                    {`Rp${item.order[0].Product.discount_price.toLocaleString(
                      'id-ID',
                    )}`}
                  </Text>
                ) : (
                  <Text>
                    {`Rp${item.order[0].Product.price.toLocaleString('id-ID')}`}
                  </Text>
                )}
              </Text>
              <Text
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'10px'}
                color={Colors.neutral[500]}>
                {numberOfProducts} Items
              </Text>
              <HStack justifyContent={'space-between'}>
                <Text
                  fontFamily={'Inter'}
                  fontWeight={400}
                  fontSize={'12px'}
                  color={Colors.neutral[900]}>
                  Total Payment:
                </Text>
                <Text
                  fontFamily={'Inter'}
                  fontWeight={500}
                  fontSize={'12px'}
                  color={Colors.neutral[900]}>
                  {`Rp${item.total.toLocaleString('id-ID')}`}
                </Text>
              </HStack>
            </Stack>
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
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Text>No transaction available.</Text>
      </Stack>
    );
  }

  return (
    <FlatList
      pt={'5px'}
      data={filteredData}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default Transaction;
