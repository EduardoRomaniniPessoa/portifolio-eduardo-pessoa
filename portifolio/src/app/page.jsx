"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Corrigido: Substituído 'Pinterest' por 'Palette' (ou um ícone disponível)
import { Moon, Sun, Github, Palette, Mail, Menu, X, ArrowDown } from 'lucide-react'; 
import Dock from './pag_de_contatos';
import VariableProximity from './VariableProximity';
import Squares from '../components/Squares';

// --- Dados Mockados para Demonstração ---
const MOCK_PROJECTS = [
  { id: 1, name: "Simpliza", description: "Aplicativo de gerenciamento de renda mensal para microempreendedores (MEI). Desenvolvido como TCC na ETEC.", specs: "Gestão financeira simplificada, Dashboard intuitivo, Controle de receitas e despesas, Relatórios mensais.", langs: ["JavaScript", "Node.js", "React", "MongoDB"], githubUrl: "https://github.com/DanielAzeved0/Simpliza-TCC" },
  { id: 2, name: "Cerne", description: "Aplicativo mobile modelado para aulas na ETEC. Bloco de notas com funcionalidade de desenho integrada.", specs: "Sincronização em tempo real, Interface intuitiva, Armazenamento em nuvem, Desenho digital.", langs: ["JavaScript", "Firebase", "React Native"], githubUrl: "https://github.com/igorgianeri/projeto-blocodenotas" },
  { id: 3, name: "Sol do Sertão", description: "Site de restaurante com cardápio digital. Meu primeiro projeto quando cheguei na ETEC - o início da minha jornada.", specs: "Cardápio responsivo, Design intuitivo, Informações do restaurante, Galeria de pratos.", langs: ["HTML", "CSS"], githubUrl: "https://github.com/EduardoRomaniniPessoa/restaurante" },
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
          <h3 className="text-3xl font-extrabold text-black dark:text-white">{project.name}</h3>
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

          {project.githubUrl && (
            <div className="pt-4 flex gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold hover:opacity-80 transition-opacity"
              >
                <Github size={20} />
                Ver no GitHub
              </a>
            </div>
          )}
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
        
        <div className="space-y-4 mt-6 max-h-96 overflow-y-auto pr-2">
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
            
            {/* Nome com estilo Cyber Y2K */}
            <div className="relative inline-block mb-4">
              {/* Ícone de estrela com cores diferentes para modo claro e escuro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300 text-[10rem] sm:text-[12rem] lg:text-[15rem] opacity-80">★</span>
              </div>
              {/* Título principal */}
              <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Eduardo Romanini
              </h1>
              {/* Subtítulo */}
              <h2 className="relative text-lg sm:text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                Freelance Creative
              </h2>
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
            className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-black/50 dark:hover:shadow-white/50 transition-all duration-300 border-l-4 border-black dark:border-white cursor-pointer transform hover:scale-[1.02]"
            onMouseEnter={() => {
              const img = document.getElementById("sobre-mim-image");
              if (img) img.style.display = "block";
            }}
            onMouseLeave={() => {
              const img = document.getElementById("sobre-mim-image");
              if (img) img.style.display = "none";
            }}
            onClick={() => openInfoModal({
              title: 'Sobre Mim',
              content: (
                <>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    oiee! sou o edu, um jovem desenhista, estudante e desenvolvedor web, voltado para a area de ui, eu ...
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li>crio wireframes de sites;</li>
                    <li>faço comissões para desenhos;</li>
                    <li>personalizo roupas (costura e pintura);</li>
                    <li>procuro aprender sobre dev web frontend!!</li>
                  </ul>
                  
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">utilizo essas linguagens</h4>
                    <p className="text-gray-700 dark:text-gray-300">português, inglês, espanhol e francês</p>
                  </div>
                  
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">interesses</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>desenvolvimento de música</li>
                      <li>zelda</li>
                      <li>design</li>
                      <li>arte em geral</li>
                    </ul>
                  </div>
                </>
              )
            })}
          >
            <JumpingImage src="/src/app/fro.png" alt="Sobre Mim" id="sobre-mim-image" />
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
            className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-black/50 dark:hover:shadow-white/50 transition-all duration-300 border-l-4 border-black dark:border-white cursor-pointer transform hover:scale-[1.02] scroll-mt-20"
            onMouseEnter={() => {
              const img = document.getElementById("loja-image");
              if (img) img.style.display = "block";
            }}
            onMouseLeave={() => {
              const img = document.getElementById("loja-image");
              if (img) img.style.display = "none";
            }}
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
                </>
              )
            })}
          >
            <JumpingImage src="/path/to/loja.jpg" alt="Loja" id="loja-image" />
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

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleModalMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleModalMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setModalPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleModalMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleModalMouseMove);
      window.addEventListener('mouseup', handleModalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleModalMouseMove);
        window.removeEventListener('mouseup', handleModalMouseUp);
      };
    }
  }, [isDragging, handleModalMouseMove, handleModalMouseUp]);

  // Adicionando lógica para garantir que o modal movível e as imagens com física sejam renderizadas corretamente

  // --- Modal Movível ---
  const DraggableModal = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    };

    const handleMouseMove = useCallback(
      (e) => {
        if (isDragging) {
          setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          });
        }
      },
      [isDragging, dragStart]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
      <div
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="absolute bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
      >
        {children}
      </div>
    );
  };

  // --- Componente de Física das Imagens ---
  const PhysicsImages = () => {
    const images = [
      { id: 1, src: '/path/to/image1.jpg', x: 100, y: 200 },
      { id: 2, src: '/path/to/image2.jpg', x: 300, y: 400 },
      { id: 3, src: '/path/to/image3.jpg', x: 500, y: 100 },
      { id: 4, src: '/path/to/image4.jpg', x: 700, y: 300 },
    ];

    return (
      <div className="relative w-full h-full">
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ x: image.x, y: image.y }}
            animate={{
              x: [image.x, image.x + Math.random() * 50 - 25, image.x],
              y: [image.y, image.y + Math.random() * 50 - 25, image.y],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full shadow-lg border border-gray-300 dark:border-gray-500"
          >
            {/* Local de inserção da imagem */}
            <img
              src="/src/app/fro.png" // Substitua pelo caminho da imagem desejada
              alt={`Imagem ${image.id}`}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  // Corrigindo a definição do componente JumpingImage
  // --- Componente para Animação de Pulo ---
  const JumpingImage = ({ src, alt, id }) => {
    return (
      <motion.img
        id={id}
        src={src}
        alt={alt}
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [1, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute w-16 h-16 object-cover rounded-full"
        style={{ display: "none" }}
      />
    );
  };

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
      
      {/* Container principal para o "Fundo chave" (gradiente sutil) */}
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

{/* Componente Movível para Título com Imagens de Fundo */}
const DraggableTitle = () => {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setModalPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

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

  const imageSections = [
    { id: 1, x: 100, y: 200 },
    { id: 2, x: 300, y: 400 },
    { id: 3, x: 500, y: 100 },
    { id: 4, x: 700, y: 300 },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Modal Movível */}
      <motion.div
        ref={modalRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className="absolute bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Eduardo Romanini</h1>
        <h2 className="text-lg text-gray-700 dark:text-gray-300">Freelance Creative</h2>
      </motion.div>

      {/* Sessões de Imagens com Física */}
      {imageSections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ y: section.y, x: section.x }}
          animate={{ y: [section.y, section.y + 50, section.y], x: section.x }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg shadow-lg border border-gray-300 dark:border-gray-500"
        >
          {/* Insira sua imagem aqui */}
          <img
            src="" // Adicione o caminho da imagem
            alt="Imagem"
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  );
}