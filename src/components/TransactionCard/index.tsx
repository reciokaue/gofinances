import React from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  Name,
  Date,
} from './styles';


export interface TransactionCardProps{
  type: 'up' | 'down'
  title: string
  amount: string
  category: string
  date: string
}
interface CardProps {
  data: TransactionCardProps
}

function TransactionCard({data}: CardProps){
  const [ category ] = categories.filter(
    item => item.key === data.category
  )

  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'down' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <Name>{category.name}</Name>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;