import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../controller/AuthContext';
import {API_Course} from '../../controller/API_Course';
import HTMLContentView from 'react-native-htmlview';
import {StyleSheet} from 'react-native';

const AllCourse = ({searchText, selectedCategory}) => {
  const [courses, setCourses] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_Course(user.accessToken);
        setCourses(response);
        setIsLoading(false);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const filteredData = courses.filter(
    item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedCategory === null || item.category.name === selectedCategory),
  );

  const renderItem = ({item}) => {
    if (item.discount_price) {
      return null;
    }
    return (
      <Pressable px={'18px'} onPress={() => handlePress(item.id)} my={'5px'}>
        <Stack
          shadow={1}
          bg={Colors.neutral[50]}
          borderColor={Colors.neutral[300]}
          w={'100%'}
          p={'8px'}
          borderRadius={10}
          mr={2}>
          <HStack h={'103px'} space={'5px'}>
            <Image
              source={{uri: `${item.img_url}`}}
              alt={'img'}
              w={'30%'}
              h={'100%'}
              resizeMode="center"
              borderRadius={10}
            />
            <Stack w={'70%'} justifyContent={'space-between'}>
              <Text
                numberOfLines={1}
                letterSpacing={'0.5px'}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Stack h={'54px'} overflow={'hidden'}>
                <HTMLContentView value={item.description} stylesheet={styles} />
              </Stack>
              <HStack justifyContent={'space-between'}>
                <Text
                  fontFamily={'Inter'}
                  letterSpacing={'0.5px'}
                  fontSize={'14px'}
                  fontWeight={500}
                  color={Colors.neutral[900]}>
                  {`Rp${item.price.toLocaleString('id-ID')}`}
                </Text>
              </HStack>
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
      <Stack justifyContent="center" alignItems="center">
        <Image
          source={require('../../assets/image/NoResults.png')}
          alt={'img'}
          h={230}
          w={208}
        />
        <Text textAlign={'center'} fontFamily={'Inter'} fontWeight={600}>
          No Result
        </Text>
        <Text fontFamily={'Inter'} textAlign={'center'} px={10}>
          Sorry, there are no results for this search. Please try another
          phrase..
        </Text>
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

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    color: '#000',
  },
  body: {
    textAlign: 'justify',
    color: '#000',
  },
});

export default AllCourse;
