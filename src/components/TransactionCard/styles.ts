import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'

interface TypeProps{
  type: 'up' | 'down'
}

export const Container = styled.View`
  background: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(17)}px ${RFValue(24)}px;
  margin: 0 ${RFValue(24)}px ${RFValue(16)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(20)}px;
  margin-top: ${RFValue(2)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, type}) => 
    type === 'up'? theme.colors.success: theme.colors.attention
  };
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(19)}px;
`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};
`;
export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
  margin-left: ${RFValue(17)}px;
`;
export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`;
