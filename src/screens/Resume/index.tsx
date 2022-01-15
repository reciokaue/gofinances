import React, { useState, useCallback } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  Select,
  Icon,
  Month,
  LoadContainer,
} from "./styles";

import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/core";
import { useAuth } from "../../hooks/useAuth";

export interface TransactionData{
  id: string
  type: 'up' | 'down'
  title: string
  amount: string
  category: string
  date: string
}
interface CategoryData{
  key: string
  name: string
  totalFormatted: string
  total: number
  color:  string
  percent: string
}

export function Resume() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ totalByCategory, setTotalByCategory ] = useState<CategoryData[]>([])

  const theme = useTheme()
  const { user } = useAuth()

  function handleDateChange(action: 'next' | 'prev'){
    action == 'next'?
      setSelectedDate(addMonths(selectedDate, 1)):
      setSelectedDate(subMonths(selectedDate, 1))
  }

  // useEffect(() => {
  //   LoadData()
  // }, [selectedDate])
  useFocusEffect(useCallback(() => {
    LoadData()
  }, [selectedDate]))

  async function LoadData(){
    setIsLoading(true)

    const dataKey = `@gofinances:transactions_user:${user.id}`
    const responseRaw = await AsyncStorage.getItem(dataKey)
    const response = responseRaw ? JSON.parse(responseRaw): []

    const outputs = response
    .filter((output: TransactionData) => 
      output.type == 'down' &&
      new Date(output.date).getMonth() == selectedDate.getMonth() &&
      new Date(output.date).getFullYear() == selectedDate.getFullYear() 
    )
    const totalOutputs = outputs.reduce((acumullator: number, output: TransactionData) => {
      return acumullator + Number(output.amount)
    }, 0)
    const totalCategory: CategoryData[] = []

    categories.forEach(category =>  {
      let categorySum = 0
      outputs.forEach((output: TransactionData) => {
        if(output.category === category.key) 
          categorySum += Number(output.amount)
      });
      const percent = `${(categorySum / totalOutputs * 100).toFixed(0)}%`
      if(categorySum > 0)
        totalCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
          color: category.color,
          percent
        })
    })
    setTotalByCategory(totalCategory)
    setIsLoading(false)
  }
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>:
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight()
        }}
      >
        <MonthSelect>
          <Select onPress={() => handleDateChange('prev')}><Icon name="chevron-left"/></Select> 
          <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
          <Select onPress={() => handleDateChange('next')}><Icon name="chevron-right"/></Select> 
        </MonthSelect>
          <ChartContainer>
            <VictoryPie data={totalByCategory}
              colorScale={totalByCategory.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                }
              }}
              labelRadius={70}
              x="percent" y="total"
            />
          </ChartContainer>
          {totalByCategory.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            /> 
          ))}
        </Content>
      }
    </Container>
  )
}
