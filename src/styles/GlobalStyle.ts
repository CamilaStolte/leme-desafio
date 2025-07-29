import { createGlobalStyle } from 'styled-components';
import type { DefaultTheme } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin: 0;
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`; 