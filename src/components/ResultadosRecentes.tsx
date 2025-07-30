import { Box, Typography, Paper, Button, Avatar, Chip } from "@mui/material";
import { Visibility, Person, Business } from "@mui/icons-material";

type ResultadoRecente = {
  id: number;
  tipo: "pf" | "pj";
  nome: string;
  documento: string;
  dataConsulta: string;
  avatar: string;
};

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
  resultados: ResultadoRecente[];
  onVerDetalhes: (resultado: ResultadoRecente | ResultadoPesquisa) => void;
};

export function ResultadosRecentes({ resultados, onVerDetalhes }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight={600}
          color="primary"
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          Resultados Recentes
        </Typography>
        <Chip
          label={resultados.length}
          size="small"
          color="primary"
          sx={{ ml: 2 }}
        />
      </Box>

      <Box
        sx={{
          maxHeight: "calc(100vh - 300px)",
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
        {resultados.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Nenhuma pesquisa recente
          </Typography>
        ) : (
          resultados.map((resultado) => (
            <Paper
              key={resultado.id}
              elevation={1}
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: 3,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      mr: 2,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      fontWeight: 600,
                    }}
                  >
                    {resultado.avatar}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {resultado.nome}
                      </Typography>
                      {resultado.tipo === "pf" ? (
                        <Person
                          sx={{ ml: 1, fontSize: 16, color: "primary.main" }}
                        />
                      ) : (
                        <Business
                          sx={{ ml: 1, fontSize: 16, color: "secondary.main" }}
                        />
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        mb: 0.5,
                      }}
                    >
                      {resultado.tipo === "pf" ? "CPF" : "CNPJ"}:{" "}
                      {resultado.documento}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.625rem", sm: "0.75rem" } }}
                    >
                      Consultado em: {resultado.dataConsulta}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => onVerDetalhes(resultado)}
                  sx={{
                    minWidth: "auto",
                    px: { xs: 1.5, sm: 2 },
                    py: 0.5,
                    fontSize: { xs: "0.625rem", sm: "0.75rem" },
                    ml: 1,
                  }}
                >
                  Ver detalhes
                </Button>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Paper>
  );
}
