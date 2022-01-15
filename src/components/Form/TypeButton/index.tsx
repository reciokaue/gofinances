import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  Icon,
  Title,
} from "./styles";

interface Props extends RectButtonProps{
  title: string
  type: 'up' | 'down'
  selected: boolean
}
const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}
export function TypeButton({title, type, selected, ...rest}: Props) {
  return (
    <Container selected={selected} type={type} {...rest}>
      <Icon type={type} selected={selected} name={icons[type]}/>
      <Title  type={type} selected={selected}>{title}</Title>
    </Container>
  )
}
