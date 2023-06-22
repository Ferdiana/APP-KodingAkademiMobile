import React, {useContext} from 'react';
import {
  Text,
  Stack,
  ScrollView,
  HStack,
  Button,
  Spinner,
  Input,
  View,
} from 'native-base';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import {useState} from 'react';
import {Linking} from 'react-native';
import {API_Checkout, API_CheckoutWithCoupon} from '../controller/API_Checkout';

const CheckoutScreen = ({route, navigation}) => {
  const {
    selectedItems,
    totalPrice,
    discountedPrice,
    couponDiscount,
    numSelectedItems,
    selectedCoupon,
  } = route.params;
  const {user} = useContext(AuthContext);
  const [isLoading, seIstLoading] = useState(false);
  const [custom_field_1, setCustom_field_1] = useState('');

  const displayTotalPrice = isNaN(discountedPrice)
    ? `Rp${totalPrice.toLocaleString('id-ID')}`
    : discountedPrice < 0
    ? 0
    : `Rp${discountedPrice.toLocaleString('id-ID')}`;

  const filterSelectedId = selectedItems.map(item => item.id);

  const handlePayment = async () => {
    try {
      seIstLoading(true);
      let response;
      if (selectedCoupon) {
        response = await API_CheckoutWithCoupon(
          user.accessToken,
          filterSelectedId,
          selectedCoupon,
          custom_field_1,
        );
      } else {
        response = await API_Checkout(
          user.accessToken,
          filterSelectedId,
          custom_field_1,
        );
      }
      if (response) {
        Linking.openURL(response);
      }
      navigation.replace('Payment', {
        total: displayTotalPrice,
      });
    } catch (error) {
      console.log(error.message);
      navigation.replace('PaymentFailed', {
        error: error.message,
      });
    } finally {
      seIstLoading(false);
    }
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
    <Stack flex={1}>
      <Stack flex={1} space={1}>
        <ScrollView>
          <Stack space={1}>
            {selectedItems.map(item => (
              <CartCard
                WImage={'40%'}
                WText={'60%'}
                key={item.id}
                item={item}
                hideCheckboxAndIcon
              />
            ))}
          </Stack>
        </ScrollView>
      </Stack>
      <Stack py={'5px'} bg={Colors.neutral[50]} px={'18px'}>
        <HStack justifyContent={'space-between'}>
          <Text>Subtotal ({numSelectedItems} items) </Text>
          <Text>{`Rp${totalPrice.toLocaleString('id-ID')}`}</Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text>Coupon</Text>
          <Text color={'red.500'}>
            -{' '}
            {couponDiscount !== null && couponDiscount !== undefined
              ? `Rp${couponDiscount.toLocaleString('id-ID')}`
              : 'Rp0'}
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text>Total Order </Text>
          <Text>{displayTotalPrice}</Text>
        </HStack>
      </Stack>
      <Stack
        justifyContent={'flex-end'}
        space={'10px'}
        py={'10px'}
        w={'full'}
        px={'18'}
        bgColor={Colors.secondary[100]}>
        <Input
          h={'40px'}
          bgColor={'neutral.50'}
          borderRadius={'10'}
          borderColor={'neutral.50'}
          focusOutlineColor={'neutral.500'}
          placeholder="Add some note"
          value={custom_field_1}
          onChangeText={setCustom_field_1}
        />
        <HStack
          h={'40px'}
          bg={'white'}
          borderRadius={'10'}
          justifyContent={'space-between'}
          alignItems={'center'}
          px={18}>
          {couponDiscount ? (
            <Text>
              You get {`Rp${couponDiscount.toLocaleString('id-ID')}`} promo
            </Text>
          ) : (
            <Text>There are no coupons used.</Text>
          )}
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total Price
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              {`${displayTotalPrice.toLocaleString('id-ID')}`}
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={handlePayment}>
              <Text color={'white'}>Pay Now</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CheckoutScreen;
