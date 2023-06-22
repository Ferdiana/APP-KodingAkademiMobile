import {Stack, Text} from 'native-base';
import React from 'react';
import {AllArticle, SearchBar} from '../components';
import Colors from '../theme/colors';
import {useState} from 'react';

const ArticleScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack flex={1} bg={Colors.neutral[100]}>
      <SearchBar
        shadow={1}
        bg={Colors.neutral[100]}
        placeholder={'Search'}
        onChangeText={handleSearchTextChange}
      />
      <Text
        py={'10px'}
        px={'18px'}
        fontFamily={'Inter'}
        fontSize={'14px'}
        fontWeight={600}
        color={Colors.neutral[900]}>
        Article
      </Text>
      <AllArticle searchText={searchText} />
    </Stack>
  );
};

export default ArticleScreen;
