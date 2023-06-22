import React, {useState} from 'react';
import {Center, Stack, Text} from 'native-base';
import {AllEvent, SearchBar} from '../components';
import Colors from '../theme/colors';

function EventScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack bg={'neutral.50'} flex={1}>
      <Center bg={'secondary.50'} h={'42px'}>
        <Text
          color={'neutral.50'}
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}>
          All Event
        </Text>
      </Center>
      <SearchBar
        pb={'20px'}
        bg={Colors.secondary[50]}
        placeholder={'Search'}
        onChangeText={handleSearchTextChange}
      />
      <AllEvent searchText={searchText} />
    </Stack>
  );
}
export default EventScreen;
