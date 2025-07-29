export type Telefone = {
  tipo: string;
  numero: string;
};

export type Email = string;

export type Endereco = {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type PessoaFisica = {
  id: string;
  tipo: 'PF';
  nome: string;
  cpf: string;
  sexo: string;
  dataNascimento: string;
  nomeMae: string;
  telefones: Telefone[];
  emails: Email[];
  enderecos: Endereco[];
};

export type Socio = {
  nome: string;
  cpf: string;
};

export type PessoaJuridica = {
  id: string;
  tipo: 'PJ';
  nome: string;
  cnpj: string;
  capitalSocial: string;
  dataInicioAtividades: string;
  situacaoCadastral: string;
  cnaePrincipal: string;
  telefones: Telefone[];
  emails: Email[];
  enderecos: Endereco[];
  quadroSocietario: Socio[];
};

export type Entidade = PessoaFisica | PessoaJuridica;
