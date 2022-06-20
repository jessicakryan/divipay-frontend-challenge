import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../Styles/theme';

const Providers: FunctionComponent = ({
  children,
}: {
  children?: ReactNode;
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
