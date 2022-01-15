import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { AuthRoutes } from './auth.routes';

export function Routes(){
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user.id? <AppRoutes/>: <AuthRoutes/>}
   </NavigationContainer>
  );
}