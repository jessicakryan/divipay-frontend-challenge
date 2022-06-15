import React from 'react';
import { Category, Merchant, Transaction } from '../data/data.types';
import { PageContainer, Title } from './App.style';

interface Props {
  categories: Category[];
  merchants: Merchant[];
  transactions: Transaction[];
}

const App = ({ categories, merchants, transactions }: Props) => (
  <PageContainer>
    <Title>Transactions</Title>

    <table>
      <tbody>
        <tr>
          <td>Complete</td>
        </tr>
      </tbody>
    </table>
  </PageContainer>
);

export default App;
