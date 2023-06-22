import React, {useEffect} from 'react';
import {Text, Alert, IconButton, HStack, CloseIcon, VStack} from 'native-base';

export default function Alertt({handleAlertClose}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAlertClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleAlertClose]);

  return (
    <Alert
      onClose={handleAlertClose}
      variant={'solid'}
      colorScheme="success"
      status="success"
      position="absolute"
      top={0}
      borderRadius={'10'}
      zIndex={1}
      w="100%">
      <VStack space={2} w={'100%'}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <HStack space={2} alignItems="center">
            <Alert.Icon />
            <Text color={'white'}>Selection successfully moved!</Text>
          </HStack>
          <IconButton
            alignSelf={'flex-end'}
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'white',
            }}
            onPress={handleAlertClose}
          />
        </HStack>
      </VStack>
    </Alert>
  );
}
