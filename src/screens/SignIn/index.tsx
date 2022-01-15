import React, { useState } from "react";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Footer,
  Wrapper,
  LoadingContainer
} from "./styles";

import Logo from '../../assets/logo.svg'
import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'

import { RFValue } from "react-native-responsive-fontsize";
import { SignSocialButton } from "../../components/SignSocialButton";
import { useAuth } from "../../hooks/useAuth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";

export function SignIn() {
  const [ isLoading, setIsLoading ] = useState(false)

  const { signInWithGoogle, signInWithApple } = useAuth()
  const theme = useTheme()

  async function handleSignWithGoogle() {
    try {
      setIsLoading(true)
      await signInWithGoogle() 
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel conectar a conta google')
      setIsLoading(false)
    }
  }
  async function handleSignWithApple() {
    try {
      setIsLoading(true)
      await signInWithApple() 
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel conectar a conta apple')
      setIsLoading(false)
    }
  } 

  return (
    <Container>
      <Header>
        <Logo width={RFValue(120)} height={RFValue(68)}/>
        <Title>Controle suas {'\n'}finanças de forma{'\n'}muito simples
        </Title>
        <Subtitle>Faça seu login com{'\n'}uma das contas abaixo</Subtitle>
      </Header>
      <Footer>
        <Wrapper>
          <SignSocialButton onPress={handleSignWithGoogle} title="Entrar com Google" svg={Google}/>
          {Platform.OS == 'ios'? 
           <SignSocialButton onPress={handleSignWithApple} title="Entrar com Apple" svg={Apple}/>: null
          }
        </Wrapper>
        <LoadingContainer>
          {isLoading? <ActivityIndicator color={theme.colors.shape} size="large"/>: null}
        </LoadingContainer>
      </Footer>
    </Container>
  )
}
