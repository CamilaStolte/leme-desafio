import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type PessoaFisica = {
  tipo: 'pf';
  nome: string;
  cpf: string;
  sexo: string;
  dataNascimento: string;
  nomeMae: string;
  telefones: string[];
  emails: string[];
  enderecos: string[];
};

type Empresa = {
  tipo: 'pj';
  nome: string;
  cnpj: string;
  capitalSocial: string;
  dataInicio: string;
  situacao: string;
  cnae: string;
  telefones: string[];
  emails: string[];
  enderecos: string[];
  socios: string[];
};

type Entidade = PessoaFisica | Empresa;

type Props = {
  open: boolean;
  onClose: () => void;
  entidade: Entidade | null;
};

export function DetalhesModal({ open, onClose, entidade }: Props) {
  if (!entidade) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {entidade.tipo === 'pf' ? 'Detalhes da Pessoa Física' : 'Detalhes da Empresa'}
      </DialogTitle>
      <DialogContent dividers>
        {entidade.tipo === 'pf' ? (
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>{entidade.nome}</Typography>
            <Box display="flex" flexWrap="wrap" mt={1} gap={2}>
              <Box flex="1 1 200px"><b>CPF:</b> {entidade.cpf}</Box>
              <Box flex="1 1 200px"><b>Sexo:</b> {entidade.sexo}</Box>
              <Box flex="1 1 200px"><b>Data de Nascimento:</b> {entidade.dataNascimento}</Box>
              <Box flex="1 1 200px"><b>Nome da Mãe:</b> {entidade.nomeMae}</Box>
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Telefones</Typography>
              {entidade.telefones.map((t, i) => <Typography key={i}>{t}</Typography>)}
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">E-mails</Typography>
              {entidade.emails.map((e, i) => <Typography key={i}>{e}</Typography>)}
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Endereços</Typography>
              {entidade.enderecos.map((e, i) => <Typography key={i}>{e}</Typography>)}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>{entidade.nome}</Typography>
            <Box display="flex" flexWrap="wrap" mt={1} gap={2}>
              <Box flex="1 1 200px"><b>CNPJ:</b> {entidade.cnpj}</Box>
              <Box flex="1 1 200px"><b>Capital Social:</b> {entidade.capitalSocial}</Box>
              <Box flex="1 1 200px"><b>Data de Início:</b> {entidade.dataInicio}</Box>
              <Box flex="1 1 200px"><b>Situação:</b> {entidade.situacao}</Box>
              <Box flex="1 1 100%"><b>CNAE principal:</b> {entidade.cnae}</Box>
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Telefones</Typography>
              {entidade.telefones.map((t, i) => <Typography key={i}>{t}</Typography>)}
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">E-mails</Typography>
              {entidade.emails.map((e, i) => <Typography key={i}>{e}</Typography>)}
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Endereços</Typography>
              {entidade.enderecos.map((e, i) => <Typography key={i}>{e}</Typography>)}
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Quadro Societário</Typography>
              {entidade.socios.map((s, i) => <Typography key={i}>{s}</Typography>)}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
} 