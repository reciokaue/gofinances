import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ContainerProps{
  color: string
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.shape};

  padding: ${RFValue(13)}px ${RFValue(24)}px;

  border-radius:${RFValue(5)}px;
  border-left-width: ${RFValue(5)}px;
  border-left-color: ${({color}) => color};
  margin-bottom: ${RFValue(8)}px;
`;
export const Title = styled.Text`
  font-size:  ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`; 
export const Amount = styled.Text`
  font-size:  ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;
