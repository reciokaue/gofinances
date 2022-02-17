import React from 'react'

import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

export function Profile(){
  return ( 
    <View>
      <Text testID='text-title'>Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder='Nome'
        autoCorrect={false}
        value="kaue"
      />
      <TextInput
        testID="input-surname"
        placeholder='Sobrenome'
        value="recio"
      />
      <Button
        testID="button"
        title="Salvar"
        onPress={() => {}}
        
      />
    </View>
  )
}