import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { BuscaForm } from "./components/BuscaForm";
import { DetalhesModal } from "./components/DetalhesModal";
import { ResultadosRecentes } from "./components/ResultadosRecentes";
import { ResultadoPesquisa } from "./components/ResultadoPesquisa";
import { buscarEntidades } from "./api/mockApi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#27465E",
    },
    secondary: {
      main: "#F9B233",
    },
    background: {
      default: "#F5F7FA",
      paper: "#fff",
    },
    text: {
      primary: "#333",
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

type Tela = "consulta" | "resultado" | "detalhes";

type ResultadoPesquisa = {
  id: number;
  tipo: "pf" | "pj";
  nome: string;
  documento: string;
  avatar: string;
  telefone: string;
  email: string;
  endereco: string;
};

type ResultadoRecente = {
  id: number;
  tipo: "pf" | "pj";
  nome: string;
  documento: string;
  dataConsulta: string;
  avatar: string;
};

function App() {
  const [telaAtual, setTelaAtual] = React.useState<Tela>("consulta");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [entidadeSelecionada, setEntidadeSelecionada] = React.useState<
    import("./types/entities").Entidade | null
  >(null);
  const [resultadosPesquisa, setResultadosPesquisa] = React.useState<
    ResultadoPesquisa[]
  >([]);

  const handleBuscaSubmit = async (data: { tipo: string; valor: string }) => {
    console.log("Busca realizada:", data);

    try {
      const entidades = await buscarEntidades(
        data.tipo as import("./api/mockApi").TipoBusca,
        data.valor
      );

      const resultados: ResultadoPesquisa[] = entidades.map(
        (entidade, index) => {
          const telefone = entidade.telefones[0]?.numero || "N/A";
          const email = entidade.emails[0] || "N/A";
          const endereco = entidade.enderecos[0]
            ? `${entidade.enderecos[0].logradouro}, ${entidade.enderecos[0].numero}, ${entidade.enderecos[0].cidade}`
            : "N/A";

          return {
            id: index + 1,
            tipo: entidade.tipo === "PF" ? "pf" : "pj",
            nome: entidade.nome,
            documento: entidade.tipo === "PF" ? entidade.cpf : entidade.cnpj,
            avatar: entidade.nome
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
            telefone,
            email,
            endereco,
          };
        }
      );

      setResultadosPesquisa(resultados);
      setTelaAtual("resultado");
    } catch (error) {
      console.error("Erro na busca:", error);
      setResultadosPesquisa([]);
      setTelaAtual("resultado");
    }
  };

  const handleVerDetalhes = (row: ResultadoPesquisa | ResultadoRecente) => {
    // Para simplificar, vamos usar dados mockados para o modal
    // Em uma implementação real, você buscaria os dados completos da entidade
    if (row.tipo === "pf") {
      setEntidadeSelecionada({
        id: "1",
        tipo: "PF",
        nome: row.nome,
        cpf: "documento" in row ? row.documento : "",
        sexo: "Masculino",
        dataNascimento: "1990-01-01",
        nomeMae: "Maria Silva",
        telefones: [
          {
            tipo: "Celular",
            numero: "telefone" in row ? row.telefone : "(11) 99999-9999",
          },
        ],
        emails: "email" in row ? [row.email] : ["lucas@email.com"],
        enderecos: [
          {
            logradouro: "Rua das Flores",
            numero: "123",
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01001-000",
          },
        ],
      });
    } else {
      setEntidadeSelecionada({
        id: "2",
        tipo: "PJ",
        nome: row.nome,
        cnpj: "documento" in row ? row.documento : "",
        capitalSocial: "R$ 100.000,00",
        dataInicioAtividades: "2010-05-10",
        situacaoCadastral: "Ativa",
        cnaePrincipal: "62.01-5-01",
        telefones: [
          {
            tipo: "Comercial",
            numero: "telefone" in row ? row.telefone : "(11) 98888-8888",
          },
        ],
        emails: "email" in row ? [row.email] : ["contato@empresa.com"],
        enderecos: [
          {
            logradouro: "Av. Paulista",
            numero: "1000",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01310-100",
          },
        ],
        quadroSocietario: [
          { nome: "João Souza", cpf: "987.654.321-00" },
          { nome: "Ana Lima", cpf: "654.321.987-00" },
        ],
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEntidadeSelecionada(null);
  };

  const handleVoltarConsulta = () => {
    setTelaAtual("consulta");
    setResultadosPesquisa([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          {telaAtual === "consulta" && (
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    height: 16,
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <Box
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Header */}
                  <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      color="primary"
                      fontWeight={700}
                      mb={2}
                      sx={{
                        fontSize: {
                          xs: "1.75rem",
                          sm: "2.25rem",
                          md: "2.5rem",
                        },
                      }}
                    >
                      Consulta de Dados Básicos
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                    >
                      Encontre as informações essenciais de seus investigados
                    </Typography>
                  </Box>

                  {/* Content Grid */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                      gap: { xs: 3, md: 4 },
                      alignItems: "start",
                    }}
                  >
                    {/* Form Section */}
                    <Box>
                      <BuscaForm onSubmit={handleBuscaSubmit} />
                    </Box>

                    {/* Recent Results Section */}
                    <Box>
                      <ResultadosRecentes onVerDetalhes={handleVerDetalhes} />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}

          {telaAtual === "resultado" && (
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
              }}
            >
              <ResultadoPesquisa
                resultados={resultadosPesquisa}
                onVerDetalhes={handleVerDetalhes}
                onVoltar={handleVoltarConsulta}
              />
            </Box>
          )}
        </Box>
      </Box>
      <DetalhesModal
        open={modalOpen}
        onClose={handleCloseModal}
        entidade={entidadeSelecionada}
      />
    </ThemeProvider>
  );
}

export default App;
