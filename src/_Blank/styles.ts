import styled from "styled-components/native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

/* height: ${RFPercentage(42)}px; */

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
