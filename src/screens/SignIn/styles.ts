import styled from "styled-components/native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  width: 100%;
  flex: 1;
  padding-top: ${RFValue(20)}px;

  background-color: ${({theme}) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(40)}px;
`;
export const Subtitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(60)}px;
  margin-bottom: ${RFValue(67)}px;
`;
export const Footer = styled.View`
  background-color: ${({theme}) => theme.colors.secondary};
  width: 100%;
  height: ${RFValue(200)}px;
`;
export const Wrapper = styled.View`
  flex: 1;
  padding: 0 ${RFValue(32)}px;
  margin-top: -${RFValue(32)}px;
`;
export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
