import React from 'react';
import {Box, Text, Pressable, HStack, Flex, Stack} from 'native-base';
import Colors from '../../theme/colors';

const CategoryButtonsFixed = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  return (
    <Flex flexDirection={'row'}>
      <Stack flex={1}>
        <Pressable onPress={() => handleCategoryPress(null)}>
          <Box
            py={'8px'}
            bg={!selectedCategory ? Colors.primary[500] : Colors.neutral[50]}
            borderWidth={1}
            borderColor={
              !selectedCategory ? Colors.primary[500] : Colors.neutral[200]
            }
            borderRadius={30}>
            <Text
              textAlign={'center'}
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
      </Stack>
      {categories.map((category, index) => (
        <Stack key={index} flex={1}>
          <Pressable onPress={() => handleCategoryPress(category)}>
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
              borderRadius={30}>
              <Text
                textAlign={'center'}
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
        </Stack>
      ))}
    </Flex>
  );
};

export default CategoryButtonsFixed;
