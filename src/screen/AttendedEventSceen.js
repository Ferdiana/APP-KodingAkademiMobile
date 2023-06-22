import {Stack} from 'native-base';
import React, {useState} from 'react';
import {AllMyEvent, CategoryButtonsFixed, SearchBar} from '../components';
import Colors from '../theme/colors';

const AttendedEventSceen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack space={'12px'} flex={1} bg={Colors.neutral[50]}>
      <SearchBar
        shadow={1}
        placeholder={'Search my course...'}
        onChangeText={handleSearchTextChange}
      />
      <Stack px={'18px'}>
        <CategoryButtonsFixed
          categories={['Upcoming', 'Finished']}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>
      <AllMyEvent searchText={searchText} selectedCategory={selectedCategory} />
    </Stack>
  );
};
export default AttendedEventSceen;
