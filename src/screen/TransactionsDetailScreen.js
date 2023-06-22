import React from 'react';
import {useState} from 'react';
import {Stack, Text, HStack, Image, Spinner, ScrollView} from 'native-base';
import Colors from '../theme/colors';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
import formatDate from '../controller/formatDate';
import {API_DetailTransaction} from '../controller/API_Transaction';
import {AlertDialogg, Btn_Outline, Btn_Primary} from '../components';
import {
  API_CencelPayment,
  API_GetPayment,
} from '../controller/API_XenditCallback';
import {Linking} from 'react-native';

const TransactionDetailScreen = ({route, navigation}) => {
  const [transaction, setTransaction] = useState([]);
  const {user} = useContext(AuthContext);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);

  console.log(transaction);

  useEffect(() => {
    const {id} = route.params;
    const loadTranscation = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_DetailTransaction(id, user.accessToken);
        setTransaction(response);
        setNumberOfProducts(response.order.length);
        setIsLoading(false);
      }
    };
    loadTranscation();
  }, [route.params, user.accessToken]);

  const handlePayNow = async () => {
    try {
      setIsLoading(true);
      const response = await API_GetPayment(
        user.accessToken,
        transaction.invoice_id,
      );
      if (response) {
        Linking.openURL(response);
        setRefreshPage(!refreshPage);
        navigation.navigate('Transactions');
      }
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  };

  const handleCencelPayment = async id => {
    try {
      setIsLoading(true);
      const response = await API_CencelPayment(
        user.accessToken,
        transaction.invoice_id,
      );
      console.log(response);
      setRefreshPage(!refreshPage);
      navigation.navigate('Transactions');
    } catch (error) {
      console.error(error.message);
    } finally {
      setShowAlert(false);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setRefreshPage(!refreshPage);
    });
    return focusHandler;
  }, [navigation, refreshPage]);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  let formattedDate = '';
  if (transaction.order_status === 'success') {
    formattedDate = formatDate(transaction.transaction[0].date);
  } else if (transaction.order_status === 'pending') {
    formattedDate = formatDate(transaction.createdAt);
  } else if (transaction.order_status === 'canceled') {
    formattedDate = formatDate(transaction.updatedAt);
  }

  let paymentText = '';
  if (transaction.order_status === 'success') {
    paymentText = 'Payment Time';
  } else if (transaction.order_status === 'pending') {
    paymentText = 'Order Creation Time';
  } else if (transaction.order_status === 'canceled') {
    paymentText = 'Cancellation Time';
  }

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
    <Stack bg={Colors.neutral[50]} flex={1} key={transaction.invoice_id}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack px={'18px'} w={'100%'}>
          <Stack w={'40%'} space={'10px'}>
            <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'600'}>
              No. Transaction
            </Text>
            <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'600'}>
              {paymentText}
            </Text>
            <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'600'}>
              Transaction Status
            </Text>
          </Stack>
          <Stack w={'60%'} space={'10px'}>
            <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'400'}>
              {transaction.invoice_id}
            </Text>
            <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'400'}>
              {formattedDate}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={'400'}
              textTransform={'capitalize'}>
              {transaction.order_status}
            </Text>
          </Stack>
        </HStack>
        <Stack px={'18px'}>
          {transaction.order &&
            transaction.order.map(item => (
              <HStack
                space={'8px'}
                key={item.producti_id}
                borderRadius={8}
                p={'8px'}
                my={'6px'}
                bg={Colors.neutral[50]}
                shadow={1}
                w={'100%'}>
                <Image
                  borderRadius={8}
                  w={'40%'}
                  h={'80px'}
                  source={{uri: item.Product.img_url}}
                  alt={item.Product.name}
                />
                <Stack w={'60%'} pr={'8px'} justifyContent={'space-between'}>
                  <Text
                    fontFamily={'Inter'}
                    fontWeight={600}
                    fontSize={'12px'}
                    color={Colors.neutral[900]}
                    numberOfLines={3}>
                    {item.Product.name}
                  </Text>
                  <Text
                    textAlign={'right'}
                    fontFamily={'Inter'}
                    fontWeight={500}
                    fontSize={'12px'}
                    color={Colors.neutral[900]}>
                    {item.Product.discount_price ? (
                      <Text>{`Rp${item.Product.discount_price.toLocaleString(
                        'id-ID',
                      )}`}</Text>
                    ) : (
                      <Text>{`Rp${item.Product.price.toLocaleString(
                        'id-ID',
                      )}`}</Text>
                    )}
                  </Text>
                </Stack>
              </HStack>
            ))}
          <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'600'}>
            Payment Notes
          </Text>
          <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'400'}>
            {transaction.custom_field_1}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={'600'}>
            Payment Details
          </Text>
          <HStack mt={'8px'} w={'100%'}>
            {transaction.order_status === 'pending' ||
            transaction.order_status === 'cancel' ? (
              <>
                <Stack w={'50%'} space={'10px'}>
                  <Text
                    fontFamily={'Inter'}
                    fontSize={'12px'}
                    fontWeight={'400'}>
                    Total Price of Product ({numberOfProducts})
                  </Text>
                </Stack>
                <Stack w={'50%'} space={'10px'}>
                  <Text
                    fontFamily={'Inter'}
                    fontSize={'12px'}
                    fontWeight={'400'}>{`Rp${transaction.total.toLocaleString(
                    'id-ID',
                  )}`}</Text>
                </Stack>
              </>
            ) : (
              <HStack mt={'8px'} w={'100%'}>
                {transaction.order_status === 'pending' ||
                transaction.order_status === 'canceled' ? (
                  <>
                    <Stack w={'50%'} space={'10px'}>
                      <Text
                        fontFamily={'Inter'}
                        fontSize={'12px'}
                        fontWeight={'400'}>
                        Total Price of Product ({numberOfProducts})
                      </Text>
                    </Stack>
                    <Stack w={'50%'} space={'10px'}>
                      <Text
                        fontFamily={'Inter'}
                        fontSize={'12px'}
                        fontWeight={
                          '400'
                        }>{`Rp${transaction.total.toLocaleString(
                        'id-ID',
                      )}`}</Text>
                    </Stack>
                  </>
                ) : (
                  transaction &&
                  transaction.transaction &&
                  transaction.transaction.length > 0 && (
                    <>
                      <Stack w={'50%'} space={'10px'}>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={'400'}>
                          Payment Method
                        </Text>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={'400'}>
                          Total Price of Product ({numberOfProducts})
                        </Text>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={'400'}>
                          Total Payment
                        </Text>
                      </Stack>
                      <Stack w={'50%'} space={'10px'}>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={'400'}>
                          {transaction.transaction[0].bank_name}
                        </Text>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={
                            '400'
                          }>{`Rp${transaction.total.toLocaleString(
                          'id-ID',
                        )}`}</Text>
                        <Text
                          fontFamily={'Inter'}
                          fontSize={'12px'}
                          fontWeight={
                            '400'
                          }>{`Rp${transaction.total.toLocaleString(
                          'id-ID',
                        )}`}</Text>
                      </Stack>
                    </>
                  )
                )}
              </HStack>
            )}
          </HStack>
          <Stack mt={'12px'}>
            {transaction.order_status === 'pending' && (
              <>
                <Btn_Primary
                  text={'Pay Now'}
                  pb={'15px'}
                  onPress={handlePayNow}
                />
                <Btn_Outline text={'Cancel'} onPress={handleButtonClick} />
                {showAlert && (
                  <AlertDialogg
                    textCencel={'No'}
                    textOk={'Yes, Cancel'}
                    alertText={'Are you sure you want to cancel this order?'}
                    displayTwoButtons={true}
                    handleAlertClose={handleAlertClose}
                    onPress={handleCencelPayment}
                  />
                )}
              </>
            )}
          </Stack>
        </Stack>
      </ScrollView>
    </Stack>
  );
};

export default TransactionDetailScreen;
