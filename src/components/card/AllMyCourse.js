import React, {useState, useContext, useEffect} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  Pressable,
} from 'native-base';
import Colors from '../../theme/colors';
import {API_MyCourse} from '../../controller/API_MyCourse';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';

const AllMyCourse = ({searchText, selectedCategory}) => {
  const [myCourse, setMyCourse] = useState([]);
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_MyCourse(user.accessToken);
        const sortedDataa = response.sort(
          (a, b) => new Date(b.expired_date) - new Date(a.expired_date),
        );
        setMyCourse(sortedDataa);
        setIsLoading(false);
      }
    };

    loadMyCourse();
  }, [user.accessToken]);

  console.log(myCourse);

  const filteredData = myCourse.filter(
    item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedCategory === null ||
        item.status.toLowerCase() === selectedCategory.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const formattedDate = formatDate(item.expired_date);
    return (
      <Pressable>
        <Stack my={'5px'} mx={'18px'}>
          <Stack
            w={'100%'}
            borderRadius={8}
            p={'8px'}
            shadow={1}
            bg={Colors.neutral[50]}>
            <HStack h={'103px'} space={'8px'}>
              <Box w={'40%'}>
                <Image
                  borderRadius={8}
                  h={'100%'}
                  w={'100%'}
                  source={{uri: `${item.img_url}`}}
                  alt="image_article"
                />
              </Box>
              <Stack pr={'8px'} w={'60%'} justifyContent={'space-between'}>
                <Text
                  numberOfLines={2}
                  fontFamily={'Inter'}
                  fontSize={'14px'}
                  fontWeight={600}
                  color={Colors.neutral[900]}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={500}
                  color={Colors.neutral[900]}>
                  Until {''}
                  {formattedDate}
                </Text>
                <Text
                  numberOfLines={1}
                  fontFamily={'Inter'}
                  fontSize={'10px'}
                  fontWeight={400}
                  color={Colors.neutral[700]}>
                  Meeting Quota: {''}
                  {item.meeting_quota}
                </Text>
                <Text
                  color={Colors.primary[500]}
                  textTransform={'capitalize'}
                  fontFamily={'Inter'}
                  fontSize={'14px'}
                  fontWeight={600}>
                  {item.status}
                </Text>
              </Stack>
            </HStack>
          </Stack>
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
        <Text>No courses available.</Text>
      </Stack>
    );
  }

  return (
    <Stack flex={1}>
      {filteredData.length === 0 ? (
        <Stack mt={'40px'} justifyContent={'center'} alignItems={'center'}>
          <Image
            source={require('../../assets/image/emptymycourse.png')}
            alt={'img'}
            h={230}
            w={208}
          />
          <Text fontWeight={'bold'} fontSize={'24'}>
            No Course
          </Text>
          <Text textAlign={'center'}>
            You haven't taken any courses. Let's take the course you want now.
          </Text>
        </Stack>
      ) : (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Stack>
  );
};

export default AllMyCourse;
