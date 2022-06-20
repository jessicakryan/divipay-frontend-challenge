import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  align-self: flex-end;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.grey.light};
  width: 23rem;
`;
