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

## 📋 Funcionalidades

### Tela Principal: "Busca de Entidades"
- **Título**: Consulta de Dados Básicos
- **Descrição**: Encontre as informações essenciais de seus investigados
- **Formulário de busca**:
  - Seletor para CPF/CNPJ, email, telefone, endereço ou nome
  - Campo de input obrigatório com máscara e validação
  - Botão "Pesquisar"
- **Resultados recentes**: 
  - Lista das últimas pesquisas realizadas
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
git clone https://github.com/seu-usuario/consulta-dados-basicos.git
cd consulta-dados-basicos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
```

4. **Abra o navegador**
O projeto estará disponível em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🎨 Design System

O projeto utiliza o design system da Leme Forense com as seguintes cores:
- **Primary**: #27465E (Azul escuro)
- **Secondary**: #F9B233 (Laranja)
- **Background**: #F5F7FA (Cinza claro)
- **Text**: #333 (Cinza escuro)

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Dados de Teste

Para testar a aplicação, você pode usar os seguintes dados:

### CPFs para teste:
- 123.456.789-00
- 987.654.321-00
- 456.789.123-00

### CNPJs para teste:
- 12.345.678/0001-90
- 98.765.432/0001-10
- 76.543.210/0001-20

### E-mails para teste:
- lucas@email.com
- maria@email.com
- contato@empresa.com

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── BuscaForm.tsx          # Formulário de busca
│   ├── DetalhesModal.tsx      # Modal de detalhes
│   ├── ResultadosRecentes.tsx # Lista de resultados recentes
│   └── ResultadoPesquisa.tsx  # Tela de resultados
├── App.tsx                    # Componente principal
├── main.tsx                   # Ponto de entrada
└── types/
    └── entities.ts            # Tipos TypeScript
```

## 🚀 Deploy

Para fazer o deploy do projeto:

1. **Gere a build de produção**
```bash
npm run build
```

2. **Os arquivos estarão na pasta `dist/`**
3. **Faça upload dos arquivos para seu servidor web**

## 📄 Licença

Este projeto foi desenvolvido como parte do desafio técnico para a Leme Forense.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ seguindo as melhores práticas de desenvolvimento React e TypeScript.
