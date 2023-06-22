import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/OnBoardingScreen';
import BottomNavigation from './BottomNavigation';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ArticleScreen from '../screen/ArticleScreen';
import ForgotPassScreen from '../screen/ForgotPassScreen';
import QRDetailScreen from '../screen/QRDetailScreen';
import AccountScreen from '../screen/AccountScreen';
import CartScreen from '../screen/CartSreen';
import MyCourseScreen from '../screen/MyCourseScreen';
import TransactionsScreen from '../screen/TransactionsScreen';
import CourseDetailScreen from '../screen/CourseDetailScreen';
import {AuthContext} from '../controller/AuthContext';
import CouponScreen from '../screen/CouponScreen';
import CheckoutScreen from '../screen/CheckoutScreen';
import Colors from '../theme/colors';
import ArticleDetailScreen from '../screen/ArticleDetailScreen';
import PaymentScreen from '../screen/PaymentScreen';
import EventDetailScreen from '../screen/EventDetail';
import TransactionDetailScreen from '../screen/TransactionsDetailScreen';
import AttendedEventScreen from '../screen/AttendedEventSceen';
import EditProfileScreen from '../screen/EditProfileScreen';
import PaymentFailed from '../screen/PaymentFailed';
import PromoScreen from '../screen/PromoScreen';

const Stack = createNativeStackNavigator();

function Routes() {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          height: 54,
          backgroundColor: Colors.neutral[50],
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: '700',
          color: '#191F25',
        },
      }}>
      {user ? (
        <Stack.Screen
          name="home"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: 'All Article',
          headerStyle: {backgroundColor: Colors.neutral[100]},
        }}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPassScreen}
        options={{
          title: 'Forgot Password',
        }}
      />
      <Stack.Screen
        name="QRDetail"
        component={QRDetailScreen}
        options={{title: 'QR Code'}}
      />
      <Stack.Screen name="Account" component={AccountScreen} options={{}} />
      <Stack.Screen
        name="MyCourse"
        component={MyCourseScreen}
        options={{title: 'My Courses '}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Cart'}}
      />
      <Stack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{title: 'Transactions', headerShown: false}}
      />
      <Stack.Screen
        name="DetailTransactions"
        component={TransactionDetailScreen}
        options={{title: 'Detail Transactions'}}
      />

      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          title: 'Course Detail',
        }}
      />
      <Stack.Screen
        name="Coupon"
        component={CouponScreen}
        options={{title: 'Coupon Detail'}}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{}} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{title: 'Article Detail'}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{title: 'Complete Payment', headerShown: false}}
      />
      <Stack.Screen
        name="PaymentFailed"
        component={PaymentFailed}
        options={{title: 'Payment Failed', headerShown: false}}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          title: 'Event Detail',
        }}
      />
      <Stack.Screen
        name="AttendedEvent"
        component={AttendedEventScreen}
        options={{
          title: 'Attended Event',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="Promo"
        component={PromoScreen}
        options={{
          title: 'All Promo',
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
