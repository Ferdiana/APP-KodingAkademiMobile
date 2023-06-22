import React from 'react';
import {ScrollView} from 'react-native';
import {Box, Text, Pressable, HStack} from 'native-base';
import Colors from '../../theme/colors';

const CategoryButtons = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Pressable onPress={() => handleCategoryPress(null)}>
        <Box
          ml={'18px'}
          py={'8px'}
          px={'20px'}
          bg={!selectedCategory ? Colors.primary[500] : Colors.neutral[50]}
          borderWidth={1}
          borderColor={
            !selectedCategory ? Colors.primary[500] : Colors.neutral[200]
          }
          borderRadius={30}>
          <Text
            fontFamily={'Inter'}
            fontSize={'12px'}
            fontWeight={400}
            color={
              !selectedCategory ? Colors.neutral[900] : Colors.neutral[200]
            }>
            All
          </Text>
        </Box>
      </Pressable>
      <HStack mr={'18px'}>
        {categories.map((category, index) => (
          <Pressable key={index} onPress={() => handleCategoryPress(category)}>
            <Box
              ml={'10px'}
              py={'8px'}
              borderWidth={1}
              borderColor={
                category === selectedCategory
                  ? Colors.primary[500]
                  : Colors.neutral[200]
              }
              bg={
                category === selectedCategory
                  ? Colors.primary[500]
                  : Colors.neutral[50]
              }
              borderRadius={30}
              px={'20px'}>
              <Text
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={400}
                color={
                  category === selectedCategory
                    ? Colors.neutral[900]
                    : Colors.neutral[200]
                }>
                {category}
              </Text>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
};

export default CategoryButtons;
