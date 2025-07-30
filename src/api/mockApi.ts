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
];

export type TipoBusca =
  | "cpf"
  | "cnpj"
  | "email"
  | "telefone"
  | "endereco"
  | "nome";

export async function buscarEntidades(
  tipo: TipoBusca,
  termo: string
): Promise<Entidade[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const termoLower = termo.toLowerCase();

  return entidades.filter((entidade) => {
    switch (tipo) {
      case "cpf":
        return entidade.tipo === "PF" && entidade.cpf.includes(termo);
      case "cnpj":
        return entidade.tipo === "PJ" && entidade.cnpj?.includes(termo);
      case "email":
        return entidade.emails.some((email) =>
          email.toLowerCase().includes(termoLower)
        );
      case "telefone":
        return entidade.telefones.some((tel) => tel.numero.includes(termo));
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
