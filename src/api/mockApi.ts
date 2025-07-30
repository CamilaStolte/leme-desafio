import type { Entidade } from "../types/entities";

const entidades: Entidade[] = [
  {
    id: "1",
    tipo: "PF",
    nome: "Lucas Silva",
    cpf: "123.456.789-01",
    sexo: "Masculino",
    dataNascimento: "1990-01-01",
    nomeMae: "Maria Silva",
    telefones: [
      { tipo: "Celular", numero: "(11) 91234-5678" },
      { tipo: "Residencial", numero: "(11) 3232-3232" },
    ],
    emails: ["lucas@lemeforense.com.br", "lucas@gmail.com"],
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
  },
  {
    id: "2",
    tipo: "PF",
    nome: "João Santos",
    cpf: "123.789.456-01",
    sexo: "Masculino",
    dataNascimento: "1985-03-15",
    nomeMae: "Ana Santos",
    telefones: [{ tipo: "Celular", numero: "(11) 98765-4321" }],
    emails: ["joao@lemeforense.com.br"],
    enderecos: [
      {
        logradouro: "Av. Brasil",
        numero: "456",
        bairro: "Jardins",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01430-000",
      },
    ],
  },
  {
    id: "3",
    tipo: "PF",
    nome: "Maria Oliveira",
    cpf: "456.789.123-10",
    sexo: "Feminino",
    dataNascimento: "1992-07-20",
    nomeMae: "Clara Oliveira",
    telefones: [{ tipo: "Celular", numero: "(21) 91234-5678" }],
    emails: ["maria@gmail.com"],
    enderecos: [
      {
        logradouro: "Rua das Acácias",
        numero: "789",
        bairro: "Copacabana",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "22051-000",
      },
    ],
  },
  {
    id: "4",
    tipo: "PJ",
    nome: "Empresa Exemplo Ltda",
    cnpj: "12.345.678/0001-99",
    capitalSocial: "R$ 100.000,00",
    dataInicioAtividades: "2010-05-10",
    situacaoCadastral: "Ativa",
    cnaePrincipal: "62.01-5-01",
    telefones: [{ tipo: "Comercial", numero: "(11) 4002-8922" }],
    emails: ["contato@empresaexemplo.com.br"],
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
  },
  {
    id: "5",
    tipo: "PJ",
    nome: "Comércio ABC Ltda",
    cnpj: "98.765.432/0001-10",
    capitalSocial: "R$ 50.000,00",
    dataInicioAtividades: "2015-08-01",
    situacaoCadastral: "Ativa",
    cnaePrincipal: "47.11-3-02",
    telefones: [{ tipo: "Comercial", numero: "(21) 4003-1234" }],
    emails: ["vendas@abc.com.br"],
    enderecos: [
      {
        logradouro: "Rua do Comércio",
        numero: "200",
        bairro: "Centro",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20040-000",
      },
    ],
    quadroSocietario: [{ nome: "Pedro Almeida", cpf: "123.123.123-00" }],
  },
];

export type TipoBusca =
  | "cpf"
  | "cnpj"
  | "email"
  | "telefone"
  | "endereco"
  | "nome";

function simulatePartialMatch(term: string, value: string): boolean {
  const cleanTerm = term.replace(/[.-/]/g, "");
  const cleanValue = value.replace(/[.-/]/g, "");
  let matchCount = 0;
  for (let i = 0; i < cleanTerm.length && i < cleanValue.length; i++) {
    if (cleanTerm[i] === cleanValue[i]) matchCount++;
  }
  return matchCount >= cleanTerm.length * 0.5;
}

export async function buscarEntidades(
  tipo: TipoBusca,
  termo: string
): Promise<Entidade[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const termoLower = termo.toLowerCase();

  return entidades.filter((entidade) => {
    switch (tipo) {
      case "cpf":
        return (
          entidade.tipo === "PF" &&
          (entidade.cpf === termo || simulatePartialMatch(termo, entidade.cpf))
        );
      case "cnpj":
        return (
          entidade.tipo === "PJ" &&
          (entidade.cnpj === termo ||
            simulatePartialMatch(termo, entidade.cnpj))
        );
      case "email":
        return entidade.emails.some((email) => {
          const emailLower = email.toLowerCase();
          return (
            emailLower === termoLower ||
            emailLower.includes(termoLower) ||
            emailLower.split("@")[1] === termoLower.split("@")[1]
          );
        });
      case "telefone":
        return entidade.telefones.some((tel) =>
          tel.numero.replace(/\D/g, "").includes(termo.replace(/\D/g, ""))
        );
      case "endereco":
        return entidade.enderecos.some((end) =>
          Object.values(end).some((v) => v.toLowerCase().includes(termoLower))
        );
      case "nome":
        return entidade.nome.toLowerCase().includes(termoLower);
      default:
        return false;
    }
  });
}
