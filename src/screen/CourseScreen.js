import React, {useContext, useEffect, useState} from 'react';
import {Box, Center, Stack, Text} from 'native-base';
import {AllCourse, CategoryButtons, SearchBar} from '../components';
import Colors from '../theme/colors';
import {API_Course} from '../controller/API_Course';
import {AuthContext} from '../controller/AuthContext';

function CourseScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const {user} = useContext(AuthContext);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        const coursesData = await API_Course(user.accessToken);
        setCourses(coursesData);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const categories = [...new Set(courses.map(course => course.category.name))];

  const filteredCourses = selectedCategory
    ? courses.filter(
        course =>
          course.category.name === selectedCategory && !course.discount_price,
      )
    : courses.filter(course => !course.discount_price);

  return (
    <Stack flex={1} bg={'neutral.50'}>
      <Center bg={'secondary.50'} h={'42px'}>
        <Text
          color={'neutral.50'}
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}>
          All Course
        </Text>
      </Center>
      <SearchBar
        pb={'20px'}
        bg={Colors.secondary[50]}
        placeholder={'Search'}
        onChangeText={handleSearchTextChange}
      />
      <Stack mt={'10px'}>
        <CategoryButtons
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>
      <Box my={'5px'} />
      {filteredCourses.length === 0 ? (
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Text>No courses available.</Text>
        </Stack>
      ) : (
        <AllCourse
          searchText={searchText}
          selectedCategory={selectedCategory}
        />
      )}
    </Stack>
  );
}
export default CourseScreen;
