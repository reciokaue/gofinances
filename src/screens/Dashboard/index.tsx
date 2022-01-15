import React, { useState, useEffect, useCallback }  from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { defaultDataCards } from '../../utils/dataCards'

import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/useAuth";

import {
  Container,
  Header,
  Wrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HightLightCards,
  Transactions, 
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";

export interface DatalistProps extends TransactionCardProps{
  id: string
}
interface HightlightCardProps{
  input: CardProps
  output: CardProps
  total: CardProps
}
interface CardProps{
  amount: string
  message: string
}

export function Dashboard() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ data, setData ] = useState<DatalistProps[]>()
  const [ cardsData, setCardsData ] = useState<HightlightCardProps>(defaultDataCards)
  
  const theme = useTheme()
  const { signOut, user } = useAuth()
  
  function getCurrency(toConvert: number){
    return toConvert.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    })
  }
  function getLastDate(collection: DatalistProps[], type: 'up' | 'down' | 'total'){


    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: 'long',
    }).format(new Date(Math.max.apply(Math, type != 'total'?
      collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
    : collection
        .map(transaction => new Date(transaction.date).getTime())
    ))) 
  } 
  
  async function LoadData(){
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response): []

    let inputTotal = 0
    let outputTotal = 0


    const formatedData:DatalistProps[] = 
    transactions.map((item: DatalistProps) => {
      item.type === 'up'? 
        inputTotal += Number(item.amount):
        outputTotal += Number(item.amount)
    
      const amount = getCurrency(Number(item.amount)) 
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit',
      }).format(new Date(item.date))

      return{
        id: item.id,
        title: item.title,
        amount: amount,
        type: item.type,
        category: item.category,
        date: date,
      }
    })
    setData(formatedData)
    
    setCardsData({
      input: {
        amount: getCurrency(inputTotal),
        message: 'Última entrada dia ' + getLastDate(transactions, 'up'),
      },
      output: {
        amount: getCurrency(outputTotal),
        message: 'Última saída dia ' + getLastDate(transactions, 'down'),
      },
      total: {
        amount: getCurrency((inputTotal - outputTotal)),
        message: '01 à ' + getLastDate(transactions, 'total'),
      }
    })
    setIsLoading(false)
  }
  useEffect(() => {
    LoadData()
  },[])
  useFocusEffect(useCallback(() => {
    LoadData()
  }, []))

  return (
    // isLoading ?
    //  
    // <>
      <Transactions>
        <TransactionList
          ListHeaderComponent={Heading}
          ListEmptyComponent={
            <LoadContainer>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </LoadContainer>
          }
          // inverted
          
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item } ) => <TransactionCard data={item}/>}
        />
      </Transactions>
    // </>
  )
  function Heading(){
    return (<>
      <Header>
        <Wrapper>
        <UserInfo>
          <Photo source={{uri: user.photo}}/>
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>{user.name}</UserName>
          </User>
        </UserInfo>
        <LogoutButton onPress={signOut}>
          <Icon name="power"/>
        </LogoutButton>
        </Wrapper>
      </Header>
      <HightLightCards>
        <HighlightCard type="up" title="Entradas" amount={cardsData?.input.amount} lastTransaction={cardsData?.input.message}/>
        <HighlightCard type="down" title="Saidas" amount={cardsData?.output.amount} lastTransaction={cardsData?.output.message}/>
        <HighlightCard type="total" title="Total" amount={cardsData?.total.amount} lastTransaction={cardsData?.total.message}/>
      </HightLightCards>
      <Title>Listagem</Title>
    </>)
  }
}
