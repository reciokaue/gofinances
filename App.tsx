import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';

import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { Routes } from './src/routes/index.routes';
import { useAuth } from './src/hooks/useAuth';

export default function App() {
  const [ fontsloaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const { isLoading } = useAuth()

  if(!fontsloaded || isLoading){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent"/>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  )
}
