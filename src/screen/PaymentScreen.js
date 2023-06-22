import {Center, Stack, Text} from 'native-base';
import React from 'react';
import {Btn_Outline, Btn_Primary} from '../components';
import Colors from '../theme/colors';

const PaymentScreen = ({navigation}) => {
  return (
    <Stack flex={1} bg={Colors.neutral[50]}>
      <Center h={'54px'} bg={Colors.neutral[50]} shadow={1}>
        <Text
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}
          color={Colors.neutral[900]}>
          Complete Payment
        </Text>
      </Center>
      <Stack py={'10px'} px={'18px'} space={'10px'} my={'30px'}>
        <Text
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'20px'}
          lineHeight={'26px'}
          color={Colors.secondary[50]}>
          You will be redirected to the Xendit Payment Page.
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          textAlign={'justify'}
          color={Colors.neutral[900]}>
          Thank you for choosing Koding Akademi as your learning partner. Your
          payment will continue on the Xendit payment page.
        </Text>
      </Stack>
      <Btn_Primary
        padding={'18px'}
        text={'Check Payment Status'}
        pb={'15px'}
        onPress={() => navigation.replace('Transactions')}
      />
      <Btn_Outline
        padding={'18px'}
        text={'Back to Home'}
        onPress={() => navigation.replace('home')}
      />
    </Stack>
  );
};
export default PaymentScreen;
