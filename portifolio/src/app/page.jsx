"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Corrigido: Substituído 'Pinterest' por 'Palette' (ou um ícone disponível)
import { Moon, Sun, Github, Palette, Mail, Menu, X, ArrowDown } from 'lucide-react'; 
import Dock from './pag_de_contatos';
import VariableProximity from './VariableProximity';

// --- Dados Mockados para Demonstração ---
const MOCK_PROJECTS = [
  { id: 1, name: "E-commerce Inovador", description: "Uma plataforma de vendas B2C com foco em usabilidade mobile e carregamento rápido.", specs: "Alto desempenho, Acessibilidade AA, SEO otimizado.", langs: ["React", "Next.js", "Tailwind CSS"] },
  { id: 2, name: "Sistema de Gestão Interna", description: "Dashboard robusto para controle de estoque, finanças e RH.", specs: "Segurança de dados, Integração API Restful, Autenticação JWT.", langs: ["Vue.js", "Node.js (Express)", "MongoDB"] },
  { id: 3, name: "App de Receitas IA", description: "Aplicativo que gera receitas com base nos ingredientes que o usuário possui.", specs: "Processamento de Linguagem Natural (NLP), UI/UX minimalista.", langs: ["Python (Flask)", "React Native", "GPT-3 API"] },
];

const TigerSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full drop-shadow-lg transition-colors duration-500"
  >
    {/* Este é um ícone estilizado de um tigre/animal para representar o símbolo do site */}
    <path d="M16 4.75a.75.75 0 0 0-1.5 0v3.75h-7V4.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0V11h7v8.25a.75.75 0 0 0 1.5 0V4.75Z" />
    <path d="M7 11h9v1H7v-1Z" /> {/* Linha 1 - Listra */}
    <path d="M7 15h9v1H7v-1Z" /> {/* Linha 2 - Listra */}
    <path d="M7 7h9v1H7V7Z" />   {/* Linha 3 - Listra */}
  </svg>
);


