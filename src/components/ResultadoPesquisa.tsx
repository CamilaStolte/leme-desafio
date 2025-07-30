import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  FormControlLabel,
  Checkbox,
  IconButton,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  Visibility,
  FilterList,
  Person,
  Business,
} from "@mui/icons-material";

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

type Props = {
  resultados: ResultadoPesquisa[];
  onVerDetalhes: (resultado: ResultadoPesquisa) => void;
  onVoltar: () => void;
};

export function ResultadoPesquisa({
  resultados,
  onVerDetalhes,
  onVoltar,
}: Props) {
  const [filtros, setFiltros] = React.useState({
    pessoaFisica: true,
    pessoaJuridica: true,
  });

  const resultadosFiltrados = resultados.filter((resultado) => {
    if (resultado.tipo === "pf" && !filtros.pessoaFisica) return false;
    if (resultado.tipo === "pj" && !filtros.pessoaJuridica) return false;
    return true;
  });

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 3, overflow: "hidden", height: "100%" }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          height: 16,
          borderRadius: "12px 12px 0 0",
        }}
      />
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, height: "calc(100% - 16px)" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={onVoltar}
              sx={{ mr: 2, color: "primary.main" }}
              size="large"
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h4"
              color="primary"
              fontWeight={700}
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
            >
              Resultado da Pesquisa
            </Typography>
          </Box>
          <Chip
            label={`${resultadosFiltrados.length} resultado${
              resultadosFiltrados.length !== 1 ? "s" : ""
            }`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Filtros */}
        <Paper
          elevation={1}
          sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2 }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
            display="flex"
            alignItems="center"
          >
            <FilterList sx={{ mr: 1, fontSize: 24 }} />
            Filtros
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filtros.pessoaFisica}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      pessoaFisica: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Person sx={{ mr: 1, fontSize: 20, color: "primary.main" }} />
                  Pessoa Física
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filtros.pessoaJuridica}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      pessoaJuridica: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Business
                    sx={{ mr: 1, fontSize: 20, color: "secondary.main" }}
                  />
                  Pessoa Jurídica
                </Box>
              }
            />
          </Box>
        </Paper>

        {/* Resultados */}
        <Box sx={{ flex: 1, minHeight: 0 }}>
          {resultadosFiltrados.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary" mb={2}>
                Nenhum resultado encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tente ajustar os filtros ou realizar uma nova busca
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                maxHeight: "calc(100vh - 400px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#c1c1c1",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}
            >
              {resultadosFiltrados.map((resultado) => (
                <Paper
                  key={resultado.id}
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: 3,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor:
                            resultado.tipo === "pf"
                              ? "primary.main"
                              : "secondary.main",
                          width: { xs: 48, sm: 56 },
                          height: { xs: 48, sm: 56 },
                          mr: 3,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          fontWeight: 600,
                        }}
                      >
                        {resultado.avatar}
                      </Avatar>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="text.primary"
                            sx={{
                              fontSize: { xs: "1rem", sm: "1.25rem" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {resultado.nome}
                          </Typography>
                          {resultado.tipo === "pf" ? (
                            <Person
                              sx={{
                                ml: 1,
                                fontSize: 20,
                                color: "primary.main",
                              }}
                            />
                          ) : (
                            <Business
                              sx={{
                                ml: 1,
                                fontSize: 20,
                                color: "secondary.main",
                              }}
                            />
                          )}
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={0.5}
                        >
                          {resultado.tipo === "pf" ? "CPF" : "CNPJ"}:{" "}
                          {resultado.documento}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={0.5}
                        >
                          📞 {resultado.telefone}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          📧 {resultado.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<Visibility />}
                      onClick={() => onVerDetalhes(resultado)}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        minWidth: "auto",
                      }}
                    >
                      Ver detalhes
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
