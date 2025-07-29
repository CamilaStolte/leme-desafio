import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { InputMask } from 'primereact/inputmask';

const tiposBusca = [
  { label: 'CPF', value: 'cpf' },
  { label: 'CNPJ', value: 'cnpj' },
  { label: 'E-mail', value: 'email' },
  { label: 'Telefone', value: 'telefone' },
  { label: 'Endereço', value: 'endereco' },
  { label: 'Nome', value: 'nome' },
];

const mascaraPorTipo: Record<string, string | undefined> = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  telefone: '(99) 99999-9999',
};

const schemaPorTipo = {
  cpf: z.object({ tipo: z.literal('cpf'), valor: z.string().min(14, 'CPF inválido') }),
  cnpj: z.object({ tipo: z.literal('cnpj'), valor: z.string().min(18, 'CNPJ inválido') }),
  email: z.object({ tipo: z.literal('email'), valor: z.string().email('E-mail inválido') }),
  telefone: z.object({ tipo: z.literal('telefone'), valor: z.string().min(15, 'Telefone inválido') }),
  endereco: z.object({ tipo: z.literal('endereco'), valor: z.string().min(3, 'Endereço obrigatório') }),
  nome: z.object({ tipo: z.literal('nome'), valor: z.string().min(3, 'Nome obrigatório') }),
};

const FormSchema = z.discriminatedUnion('tipo', [
  schemaPorTipo.cpf,
  schemaPorTipo.cnpj,
  schemaPorTipo.email,
  schemaPorTipo.telefone,
  schemaPorTipo.endereco,
  schemaPorTipo.nome,
]);
type FormType = z.infer<typeof FormSchema>;

export function BuscaForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [tipo, setTipo] = React.useState<FormType['tipo']>('cpf');
  const schema = schemaPorTipo[tipo as keyof typeof schemaPorTipo];
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { tipo: 'cpf', valor: '' },
  });

  React.useEffect(() => {
    reset({ tipo, valor: '' });
  }, [tipo, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit || (() => {}))} noValidate>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Box flex="1 1 120px" minWidth={120}>
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Tipo"
                fullWidth
                {...field}
                value={tipo}
                onChange={e => setTipo(e.target.value as FormType['tipo'])}
                size="small"
              >
                {tiposBusca.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Box flex="2 1 200px" minWidth={180}>
          <Controller
            name="valor"
            control={control}
            render={({ field }) =>
              tipo === 'cpf' || tipo === 'cnpj' || tipo === 'telefone' ? (
                <InputMask
                  {...field}
                  mask={mascaraPorTipo[tipo] || ''}
                  placeholder={tiposBusca.find(t => t.value === tipo)?.label}
                  className={errors.valor ? 'p-invalid' : ''}
                  autoClear={false}
                  onChange={e => field.onChange(e.value)}
                />
              ) : (
                <TextField
                  {...field}
                  label={tiposBusca.find(t => t.value === tipo)?.label}
                  fullWidth
                  size="small"
                  error={!!errors.valor}
                  helperText={errors.valor?.message as string}
                />
              )
            }
          />
          {errors.valor && (
            <Box mt={0.5} color="error.main" fontSize={13}>
              {errors.valor.message as string}
            </Box>
          )}
        </Box>
      </Box>
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
          Pesquisar
        </Button>
      </Box>
    </Box>
  );
} 