import { ChangeEventHandler } from 'react';
import { TRANSACTION_SEARCH } from '../../Shared/testIds';
import { SEARCH_DESCRIPTION } from './constants';
import { Input, SearchBarContainer } from './TransactionSearch.style';

interface Props {
  searchValue: string;
  handleChange: ChangeEventHandler;
}

export const TransactionSearch = ({ searchValue, handleChange }: Props) => (
  <SearchBarContainer data-testid={TRANSACTION_SEARCH}>
    <label>
      {SEARCH_DESCRIPTION}
      <Input
        type="text"
        name="search-bar"
        value={searchValue}
        onChange={handleChange}
      />
    </label>
  </SearchBarContainer>
);
