"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Corrigido: Substituído 'Pinterest' por 'Palette' (ou um ícone disponível)
import { Moon, Sun, Github, Palette, Mail, Menu, X, ArrowDown } from 'lucide-react'; 
import Dock from './pag_de_contatos';
import VariableProximity from './VariableProximity';
import Squares from '../components/Squares';

// --- Dados Mockados para Demonstração ---
const MOCK_PROJECTS = [
  { id: 1, name: "E-commerce Inovador", description: "Uma plataforma de vendas B2C com foco em usabilidade mobile e carregamento rápido.", specs: "Alto desempenho, Acessibilidade AA, SEO otimizado.", langs: ["React", "Next.js", "Tailwind CSS"] },
  { id: 2, name: "Sistema de Gestão Interna", description: "Dashboard robusto para controle de estoque, finanças e RH.", specs: "Segurança de dados, Integração API Restful, Autenticação JWT.", langs: ["Vue.js", "Node.js (Express)", "MongoDB"] },
  { id: 3, name: "App de Receitas IA", description: "Aplicativo que gera receitas com base nos ingredientes que o usuário possui.", specs: "Processamento de Linguagem Natural (NLP), UI/UX minimalista.", langs: ["Python (Flask)", "React Native", "GPT-3 API"] },
];


// --- Componente Modal de Projetos ---
const ProjectModal = ({ project, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return; // Não arrastar se clicar no botão de fechar
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[2px] transition-opacity duration-300">
      <div
        ref={modalRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-11/12 transform transition-shadow duration-300 dark:shadow-white/50 border-2 border-gray-300 dark:border-gray-600"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-start mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-extrabold text-black dark:text-white font-serif">{project.name}</h3>
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
                <span key={index} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-black dark:bg-gray-600 dark:text-white">
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

// --- Componente Modal de Informações (Sobre Mim / Loja) ---
const InfoModal = ({ info, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return; // Não arrastar se clicar no botão de fechar
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[2px] transition-opacity duration-300">
      <div
        ref={modalRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-11/12 transform transition-shadow duration-300 dark:shadow-white/50 border-2 border-gray-300 dark:border-gray-600"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-start mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-extrabold text-black dark:text-white">{info.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            aria-label="Fechar Modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 mt-6">
          {info.content}
        </div>
      </div>
    </div>
  );
};


// --- Componente Principal ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [navPosition, setNavPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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

  // Função para abrir modal de info
  const openInfoModal = (info) => setSelectedInfo(info);
  
  // Função para fechar modal de info
  const closeInfoModal = () => setSelectedInfo(null);

  // Handlers para arrastar a navegação
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - navPosition.x,
      y: e.clientY - navPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setNavPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

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
        className="absolute top-6 left-6 p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 shadow-lg hover:ring-4 ring-black/50 dark:ring-white/50 transition-all duration-300 z-10"
        aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Estrelas espalhadas */}
      <div className="absolute top-8 right-4 sm:right-8 text-black dark:text-white text-2xl sm:text-4xl">★</div>
      <div className="absolute bottom-8 left-4 sm:left-8 text-black dark:text-white text-2xl sm:text-4xl">★</div>
      <div className="absolute bottom-8 right-4 sm:right-8 text-black dark:text-white text-2xl sm:text-4xl">★</div>
      <div className="hidden sm:block absolute top-1/4 left-16 text-black dark:text-white text-2xl opacity-60">★</div>
      <div className="hidden sm:block absolute top-1/3 right-24 text-black dark:text-white text-3xl opacity-70">★</div>
      <div className="hidden sm:block absolute bottom-1/4 right-32 text-black dark:text-white text-2xl opacity-50">★</div>
      <div className="hidden sm:block absolute top-2/3 left-24 text-black dark:text-white text-3xl opacity-60">★</div>

      {/* Container principal com layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh] max-w-7xl mx-auto">
        
        {/* Lado Esquerdo: Nome e Bio */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Painel expandido com nome e sobre mim */}
          <div className="relative bg-gray-200 dark:bg-gray-600 rounded-lg p-4 sm:p-6 shadow-lg">
            {/* Estrela no vértice superior direito do painel */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-black dark:text-white text-4xl sm:text-6xl transform rotate-12">★</div>
            
            {/* Nome com VariableProximity */}
            <div className="relative inline-block mb-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black cursor-pointer tracking-tighter text-gray-900 dark:text-white" style={{ fontFamily: '"Limelight", sans-serif' }}>
                <VariableProximity
                  label="Eduardo Romanini"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={150}
                  falloff="linear"
                  className="text-black dark:text-white"
                />
              </h1>
            </div>
            
            {/* Sobre Mim */}
            <div className="border-t border-gray-400 dark:border-gray-500 pt-4 mt-2">
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                  oiee!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prévia da Próxima Página (Bottom) - Fixo apenas na primeira tela */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[95vw] sm:w-fit px-2 sm:px-4">
        <div className="flex gap-2 sm:gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div 
            onClick={() => document.getElementById('sobre-mim-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 whitespace-nowrap"
          >
            Sobre Mim
          </div>
          <div 
            onClick={() => document.getElementById('loja-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 whitespace-nowrap"
          >
            Loja
          </div>
          <div 
            onClick={() => document.getElementById('projetos-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 whitespace-nowrap"
          >
            Projetos
          </div>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500 dark:text-gray-400">
        <ArrowDown size={24} className="sm:w-8 sm:h-8" />
      </div>
    </div>
  );


  // --- Estrutura da Segunda Tela: Conteúdo ---
  const SecondSection = () => (
    <div className="min-h-screen py-20 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Caixas: Sobre Mim e Loja */}
        <div id="sobre-mim-section" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto scroll-mt-20">
          
          {/* Caixa Sobre Mim */}
          <div 
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-black/50 dark:hover:shadow-white/50 transition-all duration-300 border-l-4 border-black dark:border-white cursor-pointer transform hover:scale-[1.02]"
            onClick={() => openInfoModal({
              title: 'Sobre Mim',
              content: (
                <>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    oi! sou edu, um desenhista e estudante e desenvolvedor web. eu...
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                    <li>crio wireframes de sites, e</li>
                    <li>faço desenvolvimento web frontend!</li>
                  </ul>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Formação:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Curso de Desenvolvimento de Sistemas na Etec</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-3">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Linguagens:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Inglês, Espanhol e Português</p>
                  </div>
                </>
              )
            })}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Menu size={28} className="text-black dark:text-white" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sobre Mim</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Descubra mais sobre mim!!
            </p>
            <p className="mt-2 text-xs text-black dark:text-white font-medium">
              Clique para saber mais...
            </p>
          </div>

          {/* Caixa Loja */}
          <div 
            id="loja-section"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-black/50 dark:hover:shadow-white/50 transition-all duration-300 border-l-4 border-black dark:border-white cursor-pointer transform hover:scale-[1.02] scroll-mt-20"
            onClick={() => openInfoModal({
              title: 'Loja',
              content: (
                <>
                  <h2 className="text-2xl font-bold text-center text-orange-500 dark:text-white mb-6">
                    Disponível em breve
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Adquira minhas artes digitais, prints e assets exclusivos. Em breve: tutoriais e brushes personalizados!
                  </p>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Disponível:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Artes digitais exclusivas</li>
                      <li>• Prints de alta qualidade</li>
                      <li>• Assets para designers</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-3">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Em breve:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Tutoriais personalizados</li>
                      <li>• Brushes customizados</li>
                      <li>• Comissões abertas</li>
                    </ul>
                  </div>
                </>
              )
            })}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Sun size={28} className="text-black dark:text-white" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Loja</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adquira alguma comissão minha;
            </p>
            <p className="mt-2 text-xs text-black dark:text-white font-medium">
              Clique para ver a loja...
            </p>
          </div>
        </div>

        {/* Seção Projetos */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Painel Lateral - Tecnologias Preferidas */}
          <div className="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-black dark:border-white pb-2">
              Tecnologias Preferidas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-800 dark:text-white font-semibold">Python</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-800 dark:text-white font-semibold">JavaScript</span>
              </div>
            </div>
          </div>

          {/* Área Principal de Projetos */}
          <div className="flex-1">
            <h2 id="projetos-section" className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white border-b-4 border-black dark:border-white inline-block mx-auto pb-1 scroll-mt-20">
              PROJETOS
            </h2>
            
            {/* Carrossel de Projetos */}
            <div className="relative flex items-center justify-center p-4">
          
          {/* Botão Anterior */}
          <button
            onClick={handlePrevProject}
            className="absolute left-0 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-xl z-20"
            aria-label="Projeto Anterior"
          >
            &lt;
          </button>
          
          {/* Projeto Atual no Carrossel */}
          <div 
            className="w-11/12 md:w-2/3 h-80 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 cursor-pointer transform hover:scale-[1.02] transition-transform duration-500 border-4 border-black dark:border-white"
            onClick={() => openProjectModal(currentProject)}
            aria-label={`Visualizar detalhes do projeto ${currentProject.name}`}
          >
            <h3 className="text-3xl font-bold text-black dark:text-white mb-4">{currentProject.name}</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-sm">
              {currentProject.description}
            </p>
            <span className="mt-4 px-4 py-2 bg-gray-200 text-black dark:bg-gray-600 dark:text-white rounded-full text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              Clique para ver Detalhes
            </span>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNextProject}
            className="absolute right-0 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 shadow-xl z-20"
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
                  ? 'bg-black w-6 dark:bg-white animate-pulse'
                  : 'bg-gray-300 dark:bg-gray-600 hover:scale-125'
              }`}
              aria-label={`Ir para o projeto ${index + 1}`}
            />
          ))}
        </div>
          </div>
        </div>

        {/* Seção de Links/Redes Sociais (Github, Pinterest, Gmail) */}
        <div className="mt-24 p-6 text-center border-t border-black dark:border-white relative">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Conecte-se comigo e veja mais projetos !
          </h3>
          <Dock items={dockItems} panelHeight={60} baseItemSize={45} magnification={75} spring={{ mass: 0, stiffness: 50, damping: 30 }} distance={10} />
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 overflow-x-hidden relative">
      {/* Fundo animado com Squares */}
      <div className="fixed inset-0 z-0" style={{ opacity: 0.15 }}>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='#666'
          hoverFillColor='#333'
        />
      </div>
      
      {/* Container principal para o "Fundo daora" (gradiente sutil) */}
      <div className="relative z-10">
        <HeroSection />
        <SecondSection />
      </div>
      
      {/* Modal é renderizado sobre todo o conteúdo */}
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      <InfoModal info={selectedInfo} onClose={closeInfoModal} />
      
      {/* Fonte global migrada para `src/app/globals.css` */}
    </div>
  );
}

// --- Componentes Auxiliares ---

// Componente para as caixas de informação (Sobre Mim, Contato, Loja)
const InfoBox = ({ title, icon, children }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-black/50 dark:hover:shadow-white/50 transition-all duration-300 border-l-4 border-black dark:border-white">
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