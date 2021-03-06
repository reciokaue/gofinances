import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

interface CategoryProps{
  isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
export const Header = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113 - getStatusBarHeight())}px;
  
  align-items: center;
  justify-content: flex-end;
  padding-bottom:  ${RFValue(19)}px;
  ` 
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`
export const Category = styled(RectButton).attrs({
  rippleColor: 'rgba(255, 135, 44, 0.3)',
})<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  background: ${({theme, isActive}) => 
    isActive? theme.colors.secondary_light: theme.colors.background
  };

  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  margin-right:  ${RFValue(16)}px;
`;
export const Name = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
export const Separator = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: ${({theme}) => theme.colors.text};
`;
export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;
