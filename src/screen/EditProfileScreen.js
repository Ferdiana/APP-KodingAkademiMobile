import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Pressable,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import {AlertDialogg, Btn_Primary} from '../components';
import Colors from '../theme/colors';
import {API_EditProfile, API_Profile} from '../controller/API_Profile';
import formatDate from '../controller/formatDate';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Form = ({label, placeholder, onChangeText, value, isDisabled}) => {
  const handleTextChange = text => {
    if (!isDisabled) {
      onChangeText(text);
    }
  };
  return (
    <Stack space={1}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        bgColor={'transparent'}
        borderColor={'neutral.100'}
        focusOutlineColor={'primary.500'}
        borderRadius={8}
        variant={'outline'}
        p={2}
        h={'44px'}
        value={value}
        onChangeText={handleTextChange}
        placeholder={value ? '' : placeholder}
      />
    </Stack>
  );
};

const EditProfileScreen = () => {
  const {user} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [phone_number, setPhone_Number] = useState(null);
  const [address, setAddress] = useState(null);
  const [birth_date, setBirth_Date] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setBirth_Date(formatDate(currentDate));
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_Profile(user.accessToken);
        setEmail(response.email);
        setFull_Name(response.full_name);
        setPhone_Number(response.phone_number);
        setAddress(response.address);
        setBirth_Date(formatDate(response.birth_date));
      }
      setIsLoading(false);
    };
    loadProfile();
  }, [user.accessToken]);

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

  const SaveEdit = async () => {
    const response = await API_EditProfile(
      user.accessToken,
      full_name,
      phone_number,
      address,
      birth_date,
    );
    console.log(response);
    navigation.navigate('Account', {shouldRefresh: true});
  };

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <FormControl>
        <Stack space={2} px={'18px'}>
          <FormControl.Label>Email</FormControl.Label>
          <HStack
            mt={-1}
            borderWidth={1}
            borderColor={Colors.neutral[100]}
            p={2}
            alignItems={'center'}
            bg={Colors.neutral[50]}
            h={'44px'}
            borderRadius={'8px'}>
            <Text fontSize={'12px'} fontFamily={'Inter'} fontWeight={400}>
              {email}
            </Text>
          </HStack>
          <Form
            label={'Full Name'}
            value={full_name}
            onChangeText={setFull_Name}
          />
          <Form
            label={'Phone Number'}
            value={phone_number}
            onChangeText={setPhone_Number}
          />
          <Form
            label={'Address'}
            value={address}
            onChangeText={setAddress}
            placeholder={'Input your address'}
          />
          <FormControl.Label>Birth Date</FormControl.Label>
          <Pressable onPress={showDatepicker}>
            <HStack
              mt={-1}
              borderWidth={1}
              borderColor={Colors.neutral[100]}
              p={2}
              alignItems={'center'}
              bg={Colors.neutral[50]}
              h={'44px'}
              borderRadius={'8px'}>
              <Text fontSize={'12px'} fontFamily={'Inter'} fontWeight={400}>
                {birth_date}
              </Text>
            </HStack>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              locale="en-US"
              display="default"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </Stack>
        <Stack mt={'40px'}>
          <Btn_Primary
            text={'Save'}
            padding={'18px'}
            onPress={() => setShowAlert(true)}
          />
          {showAlert && (
            <AlertDialogg
              textCencel={'No'}
              textOk={'Yes'}
              alertText={'Are you sure you want to save these changes?'}
              displayTwoButtons={true}
              handleAlertClose={() => setShowAlert(false)}
              onPress={SaveEdit}
            />
          )}
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default EditProfileScreen;
