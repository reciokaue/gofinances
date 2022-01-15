import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(5)}px;

  padding: ${RFValue(16)}px ${RFValue(18)}px;
  margin-bottom: ${RFValue(8)}px;
  
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.title};
`;

