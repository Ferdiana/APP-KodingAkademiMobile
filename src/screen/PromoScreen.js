import React, {useEffect, useContext, useState} from 'react';
import {
  FlatList,
  Box,
  Text,
  Image,
  Stack,
  Pressable,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../controller/AuthContext';
import {API_Promo} from '../controller/API_Promo';
import Colors from '../theme/colors';

const AllPromo = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const coursesData = await API_Promo(user.accessToken);
        setCourses(coursesData);
        setIsLoading(false);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const renderItem = ({item}) => {
    if (!item.discount_price) {
      return null;
    }
    return (
      <Pressable p={'4px'} w={'50%'} onPress={() => handlePress(item.id)}>
        <Stack
          bgColor={'white'}
          p={2}
          borderRadius={8}
          borderColor={Colors.primary[600]}
          shadow={1}>
          <Image
            source={{uri: item.img_url}}
            w={'full'}
            h={100}
            alt={'image'}
            borderRadius={10}
          />
          <Box>
            <Box>
              <Text
                mb={'2px'}
                numberOfLines={2}
                py={'4px'}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                h={'50px'}
                color={Colors.primary[600]}>
                {item.name}
              </Text>
            </Box>
            <Text
              fontFamily={'Inter'}
              color={Colors.neutral[900]}
              fontWeight={500}>
              {`Rp${item.discount_price.toLocaleString('id-ID')}`}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontWeight={400}
              textDecorationLine={'line-through'}
              color={Colors.neutral[200]}>
              {`Rp${item.price.toLocaleString('id-ID')}`}
            </Text>
          </Box>
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

  return (
    <FlatList
      background={Colors.neutral[50]}
      numColumns={2}
      px={'14px'}
      showsVerticalScrollIndicator={false}
      data={courses}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default AllPromo;