// --- Componente Modal de Projetos ---
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-11/12 transform transition-all duration-300 scale-100 dark:shadow-purple-900/50"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-start mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 font-serif">{project.name}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            aria-label="Fechar Modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="space-y-3 mt-6">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Especificações:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{project.specs}</p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Linguagens/Tecnologias:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.langs.map((lang, index) => (
                <span key={index} className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Componente Principal ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef(null);

  // Efeito para aplicar a classe 'dark' ao body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handler para trocar o tema
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  // Handler para navegação do carrossel
  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % MOCK_PROJECTS.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + MOCK_PROJECTS.length) % MOCK_PROJECTS.length);
  };
  
  const currentProject = useMemo(() => MOCK_PROJECTS[currentProjectIndex], [currentProjectIndex]);

  // Função para abrir o modal
  const openProjectModal = (project) => setSelectedProject(project);
  
  // Função para fechar o modal
  const closeProjectModal = () => setSelectedProject(null);

  // Dock items para a seção de links
  const dockItems = [
    { icon: <Github size={24} />, label: 'GitHub', onClick: () => window.open('https://github.com/EduardoRomaniniPessoa', '_blank') },
    { icon: <Palette size={24} />, label: 'Portifólio de Artes', onClick: () => window.open('https://pinterest.com/seuusuario', '_blank') },
    { icon: <Mail size={24} />, label: 'Email', onClick: () => (window.location.href = 'mailto:seuemail@gmail.com') },
  ];


  // --- Estrutura da Primeira Tela: Hero ---
  const HeroSection = () => (
    <div ref={containerRef} className="relative min-h-screen pt-16 px-4 md:px-12 lg:px-20">
      
      {/* Botão de Tema (Canto Superior Esquerdo) */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 left-6 p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 shadow-lg hover:ring-4 ring-purple-500/50 transition-all duration-300 z-10"
        aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Estrelas nos cantos */}
      <div className="absolute top-8 right-8 text-purple-600 dark:text-purple-400 text-4xl">★</div>
      <div className="absolute bottom-8 left-8 text-purple-600 dark:text-purple-400 text-4xl">★</div>
      <div className="absolute bottom-8 right-8 text-purple-600 dark:text-purple-400 text-4xl">★</div>

      {/* Container principal com layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh] max-w-7xl mx-auto">
        
        {/* Lado Esquerdo: Nome e Bio */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Nome com VariableProximity */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black cursor-pointer tracking-tighter text-gray-900 dark:text-white">
            <VariableProximity
              label="Eduardo Romanini"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
              radius={150}
              falloff="linear"
              className="text-purple-900 dark:text-purple-300"
            />
          </h1>
          
          {/* Bio */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Designer gráfico e desenvolvedor front-end júnior.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Formação em Belas Artes e 2 anos de experiência em projetos de UI/UX.
            </p>
          </div>
        </div>

        {/* Lado Direito: Tigre */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-64 h-64 lg:w-80 lg:h-80 text-purple-600 dark:text-purple-400 opacity-80">
            <TigerSVG />
          </div>
        </div>
      </div>

      {/* Prévia da Próxima Página (Bottom) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="flex justify-center gap-4">
          {['Sobre Mim', 'Contato', 'Loja', 'Projetos'].map((item, index) => (
            <div 
              key={index} 
              className="flex-1 max-w-[150px] h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500 dark:text-gray-400">
        <ArrowDown size={32} />
      </div>
    </div>
  );


  // --- Estrutura da Segunda Tela: Conteúdo ---
  const SecondSection = () => (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Caixas: Sobre Mim e Loja */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          
          {/* Caixa Sobre Mim */}
          <InfoBox title="Sobre Mim" icon={<Menu size={28} className="text-purple-600 dark:text-purple-400" />}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sou um criativo apaixonado por unir arte visual e tecnologia. Meu foco é criar experiências digitais que sejam não apenas funcionais, mas visualmente memoráveis.
            </p>
            <p className="mt-2 text-xs text-purple-500 dark:text-purple-300 font-medium">
              Leia mais sobre minha jornada...
            </p>
          </InfoBox>

          {/* Caixa Loja (Novo Requisito) */}
          <InfoBox title="Loja" icon={<Sun size={28} className="text-purple-600 dark:text-purple-400" />}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adquira minhas artes digitais, prints e assets exclusivos. Em breve: tutoriais e brushes personalizados!
            </p>
            <p className="mt-2 text-xs text-purple-500 dark:text-purple-300 font-medium">
              Visite a loja online!
            </p>
          </InfoBox>
        </div>

        {/* Seção Projetos */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white border-b-4 border-purple-500 inline-block mx-auto pb-1 font-serif">
          PROJETOS
        </h2>
        
        {/* Carrossel de Projetos */}
        <div className="relative flex items-center justify-center p-4">
          
          {/* Botão Anterior */}
          <button
            onClick={handlePrevProject}
            className="absolute left-0 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl z-20"
            aria-label="Projeto Anterior"
          >
            &lt;
          </button>
          
          {/* Projeto Atual no Carrossel */}
          <div 
            className="w-11/12 md:w-2/3 h-80 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 cursor-pointer transform hover:scale-[1.02] transition-transform duration-500 border-4 border-purple-300 dark:border-purple-600"
            onClick={() => openProjectModal(currentProject)}
            aria-label={`Visualizar detalhes do projeto ${currentProject.name}`}
          >
            <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">{currentProject.name}</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-sm">
              {currentProject.description}
            </p>
            <span className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors">
              Clique para ver Detalhes
            </span>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNextProject}
            className="absolute right-0 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl z-20"
            aria-label="Próximo Projeto"
          >
            &gt;
          </button>
        </div>

        {/* Indicadores do Carrossel */}
        <div className="flex justify-center gap-2 mt-8">
          {MOCK_PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProjectIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProjectIndex
                  ? 'bg-purple-600 w-6 dark:bg-yellow-400'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Ir para o projeto ${index + 1}`}
            />
          ))}
        </div>

        {/* Seção de Links/Redes Sociais (Github, Pinterest, Gmail) */}
        <div className="mt-24 p-6 text-center border-t border-purple-300 dark:border-purple-700 relative">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Conecte-se e veja mais projetos
          </h3>
          <Dock items={dockItems} panelHeight={60} baseItemSize={45} magnification={75} spring={{ mass: 0, stiffness: 50, damping: 30 }} distance={10} />
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 overflow-x-hidden">
      {/* Container principal para o "Fundo daora" (gradiente sutil) */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
        <HeroSection />
        <SecondSection />
      </div>
      
      {/* Modal é renderizado sobre todo o conteúdo */}
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      
      {/* Fonte global migrada para `src/app/globals.css` */}
    </div>
  );
}

// --- Componentes Auxiliares ---

// Componente para as caixas de informação (Sobre Mim, Contato, Loja)
const InfoBox = ({ title, icon, children }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 border-l-4 border-purple-500 dark:border-purple-400">
    <div className="flex items-center space-x-3 mb-3">
      {icon}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    {children}
  </div>
);

// Componente para os links de redes sociais
const SocialLink = ({ Icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center p-3 sm:p-4 rounded-full transition-all duration-300 bg-gray-100 dark:bg-gray-700 hover:bg-purple-500 dark:hover:bg-purple-600 transform hover:scale-105 shadow-md"
    aria-label={label}
  >
    <Icon size={32} className="text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors" />
    <span className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors hidden sm:block">
      {label}
    </span>
  </a>
)