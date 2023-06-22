import React, {useContext, useEffect, useState} from 'react';
import {Box, Center, Flex, Image, Pressable, Text} from 'native-base';
import Colors from '../../theme/colors';
import {API_PromoLimit} from '../../controller/API_Promo';
import {AuthContext} from '../../controller/AuthContext';
import {useNavigation} from '@react-navigation/native';

const Promo = ({mr}) => {
  const [courses, setCourses] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        const coursesData = await API_PromoLimit(user.accessToken);
        setCourses(coursesData);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };
  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {courses.map(item => {
        return (
          <Pressable key={item.id} onPress={() => handlePress(item.id)}>
            <Box
              w={'140px'}
              h={'170px'}
              bg={Colors.neutral[50]}
              shadow={1}
              borderRadius={8}
              px={'10px'}
              py={'5px'}
              mr={'10px'}>
              <Center>
                <Image
                  source={{uri: `${item.img_url}`}}
                  alt={'img'}
                  w={'100%'}
                  h={'80px'}
                  borderRadius={8}
                />
              </Center>
              <Text
                numberOfLines={2}
                mt={'5px'}
                h={'38px'}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={'600'}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Text
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                {`Rp${item.discount_price.toLocaleString('id-ID')}`}
              </Text>
              <Text
                fontFamily={'Inter'}
                fontSize={'10px'}
                fontWeight={500}
                color={'neutral.200'}
                strikeThrough>
                {`Rp${item.price.toLocaleString('id-ID')}`}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Flex>
  );
};

export default Promo;
