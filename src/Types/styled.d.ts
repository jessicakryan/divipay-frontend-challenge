import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      darkImperialBlue: string;
      success: string;
      successLight: string;
      danger: string;
      dangerLight: string;
      warning: string;
      warningLight: string;
      white: string;
      black: string;
      grey: {
        light: string;
        medium: string;
      };
    };
  }
}
