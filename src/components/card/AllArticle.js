import React, {useContext, useEffect} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {useState} from 'react';
import {AuthContext} from '../../controller/AuthContext';
import {API_Article} from '../../controller/API_Article';
import HTMLContentView from 'react-native-htmlview';
import formatDate from '../../controller/formatDate';

const AllArticle = ({searchText}) => {
  const [article, setArticle] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const articleData = await API_Article(user.accessToken);
        setArticle(articleData);
      }
      setIsLoading(false);
    };
    loadArticle();
  }, [user.accessToken]);

  const handleArticlePress = id => {
    navigation.navigate('ArticleDetail', {id});
  };

  const filteredData = article.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const formattedDate = formatDate(item.createdAt);
    return (
      <Pressable
        onPress={() => handleArticlePress(item.id)}
        my={'5px'}
        mx={'18px'}>
        <Stack
          w={'100%'}
          borderRadius={8}
          p={'8px'}
          space={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.img_url}`}}
                alt="image_item"
              />
            </Box>
            <Stack pr={'8px'} w={'60%'} justifyContent={'space-evenly'}>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.title}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                {formattedDate}
              </Text>
              <Stack h={'32px'} overflow={'hidden'}>
                <HTMLContentView
                  numberOfLines={2}
                  value={item.content}
                  stylesheet={{
                    p: {
                      textAlign: 'justify',
                      fontSize: 12,
                      lineHeight: 16,
                    },
                  }}
                />
              </Stack>
            </Stack>
          </HStack>
        </Stack>
      </Pressable>
    );
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

  if (filteredData.length === 0) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Text>No article available.</Text>
      </Stack>
    );
  }

  return (
    <FlatList
      data={filteredData}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default AllArticle;
