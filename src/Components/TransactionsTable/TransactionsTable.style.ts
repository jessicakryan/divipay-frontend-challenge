import styled, { css, DefaultTheme } from 'styled-components';

export const Table = styled.table`
  width: 100%;
`;

export const TableHeader = styled.th<{ theme: DefaultTheme }>`
  background-color: ${({ theme }) => theme.colors.darkImperialBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem;
  text-align: center;

  select {
    display: block;
    margin: 0.5rem auto 0.25rem;
  }
`;

export const TableBodyRow = styled.tr<{ isEven: boolean }>`
  ${(props) =>
    props.isEven &&
    css`
      background: ${({ theme }) => theme.colors.grey.light};
    `};
`;

export const TableBodyCell = styled.td<{ isCurrency?: boolean }>`
  padding: 0.5rem 1rem;
  text-align: center;

  ${(props) =>
    props.isCurrency &&
    css`
      text-align: right;
    `};
`;

export const EmptyTableBodyCell = styled.td`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.grey.light};
`;

const handleColorType = (props: { theme: DefaultTheme; status: string }) => {
  switch (props.status) {
    case 'complete':
      return props.theme.colors.success;
    case 'incomplete':
      return props.theme.colors.danger;
    case 'exported':
      return props.theme.colors.warning;
    default:
      return props.theme.colors.black;
  }
};

const handleBackgroundColorType = (props: {
  theme: DefaultTheme;
  status: string;
}) => {
  switch (props.status) {
    case 'complete':
      return props.theme.colors.successLight;
    case 'incomplete':
      return props.theme.colors.dangerLight;
    case 'exported':
      return props.theme.colors.warningLight;
    default:
      return props.theme.colors.white;
  }
};

export const Status = styled.span<{ status: string }>`
  padding: 0.25rem;
  margin: 0.5rem;
  min-width: 5rem;
  display: inline-block;
  color: ${(props) => handleColorType(props)};
  background-color: ${(props) => handleBackgroundColorType(props)};
`;
