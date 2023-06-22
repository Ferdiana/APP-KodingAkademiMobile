import {extendTheme} from 'native-base';

export const customTheme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Thin',
      },
      200: {
        normal: 'Inter-ExtraLight',
      },
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
      },
    },
  },
  fonts: {
    Inter: 'Inter',
  },

  colors: {
    primary: {
      50: '#FCD583',
      100: '#FBCF6F',
      200: '#FBC656',
      300: '#FABE3D',
      400: '#FAB624',
      500: '#F9AD0A',
      600: '#E59E06',
      700: '#CC8D05',
      800: '#B37C04',
      900: '#9A6A04',
    },
    secondary: {
      50: '#1D5BB9',
      100: '#174A96',
      200: '#154389',
      300: '#123973',
      400: '#0E2E5D',
      500: '#0B2347',
      600: '#091C39',
      700: '#061428',
      800: '#051123',
      900: '#040D1A',
    },
    neutral: {
      50: '#FFFFFF',
      100: '#E1E6EA',
      200: '#C2CCD6',
      300: '#94A6B7',
      400: '#768CA2',
      500: '#5D7389',
      600: '#48596B',
      700: '#33404C',
      800: '#1F262E',
      900: '#191F25',
    },
  },
});
