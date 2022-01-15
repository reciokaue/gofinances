import styled, {css} from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps{
  selected: boolean
  type: 'up' | 'down'
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 48%;
  padding: ${RFValue(16)}px ${RFValue(35)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.colors.background};
  
  border: ${({selected}) => selected ? 0 : 1.5}px solid ;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: 5px;

  ${({ selected, type}) => selected && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.success_light};
  `};
  ${({ selected, type}) => selected && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.attention_light};
  `};
`;
export const Icon= styled(Feather)<ButtonProps>`
  font-size: ${RFValue(24)}px;

  color: ${({theme, type, selected}) => selected? theme.colors.shape: (
    type === 'up'?
    theme.colors.success:
    theme.colors.attention
  )};
  margin-right: ${RFValue(12)}px;
`;
export const Title= styled.Text<ButtonProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  color: ${({theme, selected}) => selected? theme.colors.shape: theme.colors.text};
`;
