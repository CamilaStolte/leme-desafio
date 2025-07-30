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
import type { TipoBusca } from "./api/mockApi";
import { useMutation } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    primary: { main: "#27465E" },
    secondary: { main: "#F9B233" },
    background: { default: "#F5F7FA", paper: "#fff" },
    text: { primary: "#333" },
  },
  shape: { borderRadius: 8 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
});

type Tela = "consulta" | "resultado";

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
  const [resultadosRecentes, setResultadosRecentes] = React.useState<
    ResultadoRecente[]
  >([]);

  const addResultadoRecente = (
    entidade: import("./types/entities").Entidade
  ) => {
    const novoResultado: ResultadoRecente = {
      id: resultadosRecentes.length + 1,
      tipo: entidade.tipo === "PF" ? "pf" : "pj",
      nome: entidade.nome,
      documento: entidade.tipo === "PF" ? entidade.cpf : entidade.cnpj,
      dataConsulta: new Date().toLocaleDateString("pt-BR"),
      avatar: entidade.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };
    setResultadosRecentes((prev) => {
      const novos = [
        novoResultado,
        ...prev.filter((r) => r.documento !== novoResultado.documento),
      ];
      return novos.slice(0, 10);
    });
  };

  const { mutate: realizarBusca, isPending: isLoading } = useMutation({
    mutationFn: async ({ tipo, valor }: { tipo: TipoBusca; valor: string }) => {
      const entidades = await buscarEntidades(tipo, valor);
      return entidades;
    },
    onSuccess: (entidades: import("./types/entities").Entidade[]) => {
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
      entidades.forEach(addResultadoRecente);
      setTelaAtual("resultado");
    },
    onError: (error: Error) => {
      console.error("Erro na busca:", error);
      setResultadosPesquisa([]);
      setTelaAtual("resultado");
    },
  });

  const handleBuscaSubmit = (data: { tipo: string; valor: string }) => {
    realizarBusca({ tipo: data.tipo as TipoBusca, valor: data.valor });
  };

  const handleVerDetalhes = async (
    row: ResultadoPesquisa | ResultadoRecente
  ) => {
    const entidades = await buscarEntidades(
      row.tipo === "pf" ? "cpf" : "cnpj",
      row.documento
    );
    const entidade = entidades.find(
      (e) => (e.tipo === "PF" ? e.cpf : e.cnpj) === row.documento
    );
    if (entidade) {
      setEntidadeSelecionada(entidade);
      addResultadoRecente(entidade);
      setModalOpen(true);
    }
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
        <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto" }}>
          {telaAtual === "consulta" && (
            <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
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
                  <Box
                    sx={{
                      flex: 1,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                      gap: { xs: 3, md: 4 },
                      alignItems: "start",
                    }}
                  >
                    <Box>
                      <BuscaForm
                        onSubmit={handleBuscaSubmit}
                        isLoading={isLoading}
                      />
                    </Box>
                    <Box>
                      <ResultadosRecentes
                        resultados={resultadosRecentes}
                        onVerDetalhes={handleVerDetalhes}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
          {telaAtual === "resultado" && (
            <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
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
