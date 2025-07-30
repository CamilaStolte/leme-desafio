import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { InputMask } from "primereact/inputmask";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const tiposBusca = [
  { label: "CPF", value: "cpf" },
  { label: "CNPJ", value: "cnpj" },
  { label: "E-mail", value: "email" },
  { label: "Telefone", value: "telefone" },
  { label: "Endereço", value: "endereco" },
  { label: "Nome", value: "nome" },
];

const mascaraPorTipo: Record<string, string | undefined> = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  telefone: "(99) 99999-9999",
};

const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return false;
  return true;
};

const validateCNPJ = (cnpj: string) => {
  const cleanCNPJ = cnpj.replace(/\D/g, "");
  if (cleanCNPJ.length !== 14) return false;
  return true;
};

const schemaPorTipo = {
  cpf: z.object({
    tipo: z.literal("cpf"),
    valor: z
      .string()
      .min(14, "CPF deve ter 11 dígitos")
      .refine((val) => validateCPF(val), "CPF inválido"),
  }),
  cnpj: z.object({
    tipo: z.literal("cnpj"),
    valor: z
      .string()
      .min(18, "CNPJ deve ter 14 dígitos")
      .refine((val) => validateCNPJ(val), "CNPJ inválido"),
  }),
  email: z.object({
    tipo: z.literal("email"),
    valor: z.string().email("E-mail inválido"),
  }),
  telefone: z.object({
    tipo: z.literal("telefone"),
    valor: z.string().min(15, "Telefone inválido"),
  }),
  endereco: z.object({
    tipo: z.literal("endereco"),
    valor: z.string().min(3, "Endereço obrigatório"),
  }),
  nome: z.object({
    tipo: z.literal("nome"),
    valor: z.string().min(3, "Nome obrigatório"),
  }),
};

type FormType =
  | z.infer<typeof schemaPorTipo.cpf>
  | z.infer<typeof schemaPorTipo.cnpj>
  | z.infer<typeof schemaPorTipo.email>
  | z.infer<typeof schemaPorTipo.telefone>
  | z.infer<typeof schemaPorTipo.endereco>
  | z.infer<typeof schemaPorTipo.nome>;

export function BuscaForm({
  onSubmit,
  isLoading,
}: {
  onSubmit?: (data: FormType) => void;
  isLoading?: boolean;
}) {
  const [tipo, setTipo] = React.useState<FormType["tipo"]>("cpf");
  const schema = schemaPorTipo[tipo as keyof typeof schemaPorTipo];
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { tipo: "cpf", valor: "" },
  });

  React.useEffect(() => {
    reset({ tipo, valor: "" });
  }, [tipo, reset]);

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3} color="primary">
        Busca de Entidades
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit || (() => {}))}
        noValidate
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr auto" },
            gap: { xs: 2, sm: 3 },
            alignItems: "end",
          }}
        >
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Tipo de busca"
                fullWidth
                {...field}
                value={tipo}
                onChange={(e) => setTipo(e.target.value as FormType["tipo"])}
                size="medium"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                {tiposBusca.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="valor"
            control={control}
            render={({ field }) =>
              tipo === "cpf" || tipo === "cnpj" || tipo === "telefone" ? (
                <Box>
                  <Box
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    {tiposBusca.find((t) => t.value === tipo)?.label}
                  </Box>
                  <InputMask
                    {...field}
                    mask={mascaraPorTipo[tipo] || ""}
                    placeholder={`Digite o ${
                      tiposBusca.find((t) => t.value === tipo)?.label
                    }`}
                    className={errors.valor ? "p-invalid" : ""}
                    autoClear={false}
                    onChange={(e) => field.onChange(e.value || "")}
                    style={{
                      width: "100%",
                      padding: "16px 14px",
                      border: errors.valor
                        ? "1px solid #d32f2f"
                        : "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      backgroundColor: "#fff",
                    }}
                  />
                </Box>
              ) : (
                <TextField
                  {...field}
                  label={tiposBusca.find((t) => t.value === tipo)?.label}
                  fullWidth
                  size="medium"
                  error={!!errors.valor}
                  helperText={errors.valor?.message as string}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              )
            }
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isLoading}
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              minHeight: "56px",
            }}
          >
            {isLoading ? "Pesquisando..." : "Pesquisar"}
          </Button>
        </Box>

        {errors.valor && (
          <Box mt={1} color="error.main" fontSize={14}>
            {errors.valor.message as string}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
