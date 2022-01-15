import React, { useState } from 'react';

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TypeButton } from '../../components/Form/TypeButton';
import { InputForm } from '../../components/Form/InputForm';
import { CategorySelect } from '../CategorySelect';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';

import {
  Container,
  Header, 
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface FormData{
  name: string
  amount: string
}

const  schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatorio'),
  amount: Yup
  .number()
  .typeError('Informe um valor numerico')
  .positive('O valor não pode ser negativo'),
})

export function Register(){
  const [ selectedType, setSelectedType ] = useState('up')
  const [ modalOpen, setModalOpen ] = useState(false)
  
  const { user } = useAuth()
  const dataKey = `@gofinances:transactions_user:${user.id}`
  
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  })
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  
  const navigation = useNavigation<any>()

  async function handleSetType(type: 'up' | 'down'){
    setSelectedType(type)
  }
  function handleCloseModal(){
    setModalOpen(false)
  }
  function handleOpenModal(){
    setModalOpen(true)
  }
  
  async function clearData(){
    await AsyncStorage.removeItem(dataKey)
  }

  async function handleRegister(form: FormData){
    if(!selectedType)
      return Alert.alert('Selecione o tipo da transação')

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      title: form.name,
      amount: form.amount,
      type: selectedType,
      category: category.key,
      date: new Date(),
    }

    try{
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const formatedData = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData))
    }catch(error){
      console.log(error)
      Alert.alert('Não foi possivel salvar')
    }

    reset()
    setSelectedType('')
    setCategory({
      key: 'category',
      name: 'Categoria',
    })
    navigation.navigate('Listagem')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType={'numeric'}
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TypeButton
                onPress={() => handleSetType('up')}
                type="up" title="Income"
                selected={selectedType === 'up'}
                />
              <TypeButton
                onPress={() => handleSetType('down')}
                type="down" title="Outcome"
                selected={selectedType === 'down'}
                />
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenModal}/>
          </Fields>

          <Button onPress={clearData} title="Clear data"/>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar"/>
        </Form>
        <Modal visible={modalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}