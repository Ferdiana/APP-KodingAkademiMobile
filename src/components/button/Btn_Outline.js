import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Outline = ({onPress, text, padding, w}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const boxBgColor = isPressed ? 'neutral.100' : 'neutral.50';
  const borderColor = isPressed ? 'neutral.200' : 'primary.500';

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
        borderWidth={1}
        p={2}
        borderColor={borderColor}
        justifyContent={'center'}>
        <Text textAlign={'center'} color={'neutral.900'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Outline;
