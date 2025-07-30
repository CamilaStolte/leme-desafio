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

const resultadosRecentes: ResultadoRecente[] = [
  {
    id: 1,
    tipo: "pf",
    nome: "Lucas Silva",
    documento: "123.456.789-00",
    dataConsulta: "15/12/2024",
    avatar: "LS",
  },
  {
    id: 2,
    tipo: "pj",
    nome: "Empresa Exemplo Ltda",
    documento: "12.345.678/0001-90",
    dataConsulta: "14/12/2024",
    avatar: "EE",
  },
  {
    id: 3,
    tipo: "pf",
    nome: "Maria Santos",
    documento: "987.654.321-00",
    dataConsulta: "13/12/2024",
    avatar: "MS",
  },
  {
    id: 4,
    tipo: "pj",
    nome: "Comércio ABC Ltda",
    documento: "98.765.432/0001-10",
    dataConsulta: "12/12/2024",
    avatar: "CA",
  },
  {
    id: 5,
    tipo: "pf",
    nome: "João Oliveira",
    documento: "456.789.123-00",
    dataConsulta: "11/12/2024",
    avatar: "JO",
  },
  {
    id: 6,
    tipo: "pj",
    nome: "Serviços XYZ Ltda",
    documento: "76.543.210/0001-20",
    dataConsulta: "10/12/2024",
    avatar: "SX",
  },
  {
    id: 7,
    tipo: "pf",
    nome: "Ana Costa",
    documento: "789.123.456-00",
    dataConsulta: "09/12/2024",
    avatar: "AC",
  },
  {
    id: 8,
    tipo: "pj",
    nome: "Indústria DEF Ltda",
    documento: "54.321.098/0001-30",
    dataConsulta: "08/12/2024",
    avatar: "ID",
  },
];

type Props = {
  onVerDetalhes: (resultado: ResultadoRecente) => void;
};

export function ResultadosRecentes({ onVerDetalhes }: Props) {
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
          label={resultadosRecentes.length}
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
        {resultadosRecentes.map((resultado) => (
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
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
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
        ))}
      </Box>
    </Paper>
  );
}
