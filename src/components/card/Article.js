import React from 'react';
import {Box, Center, Flex, Image, Pressable, Text} from 'native-base';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {API_ArticleLimit} from '../../controller/API_Article';
import {useState} from 'react';
import {AuthContext} from '../../controller/AuthContext';
import {useContext} from 'react';
import formatDate from '../../controller/formatDate';

const Article = ({mr}) => {
  const [article, setArticle] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadArticle = async () => {
      if (user.accessToken) {
        const articleData = await API_ArticleLimit(user.accessToken);
        setArticle(articleData);
      }
    };
    loadArticle();
  }, [user.accessToken]);

  const handleArticlePress = id => {
    navigation.navigate('ArticleDetail', {id});
  };

  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {article.map(item => {
        const formattedDate = formatDate(item.createdAt);
        return (
          <Pressable key={item.id} onPress={() => handleArticlePress(item.id)}>
            <Box
              w={'140px'}
              h={'170px'}
              px={'10px'}
              pt={'5px'}
              mr={2}
              bg={Colors.neutral[50]}
              borderRadius={8}
              shadow={1}>
              <Center>
                <Image
                  source={{uri: `${item.img_url}`}}
                  alt={'img'}
                  w={'100%'}
                  h={'84px'}
                  borderRadius={8}
                />
              </Center>
              <Text
                numberOfLines={2}
                mt={'5px'}
                h={'38px'}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.title}
              </Text>
              <Text
                mt={'5px'}
                fontFamily={'Inter'}
                fontWeight={300}
                fontSize={'10px'}
                color={Colors.neutral[900]}>
                {formattedDate}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Flex>
  );
};

export default Article;
