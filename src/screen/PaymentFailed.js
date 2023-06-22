import {Center, Stack, Text} from 'native-base';
import React from 'react';
import {Btn_Primary} from '../components';
import Colors from '../theme/colors';

const PaymentFailed = ({navigation, route}) => {
  const {error} = route.params;
  return (
    <Stack flex={1} bg={Colors.neutral[50]}>
      <Center h={'54px'} bg={Colors.neutral[50]} shadow={1}>
        <Text
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}
          color={Colors.neutral[900]}>
          Payment Failed
        </Text>
      </Center>
      <Stack py={'10px'} px={'18px'} space={'10px'} my={'30px'}>
        <Text
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'20px'}
          lineHeight={'26px'}
          color={Colors.secondary[50]}>
          An error occurred. Please try again later.
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          textAlign={'justify'}
          color={Colors.neutral[900]}>
          Error message: {''}
          <Text color={'red.500'}>{error}</Text>
        </Text>
      </Stack>
      <Btn_Primary
        w={'100%'}
        padding={'18px'}
        text={'Back to Home'}
        pb={'15px'}
        onPress={() => navigation.replace('home')}
      />
    </Stack>
  );
};
export default PaymentFailed;
