import React, {useContext, useState, useEffect} from 'react';
import {Box, Center, Flex, Image, Pressable, Stack, Text} from 'native-base';
import Colors from '../../theme/colors';
import {StackActions, useNavigation} from '@react-navigation/native';
import {API_MyCourse} from '../../controller/API_MyCourse';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';
const MyCourse = ({mr}) => {
  const [myCourse, setMyCourse] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        const response = await API_MyCourse(user.accessToken);
        const sortedCourses = response.sort((a, b) => {
          const dateA = new Date(a.expired_date);
          const dateB = new Date(b.expired_date);
          return dateB - dateA;
        });
        setMyCourse(sortedCourses);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const isExpired = date => {
    const currentDate = new Date();
    const expiredDate = new Date(date);
    return expiredDate < currentDate;
  };

  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {myCourse && myCourse.length > 0 ? (
        myCourse.map(item => {
          const formattedDate = formatDate(item.expired_date);
          const expired = isExpired(item.expired_date);
          return (
            <Pressable key={item.id} onPress={() => handlePress(item.id)}>
              <Stack>
                <Box
                  key={item.id}
                  w={'140px'}
                  h={'170px'}
                  px={'10px'}
                  pt={'5px'}
                  mr={2}
                  opacity={expired ? 0.5 : 1}
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
                    {item.name}
                  </Text>
                  <Text
                    mt={'5px'}
                    fontFamily={'Inter'}
                    fontWeight={300}
                    fontSize={'10px'}
                    color={Colors.neutral[900]}>
                    Until {formattedDate}
                  </Text>
                </Box>
              </Stack>
            </Pressable>
          );
        })
      ) : (
        <Center
          w={'140px'}
          h={'170px'}
          mr={2}
          bg={Colors.neutral[50]}
          borderRadius={8}
          shadow={1}>
          <Text
            fontFamily={'Inter'}
            fontSize={'16px'}
            fontWeight={400}
            color={Colors.neutral[900]}>
            No Courses Available
          </Text>
        </Center>
      )}
    </Flex>
  );
};

export default MyCourse;
