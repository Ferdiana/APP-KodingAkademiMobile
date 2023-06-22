import {Center, Image, ScrollView, Spinner, Stack, Text} from 'native-base';
import React from 'react';
import Colors from '../theme/colors';
import {useState} from 'react';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
import HTMLContentView from 'react-native-htmlview';
import formatDate from '../controller/formatDate';
import {API_ArticleDetail} from '../controller/API_Article';
import {StyleSheet} from 'react-native';

const ArticleDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [ArticleDetail, setArticleDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {id} = route.params;
    const loadArticleDetail = async () => {
      const response = await API_ArticleDetail(id, user.accessToken);
      setIsLoading(true);
      if (response) {
        setArticleDetail(response);
        setIsLoading(false);
      }
    };

    loadArticleDetail();
  }, [route.params, user.accessToken]);

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

  const formattedDate = formatDate(ArticleDetail.createdAt);

  return (
    <Stack flex={1} bg={Colors.neutral[50]} px={'18px'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'100%'} h={'324px'} my={'10px'}>
          <Image
            borderRadius={8}
            h={'100%'}
            w={'100%'}
            source={{uri: `${ArticleDetail.img_url}`}}
            alt="img_ArticleDetail"
          />
        </Center>
        <Stack space={'6px'}>
          <Text
            fontFamily={'Inter'}
            fontSize={'20px'}
            fontWeight={600}
            color={Colors.secondary[50]}>
            {ArticleDetail.title}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={500}>
            {formattedDate}
          </Text>
          <HTMLContentView
            numberOfLines={2}
            value={ArticleDetail.content}
            stylesheet={styles}
          />
        </Stack>
      </ScrollView>
    </Stack>
  );
};

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    lineHeight: 18,
  },
  ul: {
    textAlign: 'justify',
  },
  li: {
    textAlign: 'justify',
  },
});

export default ArticleDetailScreen;
