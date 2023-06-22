import {Pressable, ScrollView, Text, Flex, Center} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import {API_Course} from '../../controller/API_Course';

const SearchCategory = ({title, onPress, selected, pr, pl}) => (
  <Pressable onPress={onPress} pl={pl} pr={pr}>
    <Center
      bg={selected ? Colors.primary[500] : Colors.neutral[50]}
      h={'34px'}
      px={'20px'}
      py={'8px'}
      borderWidth={selected ? '0' : '1'}
      borderColor={Colors.neutral[300]}
      borderRadius={'30px'}>
      <Text
        fontFamily={'Inter'}
        fontSize={12}
        fontWeight={600}
        color={selected ? Colors.neutral[50] : Colors.neutral[300]}
        textAlign="center">
        {title}
      </Text>
    </Center>
  </Pressable>
);

// const SearchCategory = ({onCategoryChange}) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const {user} = useContext(AuthContext);

//   useEffect(() => {
//     const loadCourses = async () => {
//       if (user.accessToken) {
//         const coursesData = await API_Course(user.accessToken);
//         setCourses(coursesData);
//       }
//     };
//     loadCourses();
//   }, [user.accessToken]);

//   const handleCategoryPress = category => {
//     setSelectedCategory(category);
//     onCategoryChange(category);
//   };

//   return (
//     <Flex flexDirection="row">
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <CategoryButton
//           pl={'18px'}
//           pr={'18px'}
//           title="All"
//           onPress={() => handleCategoryPress(null)}
//           selected={selectedCategory === null}
//         />
//         {courses.map(item => {
//           return (
//             <CategoryButton
//               pr={'12px'}
//               key={item.id}
//               title={item.category.name}
//               onPress={() => handleCategoryPress(item)}
//               selected={selectedCategory && selectedCategory.id === item.id}
//             />
//           );
//         })}
//       </ScrollView>
//     </Flex>
//   );
// };

export default SearchCategory;
