import React, {useContext, useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../../controller/AuthContext';
import {} from 'react';
import {API_Profile} from '../../controller/API_Profile';

const QRComponent = ({size}) => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      if (user.accessToken) {
        const response = await API_Profile(user.accessToken);
        setProfile(response);
      }
    };
    loadProfile();
  }, [user.accessToken]);

  return (
    <QRCode
      value={profile.qr_code}
      size={size}
      color="black"
      backgroundColor="white"
    />
  );
};

export default QRComponent;
