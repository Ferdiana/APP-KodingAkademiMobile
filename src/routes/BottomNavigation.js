/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import CourseScreen from '../screen/CourseScreen';
import ProfileScreen from '../screen/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventScreen from '../screen/EventScreen';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {View} from 'native-base';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

function BottomNavigation({navigation}) {
  const [currentTab, setCurrentTab] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const refreshTab = currentTab => {
      navigation.reset({
        index: 0,
        routes: [{name: currentTab}],
      });
      setRefreshing(false);
    };

    if (refreshing) {
      refreshTab(currentTab);
      setRefreshing(false);
    }
  }, [currentTab, refreshing, navigation]);

  const isTabFocused = useIsFocused();

  useEffect(() => {
    if (isTabFocused) {
      setRefreshing(true);
    }
  }, [isTabFocused]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          height: 54,
          backgroundColor: '#0B2347',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: 700,
          color: '#fff',
        },
        tabBarActiveTintColor: '#0B2347',
        tabBarInactiveTintColor: '#5D7389',
        tabBarStyle: [{display: 'flex'}, null],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="home-variant"
                size={28}
                color={'#0B2347'}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
        listeners={({route}) => ({
          focus: () => {
            setCurrentTab('Home');
          },
        })}
      />
      <Tab.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false,
          title: 'All Course',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="book-open"
                size={28}
                color={'#0B2347'}
              />
            ) : (
              <MaterialCommunityIcons
                name="book-open-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
        listeners={({route}) => ({
          focus: () => {
            setCurrentTab('Course');
          },
        })}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
          title: 'All Event',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="calendar-check"
                size={28}
                color={'#0B2347'}
              />
            ) : (
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
        listeners={({route}) => ({
          focus: () => {
            setCurrentTab('Event');
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="person" size={28} color={'#0B2347'} />
            ) : (
              <MaterialIcons
                name="person-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
        listeners={({route}) => ({
          focus: () => {
            setCurrentTab('Profile');
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
