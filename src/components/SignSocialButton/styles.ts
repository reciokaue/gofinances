import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";


export const Container = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: ${RFValue(16)}px;
`;
export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;

  padding: ${RFValue(16)}px;
  max-width: ${RFValue(56)}px;

  border-right-width: 1.5px;
  border-right-color: ${({theme}) => theme.colors.background};
`;
export const Title = styled.Text`
  flex: 1;

  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
