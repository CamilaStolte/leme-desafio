# Consulta de Dados Básicos - Dashboard

Um dashboard moderno e responsivo para busca e exibição de dados públicos de pessoas físicas (PF) e pessoas jurídicas (CNPJ), simulando o funcionamento do módulo Consulta de Dados Básicos da plataforma SONAR.

## 🚀 Tecnologias Utilizadas

### Tecnologias Obrigatórias

- **React** - Componentização clara, uso correto de hooks
- **TypeScript** - Tipagem adequada em props, states e APIs

### Tecnologias Diferenciais

- **Vite** - Servidor de desenvolvimento do projeto React
- **PrimeReact** - Utilização de componentes (InputMask)
- **Material-UI** - Design system e componentes responsivos
- **React Hook Form** - Para criação de formulários
- **Zod** - Para validação de formulários com React Hook Form
- **React Query** - Para chamadas assíncronas, gerenciamento de loading, erro e cache

## 📋 Funcionalidades

### Tela Principal: "Busca de Entidades"

- **Título**: Consulta de Dados Básicos
- **Descrição**: Encontre as informações essenciais de seus investigados
- **Formulário de busca**:
  - Seletor para CPF/CNPJ, email, telefone, endereço ou nome
  - Campo de input obrigatório com máscara e validação
  - Botão "Pesquisar"
- **Resultados recentes**:
  - Lista dinâmica das últimas 10 pesquisas realizadas
  - Botão "Ver detalhes" para exibir dados em modal

### Tela de Resultados: "Resultados Encontrados"

- **Título**: Resultado da Pesquisa
- **Filtros**: Opção para exibir pessoas e empresas
- **Área de resultados**: Exibir entidades encontradas ou mensagem de retorno vazio
- **Botão "Ver detalhes"** ao lado de cada entidade

### Modal de Detalhes: "Detalhes da Entidade"

#### Para Pessoas Físicas:

- Nome
- CPF
- Sexo
- Data de Nascimento
- Nome da Mãe
- Telefones
- E-mails
- Endereços

#### Para Empresas:

- Nome
- CNPJ
- Capital Social
- Data de Início das Atividades
- Situação Cadastral
- CNAE principal
- Telefones
- E-mails
- Endereços
- Quadro Societário

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/leme-desafio.git
cd leme-desafio
```
