import styled from "styled-components/native";

import { Feather } from '@expo/vector-icons'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

import { FlatList } from "react-native";
import { DatalistProps } from './index'
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.ScrollView.attrs({
  // showsVerticalScrollIndicator: false
})`
  flex-grow: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({theme}) => theme.colors.primary};
  `;
export const Wrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  
  border-radius: 10px;
  `;
export const User = styled.View`
  margin-left: ${RFValue(17)}px;
  `;
export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  `;
export const UserName = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.background};
  `;
export const LogoutButton = styled(BorderlessButton)`
  padding: ${RFValue(5)}px;
`;
export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
  `;
export const HightLightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 24}
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(21)}px;
`;
export const Transactions = styled.View`
  flex: 1;
  /* padding: 0  ${RFValue(24)}px; */
  /* margin-top: ${RFPercentage(14)}px; */
`; 
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(95)}px 0 ${RFValue(16)}px;
  padding: 0 ${RFValue(24)}px
`;
export const TransactionList = styled(
  FlatList 
  ).attrs({
    showsVerticalScrollIndicator: false,
    // nestedScrollEnabled: true,
})`
  padding-bottom: ${getBottomSpace() + RFValue(16)}px;
` as React.ComponentType as new <DatalistProps>() =>
FlatList<DatalistProps>;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
