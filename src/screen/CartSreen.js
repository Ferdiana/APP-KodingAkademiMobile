import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Text,
  Stack,
  HStack,
  Button,
  Pressable,
  Image,
  ScrollView,
  Spinner,
} from 'native-base';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import {API_DeleteCart, API_GetCart} from '../controller/API_Cart';

const CartScreen = ({route, navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const {couponDiscount, selectedCoupon} = route.params || 0;
  const [updatedSelectedItems, setUpdatedSelectedItems] = useState([]);
  const [canCheckout, setCanCheckout] = useState(false);
  const numSelectedItems = selectedItems.length;
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const loadCart = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_GetCart(user.accessToken);
        setCartItems(response.cart_items);
      }
      setIsLoading(false);
    };
    loadCart();
  }, [user.accessToken]);

  useEffect(() => {
    if (route.params && route.params.selectedItems) {
      setSelectedItems(route.params.selectedItems);
      setUpdatedSelectedItems(route.params.selectedItems);
      setCanCheckout(route.params.selectedItems.length > 0);
    }
  }, [route.params]);

  const handleSelectItem = item => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );

    if (isSelected) {
      setSelectedItems(prevItems =>
        prevItems.filter(selectedItem => selectedItem.id !== item.id),
      );
    } else {
      setSelectedItems(prevItems => [
        ...prevItems,
        {
          ...item,
          selected: true,
        },
      ]);
    }

    setCanCheckout(!isSelected);
  };

  const handleDeleteItem = async itemId => {
    try {
      await API_DeleteCart(user.accessToken, [itemId]);
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setSelectedItems(prevItems =>
        prevItems.filter(item => item.id !== itemId),
      );
      setCanCheckout(selectedItems.length > 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (canCheckout) {
      navigation.navigate('Checkout', {
        selectedCoupon,
        selectedItems,
        totalPrice,
        discountedPrice,
        couponDiscount,
        numSelectedItems,
      });
    }
  };

  const handleClick = () => {
    navigation.navigate('Coupon', {
      fromScreen: 'Cart',
      selectedItems,
      totalPrice,
      discountedPrice,
      couponDiscount,
      numSelectedItems,
    });
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

  const renderCartItems = () => {
    return cartItems.map(item => (
      <CartCard
        WImage={'30%'}
        WText={'60%'}
        key={item.id}
        item={item}
        onSelectItem={handleSelectItem}
        onDeleteItem={handleDeleteItem}
        selected={selectedItems.some(
          selectedItem => selectedItem.id === item.id,
        )}
      />
    ));
  };

  const totalPrice = selectedItems.reduce((acc, item) => {
    const price =
      item.discount_price !== null ? item.discount_price : item.price;
    return acc + price;
  }, 0);

  const discountedPrice = totalPrice - couponDiscount;

  return (
    <Stack flex={1}>
      <Stack flex={1} space={1}>
        {cartItems.length === 0 ? (
          <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
            <Image
              source={require('../assets/image/cartemptypng.png')}
              alt={'img'}
              h={230}
              w={208}
            />
            <Text fontWeight={600} fontSize={'24'}>
              Your cart is empty
            </Text>
            <Text textAlign={'center'}>
              Looks like you haven’t added anything to your cart yet.
            </Text>
          </Stack>
        ) : (
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            {renderCartItems()}
          </ScrollView>
        )}
      </Stack>

      <Stack
        pb={'10px'}
        w={'full'}
        h={'150'}
        px={'18'}
        bgColor={Colors.secondary[100]}>
        <Pressable onPress={handleClick} disabled={!canCheckout}>
          <HStack
            h={44}
            bgColor={canCheckout ? Colors.neutral[50] : Colors.neutral[200]}
            my={25}
            borderRadius={'10'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={18}>
            {couponDiscount ? (
              <Text>
                You get {`Rp${couponDiscount.toLocaleString('id-ID')}`} promo
              </Text>
            ) : (
              <Text
                color={canCheckout ? Colors.neutral[900] : Colors.neutral[500]}>
                Apply Coupon
              </Text>
            )}
            <Icon name="right" color="black" size={24} />
          </HStack>
        </Pressable>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              <Text fontWeight={'bold'} fontSize={16} color={'white'}>
                {isNaN(discountedPrice)
                  ? `Rp${totalPrice.toLocaleString('id-ID')}`
                  : discountedPrice < 0
                  ? 'Rp0'
                  : `Rp${discountedPrice.toLocaleString('id-ID')}`}
              </Text>
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={canCheckout ? Colors.primary[500] : Colors.primary[900]} // Mengubah warna button sesuai kondisi canCheckout
              onPress={handleCheckout}
              disabled={!canCheckout} // Menonaktifkan button jika tidak dapat melakukan checkout
            >
              <Text
                color={canCheckout ? Colors.neutral[50] : Colors.neutral[200]}>
                Checkout
              </Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CartScreen;
