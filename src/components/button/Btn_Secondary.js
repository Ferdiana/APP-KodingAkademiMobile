import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Secondary = ({onPress, text, padding, w}) => {
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
      <Box
        bg={boxBgColor}
        h={'46px'}
        borderRadius={8}
        p={2}
        justifyContent={'center'}>
        <Text textAlign={'center'}>{text}</Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Secondary;
