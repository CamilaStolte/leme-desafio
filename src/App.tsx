
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Paper } from '@mui/material';
import { BuscaForm } from './components/BuscaForm';
import { DetalhesModal } from './components/DetalhesModal';

const theme = createTheme({
  palette: {
    primary: {
      main: '#27465E',
    },
    secondary: {
      main: '#F9B233',
    },
    background: {
      default: '#F5F7FA',
      paper: '#fff',
    },
    text: {
      primary: '#333',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [entidadeSelecionada, setEntidadeSelecionada] = React.useState<any>(null);

  const handleBuscaSubmit = (data: any) => {
    console.log('Busca realizada:', data);
  };
  const handleVerDetalhes = (row: any) => {
    if (row.tipo === 'cpf') {
      setEntidadeSelecionada({
        tipo: 'pf',
        nome: 'Lucas Silva',
        cpf: row.valor,
        sexo: 'Masculino',
        dataNascimento: '01/01/1990',
        nomeMae: 'Maria Silva',
        telefones: ['(11) 99999-9999'],
        emails: ['lucas@lemeforense.com.br'],
        enderecos: ['Rua das Flores, 123, SP'],
      });
    } else {
      setEntidadeSelecionada({
        tipo: 'pj',
        nome: 'Empresa Exemplo Ltda',
        cnpj: row.valor,
        capitalSocial: 'R$ 100.000,00',
        dataInicio: '10/10/2010',
        situacao: 'Ativa',
        cnae: '62.01-5/01',
        telefones: ['(11) 98888-8888'],
        emails: ['contato@empresa.com.br'],
        enderecos: ['Av. Paulista, 1000, SP'],
        socios: ['Lucas Silva', 'João Souza'],
      });
    }
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setEntidadeSelecionada(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: 'primary.main', height: 16, borderRadius: '8px 8px 0 0' }} />
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight={700} mb={1}>
              Consulta de Dados Básicos
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Encontre as informações essenciais de seus investigados
            </Typography>
            <Box mb={4}>
              <BuscaForm onSubmit={handleBuscaSubmit} />
            </Box>
          </Box>
        </Paper>
      </Container>
      <DetalhesModal open={modalOpen} onClose={handleCloseModal} entidade={entidadeSelecionada} />
    </ThemeProvider>
  );
}

export default App;
