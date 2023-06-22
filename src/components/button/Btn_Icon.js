import {Avatar, HStack, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Icon = ({onPress, text, padding, source, size, w, borderWidth}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const boxBgColor = isPressed ? 'neutral.200' : 'neutral.50';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      w={w}
      px={padding}>
      <HStack
        h={'46px'}
        borderWidth={borderWidth}
        borderColor={'primary.900'}
        bg={boxBgColor}
        borderRadius={10}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}
        p={2}>
        <Avatar source={source} size={size} bg={'transparent'} />
        <Text>{text}</Text>
      </HStack>
    </Pressable>
  );
};

export default Btn_Icon;
