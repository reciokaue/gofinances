import React from 'react'

import { render } from '@testing-library/react-native'
import { Profile } from '../../screens/Profile'

test('Check if show correctly placeholder username', () => {
  const { getByPlaceholderText } = render(<Profile/>)

  const inputName = getByPlaceholderText('Nome')
  expect(inputName).toBeTruthy()
})

test('Check if user data has been load', () => {
  const { getByTestId } = render(<Profile/>)

  const inputName = getByTestId('input-name')
  const inputSurname = getByTestId('input-surname')

  expect(inputName.props.value).toEqual('kaue')
  expect(inputSurname.props.value).toEqual('recio')
})

test('Checks if title render correctly', () => {
  const { getByTestId } = render(<Profile/>)
  const textTitle = getByTestId('text-title')
  
  expect(textTitle.children).toContain('Perfil')
}) 