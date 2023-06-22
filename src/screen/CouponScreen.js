import React, {useState, useContext, useEffect} from 'react';
import {
  Center,
  Text,
  Stack,
  ScrollView,
  HStack,
  Button,
  Checkbox,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import API_Coupon from '../controller/API_Coupon';
import formatDate from '../controller/formatDate';

const CouponScreen = ({route}) => {
  const {selectedItems, totalPrice, numSelectedItems} = route.params;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [coupon, setCoupon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCoupon = async () => {
      if (user.accessToken && selectedItems.length > 0) {
        setIsLoading(true);
        const productIds = selectedItems.map(item => item.id);
        const response = await API_Coupon(user.accessToken, productIds);
        setCoupon(response);
      }
      setIsLoading(false);
    };
    loadCoupon();
  }, [user.accessToken, selectedItems]);

  const handleApplyCoupon = () => {
    const appliedCoupon = coupon.find(item => item.id === selectedCoupon);
    const appliedCouponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const updatedDiscountedPrice = totalPrice - appliedCouponDiscount;
    const updatedSelectedItems = selectedItems.map(item =>
      item.selected ? {...item, selected: true} : item,
    );
    navigation.navigate('Cart', {
      selectedCoupon,
      selectedItems: updatedSelectedItems,
      couponDiscount: appliedCouponDiscount,
      totalPrice: totalPrice,
      numSelectedItems: numSelectedItems,
      discountedPrice: updatedDiscountedPrice < 0 ? 0 : updatedDiscountedPrice,
    });
    setSelectedCoupon(appliedCoupon ? appliedCoupon.id : null);
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
    <Stack flex={1} bg={Colors.neutral[50]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack flex={1} bgColor={'white'} px={'19'}>
          <Text fontWeight={'bold'} fontSize={20}>
            Choose an available coupon
          </Text>
          <Text fontWeight={'normal'} fontSize={16}>
            You can use the coupons available to save on your shopping!
          </Text>
          {coupon.length > 0 ? (
            coupon.map(item => {
              if (item.id !== 0) {
                const formattedDate = formatDate(item.coupon_end);
                return (
                  <Stack bgColor={'white'} key={item.id}>
                    <HStack py={'15px'}>
                      <Center>
                        <Checkbox
                          accessibilityLabel="This is a dummy checkbox"
                          colorScheme="primary"
                          mr={15}
                          isChecked={selectedCoupon === item.id}
                          onChange={isChecked => {
                            setSelectedCoupon(isChecked ? item.id : null);
                          }}
                        />
                      </Center>
                      <Center
                        borderRadius={8}
                        borderWidth={1}
                        w={'90%'}
                        h={'57px'}
                        borderColor={
                          selectedCoupon === item.id
                            ? Colors.primary[500]
                            : 'gray.200'
                        }>
                        <Stack w={'full'} px={'18px'}>
                          <Text>
                            {`Rp${item.discount.toLocaleString('id-ID')}`}{' '}
                            discount
                          </Text>
                          <Text>Ends in {formattedDate}</Text>
                        </Stack>
                      </Center>
                    </HStack>
                  </Stack>
                );
              }
              return null;
            })
          ) : (
            <Center flex={1} mt={'20px'}>
              <Text>No Coupons Available</Text>
            </Center>
          )}
        </Stack>
      </ScrollView>
      <Stack
        justifyContent={'flex-end'}
        py={'20px'}
        w={'full'}
        px={'18px'}
        bgColor={Colors.secondary[100]}>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total Discount
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              <Text>
                Rp
                {selectedCoupon !== null
                  ? coupon
                      .find(item => item.id === selectedCoupon)
                      ?.discount.toLocaleString('id-ID')
                  : '0'}
              </Text>
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={handleApplyCoupon}>
              <Text color={'white'}>Apply</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CouponScreen;
