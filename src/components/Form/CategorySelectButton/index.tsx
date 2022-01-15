import { restElement } from "@babel/types";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  Title,
  Icon,
} from "./styles";

interface Props extends RectButtonProps{
  title: string
}

export function CategorySelectButton({title, ...rest}: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Icon name="chevron-down"/>
    </Container>
  )
}
