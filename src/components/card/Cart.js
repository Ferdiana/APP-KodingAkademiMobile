import React from 'react';
import {Stack, HStack, Text, Checkbox, Image, Pressable} from 'native-base';
import Colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatDate from '../../controller/formatDate';

const CartCard = ({
  item,
  onSelectItem,
  onDeleteItem,
  hideCheckboxAndIcon,
  selected,
  WImage,
  WText,
  onPress,
}) => {
  const formattedDate = formatDate(item.selected_date);

  return (
    <Stack bg={Colors.neutral[50]} px={'18px'}>
      <HStack py={'15px'} space={'15px'} alignItems={'center'}>
        {!hideCheckboxAndIcon && (
          <Checkbox
            value="test"
            isChecked={selected}
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="primary"
            onChange={() => onSelectItem(item)}
          />
        )}
        <Image
          source={{uri: item.img_url}}
          w={WImage}
          h={'80px'}
          alt={'image'}
          borderRadius={10}
        />
        <Stack
          w={WText}
          h={'80px'}
          space={'4px'}
          justifyContent={'space-between'}>
          <Text
            numberOfLines={2}
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'12px'}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            fontFamily={'Inter'}
            fontWeight={400}
            color={Colors.neutral[700]}
            fontSize={'12px'}>
            {item.selected_date !== null && (
              <>
                Date: <Text>{formattedDate}</Text>
              </>
            )}
          </Text>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Stack>
              {item.discount_price !== null ? (
                <Text
                  fontFamily={'Inter'}
                  fontWeight={500}
                  fontSize={'12px'}
                  color={Colors.neutral[900]}>
                  {`Rp${item.discount_price.toLocaleString('id-ID')}`}
                </Text>
              ) : (
                <Text
                  fontFamily={'Inter'}
                  fontWeight={500}
                  fontSize={'12px'}
                  color={Colors.neutral[900]}>
                  {`Rp${item.price.toLocaleString('id-ID')}`}
                </Text>
              )}
            </Stack>
            {!hideCheckboxAndIcon && (
              <Pressable pr={'8px'} onPress={() => onDeleteItem(item.id)}>
                <Icon name="delete" size={28} color={'red'} />
              </Pressable>
            )}
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default CartCard;
