
import './App.css'
import { BuscaForm } from './components/BuscaForm';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 64px;
  background: ${({ theme }) => theme.colors.background};
`;

function App() {
  const handleBuscaSubmit = (data: any) => {
    console.log('Busca realizada:', data);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <h1>Consulta de Dados Básicos</h1>
        <p>Encontre as informações essenciais de seus investigados</p>
        <BuscaForm onSubmit={handleBuscaSubmit} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
