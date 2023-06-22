import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import Routes from './src/routes/Routes';
import {customTheme} from './src/theme';
import {AuthProvider} from './src/controller/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={customTheme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
