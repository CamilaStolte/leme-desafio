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
- **Tailwind CSS** - Framework CSS para estilização moderna
- **Lucide React** - Biblioteca de ícones

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

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
# Executar em modo de desenvolvimento
npm run dev

```

## 🧪 Como Testar

### Dados de Teste Disponíveis

A aplicação possui dados mockados para demonstração. Você pode testar com os seguintes valores:

#### Pessoas Físicas (CPF):
- **Lucas Silva**: `123.456.789-01`
- **João Santos**: `123.789.456-01`
- **Maria Oliveira**: `456.789.123-10`

#### Pessoas Jurídicas (CNPJ):
- **Empresa Exemplo Ltda**: `12.345.678/0001-99`
- **Comércio ABC Ltda**: `98.765.432/0001-10`

#### E-mails:
- `lucas@lemeforense.com.br`
- `joao@lemeforense.com.br`
- `maria@gmail.com`
- `contato@empresaexemplo.com.br`
- `vendas@abc.com.br`

#### Telefones:
- `(11) 91234-5678`
- `(11) 98765-4321`
- `(21) 91234-5678`
- `(11) 4002-8922`

#### Nomes:
- `Lucas`
- `João`
- `Maria`
- `Empresa`
- `Comércio`

#### Endereços:
- `São Paulo`
- `Rio de Janeiro`
- `Centro`
- `Jardins`
- `Copacabana`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── types/              # Definições de tipos TypeScript
├── services/           # Funções de API e serviços
├── hooks/              # Custom hooks
├── utils/              # Funções utilitárias
├── styles/             # Arquivos de estilo
└── __tests__/          # Testes unitários
```

## 🎨 Design System

O projeto utiliza uma paleta de cores moderna e componentes consistentes:

- **Cores primárias**: Tons de azul e índigo
- **Tipografia**: Sistema de fontes hierárquico
- **Espaçamento**: Grid system responsivo
- **Componentes**: Cards, modais, botões e formulários padronizados

## 🔄 Funcionalidades Implementadas

- [x] Busca por diferentes tipos de dados
- [x] Exibição de resultados com filtros
- [x] Modal de detalhes completo
- [x] Histórico de pesquisas recentes
- [x] Loading states e tratamento de erros
- [x] Design responsivo
- [x] Validação de formulários
- [x] Busca parcial e inteligente

