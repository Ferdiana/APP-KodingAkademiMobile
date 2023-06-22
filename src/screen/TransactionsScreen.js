import React from 'react';
import {useState} from 'react';
import {Button, Pressable, Stack, Text} from 'native-base';
import Colors from '../theme/colors';
import {CategoryButtons, SearchBar, Transaction} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  const handleRefresh = () => {
    setRefresh(true);
  };
  const handleTransactionRefresh = () => {
    setRefresh(false);
  };
  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <Stack
        px={'18px'}
        bg={'white'}
        h={'54px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Pressable
          h={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={() => navigation.navigate('home', {screen: 'Profile'})}>
          <Icon name="ios-arrow-back" size={24} color={Colors.neutral[700]} />
        </Pressable>
        <Text
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}
          color={Colors.neutral[900]}>
          Transaction
        </Text>
        <Pressable
          h={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={handleRefresh}>
          <Icon name="md-refresh" size={24} color={Colors.neutral[700]} />
        </Pressable>
      </Stack>
      <Stack my={2}>
        <SearchBar
          onChangeText={handleSearchTextChange}
          placeholder={'Search transaction...'}
        />
      </Stack>
      <Stack my={2}>
        <CategoryButtons
          categories={['Success', 'Pending', 'Canceled']}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>
      <Transaction
        navigation={navigation}
        searchText={searchText}
        selectedCategory={selectedCategory}
        refresh={refresh}
        onRefresh={handleTransactionRefresh}
      />
    </Stack>
  );
};

export default TransactionScreen;
