import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import * as z from 'zod';
import styled from 'styled-components';
import type { TipoBusca } from '../api/mockApi';

const tiposBusca = [
  { label: 'CPF', value: 'cpf' },
  { label: 'CNPJ', value: 'cnpj' },
  { label: 'E-mail', value: 'email' },
  { label: 'Telefone', value: 'telefone' },
  { label: 'Endereço', value: 'endereco' },
  { label: 'Nome', value: 'nome' },
];

type FormValues = {
  tipo: TipoBusca;
  termo: string;
};

const maskMap: Record<TipoBusca, string | undefined> = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  telefone: '(99) 99999-9999',
  email: undefined,
  endereco: undefined,
  nome: undefined,
};

const schemaMap: Record<TipoBusca, z.ZodTypeAny> = {
  cpf: z.string().min(14, 'CPF inválido').max(14, 'CPF inválido'),
  cnpj: z.string().min(18, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  telefone: z.string().min(15, 'Telefone inválido').max(15, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
  endereco: z.string().min(3, 'Endereço obrigatório'),
  nome: z.string().min(3, 'Nome obrigatório'),
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

interface BuscaFormProps {
  onSubmit: (data: FormValues) => void;
}

export const BuscaForm: React.FC<BuscaFormProps> = ({ onSubmit }) => {
  const [tipo, setTipo] = useState<TipoBusca>('cpf');
  const schema = React.useMemo(() => z.object({
    tipo: z.enum(['cpf', 'cnpj', 'email', 'telefone', 'endereco', 'nome']),
    termo: schemaMap[tipo],
  }), [tipo]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tipo: 'cpf', termo: '' },
  });

  const handleTipoChange = (e: { value: TipoBusca }) => {
    setTipo(e.value);
    reset({ tipo: e.value, termo: '' });
  };

  return (
    <Wrapper onSubmit={handleSubmit((data) => onSubmit(data as FormValues))}>
      <Controller
        name="tipo"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={tiposBusca}
            value={tipo}
            onChange={handleTipoChange}
            placeholder="Selecione o tipo de busca"
          />
        )}
      />
      <Controller
        name="termo"
        control={control}
        render={({ field }) =>
          maskMap[tipo] ? (
            <InputMask
              {...field}
              value={String(field.value ?? '')}
              mask={maskMap[tipo]}
              placeholder={tiposBusca.find((t) => t.value === tipo)?.label}
              className={errors.termo ? 'p-invalid' : ''}
            />
          ) : (
            <InputText
              {...field}
              value={String(field.value ?? '')}
              placeholder={tiposBusca.find((t) => t.value === tipo)?.label}
              className={errors.termo ? 'p-invalid' : ''}
            />
          )
        }
      />
      {errors.termo && (
        <span style={{ color: 'red', fontSize: 12 }}>{errors.termo.message as string}</span>
      )}
      <Button type="submit" label="Pesquisar" />
    </Wrapper>
  );
}; 