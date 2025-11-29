oieee, vou atualizando esse read.me conforme for atualizando o portifolio
aqui vou colocar

 - processo da construção do código
 - o que precisa ser instalado para rodar o código
 - atualizações de código
 - o que precisa ser atualizado
 - observações

## 📋 Processo da Construção do Código

Este portfólio foi desenvolvido utilizando **Next.js 15** com **TypeScript** e **Tailwind CSS**. O projeto é um SPA (Single Page Application) que showcaseia meus projetos e informações profissionais.

### Arquitetura
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS + CSS Modules
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Linguagem**: JSX/TSX

### Componentes Principais
1. **ProjectModal**: Componente que exibe detalhes dos projetos com links do GitHub
2. **InfoModal**: Modal para exibir informações (Sobre Mim, etc)
3. **Dock**: Componente para links de redes sociais
4. **VariableProximity**: Efeito visual de proximidade
5. **Squares**: Componente decorativo de quadrados
6. **JumpingImage**: Componente de imagem com animação

---

## 🛠️ O que Precisa Ser Instalado

Para rodar este projeto localmente, você precisa ter:

### Requisitos
- **Node.js** (v18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para clonar o repositório)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EduardoRomaniniPessoa/portifolio-eduardo-pessoa.git
cd portifolio-eduardo-pessoa/portifolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador e acesse:
```
http://localhost:3000
```

### Dependências Principais
```json
{
  "next": "^15.1.0",
  "react": "^19.0.0-rc",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.263.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 📝 Atualizações de Código

### Versão Atual

#### Projetos Adicionados
- **Simpliza**: Aplicativo de gerenciamento de renda para MEI (JavaScript, Node.js, React, MongoDB)
- **Cerne**: App mobile de bloco de notas com desenho (JavaScript, Firebase, React Native)
- **Sol do Sertão**: Site de restaurante com cardápio (HTML, CSS)

#### Funcionalidades Implementadas
- ✅ Links do GitHub para cada projeto
- ✅ Modal arrastável com detalhes dos projetos
- ✅ Seção "Sobre Mim" com scroll
- ✅ Tema claro/escuro
- ✅ Carrossel de projetos
- ✅ Responsividade completa

#### Melhorias Recentes
- Padronização de fonte (Poppins) para títulos dos projetos
- Adição de scroll no modal de informações
- Conteúdo atualizado na seção "Sobre Mim"

---

## 📌 O que Precisa Ser Atualizado

### Próximas Tarefas
- [ ] Adicionar mais projetos conforme forem desenvolvidos
- [ ] Implementar página de contato funcional
- [ ] Integrar com serviço de email
- [ ] Adicionar seção de skills/tecnologias
- [ ] Criar página de blog ou artigos
- [ ] Melhorar performance (lazy loading de imagens)
- [ ] Adicionar testes automatizados
- [ ] Implementar PWA (Progressive Web App)
- [ ] SEO otimizado

### Bugs Conhecidos
- Nenhum no momento

---

## 📌 Observações

### Estrutura de Pastas
```
portifolio/
├── src/
│   ├── app/
│   │   ├── page.jsx (página principal)
│   │   ├── layout.tsx (layout raiz)
│   │   ├── globals.css (estilos globais)
│   │   ├── pag_de_contatos.tsx
│   │   └── VariableProximity.jsx
│   └── components/
│       ├── Squares.jsx
│       └── VariableProximity.jsx
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.js
```

### Notas Importantes
1. **Projetos Mockados**: Os dados dos projetos estão em um array `MOCK_PROJECTS` no `page.jsx`. Você pode atualizar diretamente ali.
2. **Modo Dark**: O site suporta tema escuro/claro. A preferência é salva no navegador.
3. **Links Externos**: Os links dos projetos apontam para os repositórios reais no GitHub.
4. **Responsividade**: O design é totalmente responsivo e funciona bem em mobile, tablet e desktop.
5. **Animações**: As animações são feitas com Framer Motion e CSS Tailwind.

### Como Adicionar um Novo Projeto
1. Vá até `src/app/page.jsx`
2. Localize o array `MOCK_PROJECTS`
3. Adicione um novo objeto com a estrutura:
```javascript
{
  id: 4,
  name: "Nome do Projeto",
  description: "Descrição breve",
  specs: "Especificações técnicas",
  langs: ["Linguagem1", "Linguagem2"],
  githubUrl: "https://github.com/seu-link"
}
```

### Como Atualizar a Seção "Sobre Mim"
1. Vá até `src/app/page.jsx`
2. Procure por `openInfoModal` na seção "Sobre Mim"
3. Edite o JSX dentro de `content`

### Build para Produção
```bash
npm run build
npm start
```

### Troubleshooting
- **Porta já em uso**: Altere a porta padrão com `npm run dev -- -p 3001`
- **Cache de build**: Limpe com `rm -rf .next` e rode novamente
- **Dependências corrompidas**: Remova `node_modules` e rode `npm install` novamente

---

**Última atualização**: 28/11/2025
**Desenvolvedor**: Eduardo Romanini Pessoa
**GitHub**: [@EduardoRomaniniPessoa](https://github.com/EduardoRomaniniPessoa)