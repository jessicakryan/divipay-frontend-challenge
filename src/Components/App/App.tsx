import React, { useState, ChangeEvent } from 'react';
import { Category, Merchant, Transaction } from '../../Shared/data.types';
import { useDebounce } from '../../Hooks/useDebounce';
import { TransactionSearch } from '../TransactionSearch';
import { TransactionsTable } from '../TransactionsTable';
import { HeaderContainer, PageContainer, Title } from './App.style';
import { APPLICATION_TITLE } from './constants';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../Styles/theme';

interface Props {
  categories: Category[];
  merchants: Merchant[];
  transactions: Transaction[];
}

const App = (props: Props) => {
  const { categories, merchants, transactions } = props;

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <HeaderContainer>
          <Title>{APPLICATION_TITLE}</Title>
          <TransactionSearch
            searchValue={searchValue}
            handleChange={handleSearchValueChange}
          />
        </HeaderContainer>
        <TransactionsTable
          transactions={transactions}
          categories={categories}
          merchants={merchants}
          filter={debouncedValue}
        />
      </PageContainer>
    </ThemeProvider>
  );
};

export default App;
