import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, MessageCircle, Building, Car,
  TrendingUp, ShieldCheck, Clock, ChevronRight,
  Phone, Zap, Rocket, Crosshair, Lock, ChevronDown,
  LineChart, Wallet, ArrowRightLeft, Sparkles, CheckCircle2,
  Send, User
} from 'lucide-react';

// --- ADVANCED HOOKS ---

// 1. Hook para revelação suave ao rolar (Smooth Scroll Reveal)
const useReveal = (threshold = 0.1, delay = 0) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return [ref, isVisible];
};

// 2. Componente de Revelação Wrapper
const Reveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [ref, isVisible] = useReveal(0.1, delay);

  const getDirectionClass = () => {
    if (direction === "up") return "translate-y-12";
    if (direction === "down") return "-translate-y-12";
    if (direction === "left") return "translate-x-12";
    if (direction === "right") return "-translate-x-12";
    return "";
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 transform-none" : `opacity-0 ${getDirectionClass()}`
        } ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  );
};

// 3. Hook para rastrear a posição do mouse (Efeito Glow nos Cards)
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = ev => setMousePosition({ x: ev.clientX, y: ev.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

// --- COMPONENTS ---

const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
      {/* Grade futurista sutil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      ></div>

      {/* Luzes ambientes com movimento lento */}
      <div className="absolute w-[70vw] h-[70vw] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ top: '-20%', left: '-10%', animationDuration: '8s' }}></div>
      <div className="absolute w-[60vw] h-[60vw] bg-emerald-900/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ bottom: '-20%', right: '-10%', animationDuration: '12s' }}></div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/70 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent border-transparent py-6'} ${isOpen ? 'bg-zinc-950/95 backdrop-blur-3xl border-b border-white/10' : ''}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative z-20">
        <a href="#inicio" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-500 blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-8 h-8 bg-zinc-900 border border-amber-500/30 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
              <Crosshair size={16} className="text-amber-500 relative z-10" />
            </div>
          </div>
          Danka<span className="text-zinc-500 font-light">Patrimônio</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#engenharia" className="hover:text-white transition-colors">Engenharia</a>
            <a href="#simulador" className="hover:text-white transition-colors flex items-center gap-1">Simulador <Sparkles size={12} className="text-amber-500" /></a>
            <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
          </div>
          <a href="#contato" className="relative group overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500" style={{ backgroundSize: '200% auto' }}></span>
            <div className="relative flex items-center gap-2 bg-zinc-950 px-6 py-2.5 rounded-full border border-emerald-500/30 group-hover:bg-zinc-900 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-white font-semibold text-sm tracking-wide">ÁREA VIP</span>
            </div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="flex flex-col px-6 py-8 gap-6">
          <a href="#engenharia" onClick={() => setIsOpen(false)} className="text-xl font-medium text-zinc-300 hover:text-white transition-colors">Engenharia</a>
          <a href="#simulador" onClick={() => setIsOpen(false)} className="text-xl font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2">Simulador <Sparkles size={16} className="text-amber-500" /></a>
          <a href="#faq" onClick={() => setIsOpen(false)} className="text-xl font-medium text-zinc-300 hover:text-white transition-colors">Dúvidas</a>

          <div className="pt-6 border-t border-white/10">
            <a href="#contato" onClick={() => setIsOpen(false)} className="relative group overflow-hidden rounded-xl p-[1px] w-full block text-center mt-2">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 rounded-xl opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500" style={{ backgroundSize: '200% auto' }}></span>
              <div className="relative flex justify-center items-center gap-2 bg-zinc-950 px-6 py-4 rounded-xl border border-emerald-500/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-white font-semibold text-lg tracking-wide">ACEDER ÁREA VIP</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  // Efeito tilt para o dashboard
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // max 20 deg
    const y = (clientY / window.innerHeight - 0.5) * -20;
    setTilt({ x, y });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden z-10" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content */}
          <div className="lg:col-span-6 relative z-20">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                O Novo Padrão de Aquisição
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tighter">
                Hackeie o <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">sistema.</span><br />
                Cresça.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed font-light">
                Juros compostos são excelentes para quem recebe, péssimos para quem paga. A Danka inverte a lógica do mercado para alavancar seu patrimônio.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a href="#simulador" className="w-full sm:w-auto relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <button className="relative w-full flex items-center justify-center gap-3 bg-white text-zinc-950 px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform duration-300">
                    Testar Simulador <ArrowRightLeft size={18} />
                  </button>
                </a>
                <a href="#contato" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 transition-all text-center flex items-center justify-center gap-2">
                  Falar com Consultor <ChevronRight size={18} className="text-zinc-500" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Interactive 3D Dashboard */}
          <div className="lg:col-span-6 relative z-20 hidden lg:block" style={{ perspective: '1000px' }}>
            <Reveal delay={400} className="w-full h-full">
              <div
                className="relative transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Efeito de brilho de fundo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 blur-3xl rounded-[3rem] -z-10"></div>

                {/* Interface principal */}
                <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
                        <Wallet className="text-amber-400 w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mb-1">Patrimônio Alvo</p>
                        <p className="text-white font-bold text-lg">Imóvel Premium</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-emerald-400 text-xs font-bold tracking-wide">CRÉDITO APROVADO</span>
                    </div>
                  </div>

                  {/* Main Value */}
                  <div className="mb-10 relative">
                    <p className="text-sm text-zinc-500 mb-2 font-medium">Poder de Compra Liberado</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl text-zinc-600 font-light">R$</span>
                      <h3 className="text-6xl font-bold text-white tracking-tighter">1.500<span className="text-zinc-500">.000</span></h3>
                    </div>
                    {/* Linha animada subindo */}
                    <div className="absolute right-0 bottom-2 w-32 h-16 opacity-50">
                      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                        <path d="M0,50 Q20,40 40,30 T80,10 T100,0" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" className="animate-dash" strokeDasharray="200" strokeDashoffset="0" />
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Comparativo rápido */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-red-500/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Banco Convencional</p>
                      <p className="text-xl font-bold text-white">R$ 3.8M <span className="text-xs text-red-400 font-normal line-through">Final</span></p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-900/30 to-zinc-950/50 rounded-2xl p-4 border border-emerald-500/20 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wider text-emerald-500">Engenharia Danka</p>
                      <p className="text-xl font-bold text-emerald-400">R$ 1.7M <span className="text-xs text-zinc-400 font-normal">Final</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProofTicker = () => {
  return (
    <div className="py-10 border-y border-white/5 bg-zinc-950/50 backdrop-blur-md overflow-hidden flex relative z-10">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

      <div className="flex whitespace-nowrap animate-ticker items-center gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <span className="text-2xl font-bold text-zinc-600 flex items-center gap-2"><Building size={24} /> Imóveis Premium</span>
            <span className="text-zinc-800 text-2xl">•</span>
            <span className="text-2xl font-bold text-zinc-600 flex items-center gap-2"><Car size={24} /> Frotas Corporativas</span>
            <span className="text-zinc-800 text-2xl">•</span>
            <span className="text-2xl font-bold text-zinc-600 flex items-center gap-2"><Lock size={24} /> Proteção de Capital</span>
            <span className="text-zinc-800 text-2xl">•</span>
            <span className="text-2xl font-bold text-zinc-600 flex items-center gap-2"><LineChart size={24} /> +2.5 Bi Gerenciados</span>
            <span className="text-zinc-800 text-2xl">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Componente de Card Interativo com efeito "Glow" magnético
const GlowCard = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.1), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};

const BentoGrid = () => {
  return (
    <section id="engenharia" className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              A arquitetura do <span className="text-amber-500">crescimento.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl font-light">
              Nossa metodologia transforma o consórcio de uma ferramenta de compra em um instrumento sofisticado de alavancagem financeira.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ gridAutoRows: '320px' }}>

          {/* Card 1 - Grande */}
          <Reveal className="md:col-span-2 h-full">
            <GlowCard className="h-full p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                  <Building className="text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Alavancagem Imobiliária</h3>
                <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                  Compre imóveis para locação ou flip sem descapitalizar. Utilize cartas de crédito estruturadas para multiplicar portas e criar renda passiva exponencial.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-amber-500">
                Ver estratégia <ArrowRightLeft size={16} />
              </div>
            </GlowCard>
          </Reveal>

          {/* Card 2 - Vertical */}
          <Reveal delay={100} className="h-full">
            <GlowCard className="h-full p-8 bg-gradient-to-b from-zinc-900/40 to-emerald-900/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Taxa 0% de Juros</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  Apenas uma taxa administrativa previsível, diluída e imune à flutuação da Selic.
                </p>
              </div>
              <div className="mt-8">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2 text-right">Economia garantida</p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Card 3 */}
          <Reveal delay={200} className="h-full">
            <GlowCard className="h-full p-8 flex flex-col justify-between group">
              <div>
                <Car className="text-white w-8 h-8 mb-6 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-xl font-bold text-white mb-2">Renovação de Frota</h3>
                <p className="text-zinc-400 font-light text-sm">Atualize maquinário ou veículos premium pagando o preço justo, com poder de compra à vista.</p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Card 4 - Grande Horizontal */}
          <Reveal delay={300} className="md:col-span-2 h-full">
            <GlowCard className="h-full p-10 flex items-center justify-between overflow-hidden">
              <div className="relative z-10 max-w-sm">
                <ShieldCheck className="text-amber-500 w-10 h-10 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Patrimônio Blindado</h3>
                <p className="text-zinc-400 font-light">Cartas de crédito sofrem reajustes anuais (INCC/IPCA), garantindo que seu poder de compra jamais seja corroído pela inflação.</p>
              </div>
              {/* Efeito visual de escudo blindado */}
              <div className="absolute right-[-10%] opacity-20 hidden md:block group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110">
                <ShieldCheck size={300} className="text-amber-500" />
              </div>
            </GlowCard>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

// Simulador Interativo (Dopamine hit máximo)
const InteractiveSimulator = () => {
  const [value, setValue] = useState(500000); // 500k default

  // Lógica simplificada de matemática de impacto
  const financiamentoTotal = value * 2.8; // Financiamento dobra ou triplica
  const consorcioTotal = value * 1.25; // Taxa adm média de 25% total
  const economia = financiamentoTotal - consorcioTotal;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="simulador" className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            {/* Fundo glow do simulador */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-emerald-500/10 blur-[100px] -z-10"></div>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Veja a diferença real.</h2>
              <p className="text-zinc-400">Simule agora o custo do tempo contra o seu bolso.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Slider de Valor */}
              <div className="mb-16 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">Qual o valor do bem desejado?</p>
                    <p className="text-4xl md:text-5xl font-bold text-amber-500">{formatCurrency(value)}</p>
                  </div>
                </div>

                <div className="relative pt-4 pb-2">
                  <input
                    type="range"
                    min="100000"
                    max="3000000"
                    step="50000"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #f59e0b ${(value - 100000) / (3000000 - 100000) * 100}%, #27272a ${(value - 100000) / (3000000 - 100000) * 100}%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-zinc-600 mt-4 font-medium">
                    <span>R$ 100 Mil</span>
                    <span>R$ 3 Milhões</span>
                  </div>
                </div>
              </div>

              {/* Comparativo Visual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">

                {/* VS estilizado no meio do desktop */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900 border border-white/10 rounded-full items-center justify-center z-10 text-zinc-500 font-bold text-xs">
                  VS
                </div>

                {/* Financiamento (Ruim) */}
                <div className="bg-zinc-950/80 rounded-3xl p-8 border border-red-500/20 relative overflow-hidden opacity-80 transition-all hover:opacity-100">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full font-bold">Juros Compostos</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-8">Financiamento Padrão</h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Valor Liberado</span>
                      <span className="text-white font-medium">{formatCurrency(value)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Juros Estimados</span>
                      <span className="text-red-400 font-medium">+ {formatCurrency(financiamentoTotal - value)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Custo Final Estimado</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(financiamentoTotal)}</p>
                  </div>
                </div>

                {/* Consórcio (Bom) */}
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-emerald-500/40 relative md:-translate-y-4" style={{ boxShadow: '0 0 50px -15px rgba(16,185,129,0.2)' }}>
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Engenharia Danka
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-8">Consórcio Estratégico</h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Valor Liberado</span>
                      <span className="text-white font-medium">{formatCurrency(value)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Taxa Administrativa</span>
                      <span className="text-amber-400 font-medium">+ {formatCurrency(consorcioTotal - value)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-emerald-500/20">
                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-1">Custo Final Exato</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(consorcioTotal)}</p>
                  </div>
                </div>
              </div>

              {/* Resultado Impacto */}
              <div className="mt-12 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                <p className="text-zinc-300 font-medium mb-2">Com a Danka, você evita jogar no lixo:</p>
                <p className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight flex items-center justify-center gap-3">
                  {formatCurrency(economia)}
                </p>
                <p className="text-sm text-zinc-500 mt-4 font-light">
                  *Simulação baseada em médias de mercado. Fale com um consultor para o cálculo exato do seu perfil.
                </p>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// FAQ Accordion Suave
const FAQ = () => {
  const faqs = [
    {
      q: "Mas consórcio não demora muito para contemplar?",
      a: "A velha forma de fazer consórcio, sim. Nossa Engenharia Financeira trabalha com análise matemática de grupos, lances embutidos e planejamento cronológico. Você não entra para 'contar com a sorte', entra com uma estratégia desenhada para contemplação acelerada."
    },
    {
      q: "Consórcio é só para quem não tem dinheiro?",
      a: "Pelo contrário. Nossos maiores clientes são investidores e empresários capitalizados que se recusam a pagar juros. Eles usam o consórcio como alavanca barata para não descapitalizar o próprio caixa."
    },
    {
      q: "E se a inflação subir muito?",
      a: "A carta de crédito é reajustada anualmente (INCC para imóveis, IPCA/Tabela Fipe para veículos). Isso significa que seu poder de compra está 100% protegido contra a inflação, diferente de guardar dinheiro no banco."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Desconstruindo Mitos</h2>
            <p className="text-zinc-400">Tudo o que você ouviu sobre consórcio tradicional não se aplica aqui.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === i ? 'bg-zinc-900 border-amber-500/30' : 'bg-zinc-950/50 border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${openIndex === i ? 'text-amber-500' : 'text-white'}`}>{faq.q}</span>
                  <ChevronDown className={`text-zinc-500 transition-transform duration-500 flex-shrink-0 ml-4 ${openIndex === i ? 'rotate-180 text-amber-500' : ''}`} />
                </button>
                <div
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const MegaCTA = () => {
  return (
    <section id="contato" className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="relative rounded-[3rem] overflow-hidden border border-emerald-500/20 p-12 md:p-24 text-center group">
            {/* Background super dinâmico */}
            <div className="absolute inset-0 bg-zinc-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.15),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.25),transparent_70%)] transition-colors duration-1000"></div>

            <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                <Lock className="text-emerald-500 w-8 h-8" />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Inicie sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Alavancagem.</span>
              </h2>

              <p className="text-xl text-zinc-400 mb-12 font-light">
                Converse com um de nossos especialistas e receba um mapeamento estrutural gratuito de como acelerar suas próximas aquisições.
              </p>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center"
              >
                {/* Efeito Glow Pulsante Forte */}
                <span className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-40 animate-pulse"></span>
                <span className="relative flex items-center justify-center gap-3 bg-white text-zinc-950 px-12 py-5 rounded-2xl font-bold text-xl transition-transform hover:scale-105 duration-300">
                  <MessageCircle size={24} className="text-emerald-500" />
                  Acessar via WhatsApp
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-20 pb-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center mb-6">
          <Crosshair size={24} className="text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Danka Patrimônio</h2>
        <p className="text-zinc-500 font-light max-w-sm mb-12">Engenharia financeira de alta performance há mais de 25 anos.</p>

        <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-medium">
          <p>&copy; {new Date().getFullYear()} Danka Consórcios. Algoritmo de crescimento.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">Privacidade</span>
            <span className="hover:text-zinc-400 transition-colors cursor-pointer">Termos de Uso</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Olá! Sou seu assistente virtual Danka. Como posso ajudar na sua jornada de crescimento patrimonial hoje?' }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const scrollRef = useRef(null);

  const options = {
    start: [
      { label: 'Como funciona?', value: 'how_it_works' },
      { label: 'Quero simular', value: 'simulate' },
      { label: 'Falar com consultor', value: 'talk_consultant' }
    ],
    how_it_works: [
      { label: 'Ver vantagens', value: 'advantages' },
      { label: 'Simular agora', value: 'simulate' },
      { label: 'Voltar', value: 'start' }
    ],
    advantages: [
      { label: 'Quero simular', value: 'simulate' },
      { label: 'Voltar', value: 'start' }
    ],
    simulate: [
      { label: 'Entendi!', value: 'start' },
      { label: 'Dúvidas?', value: 'how_it_works' }
    ],
    talk_consultant: [
      { label: 'Voltar', value: 'start' }
    ]
  };

  const [currentOptionSet, setCurrentOptionSet] = useState('start');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { id: Date.now(), type, text }]);
  };

  const handleOptionClick = (option) => {
    addMessage(option.label, 'user');
    setShowOptions(false);

    setTimeout(() => {
      let botResponse = "";
      let nextOptions = "start";

      switch (option.value) {
        case 'how_it_works':
          botResponse = "Nossa Engenharia Financeira utiliza o sistema de consórcios de forma estratégica. Em vez de juros altos de financiamento, você paga uma taxa administrativa fixa e usa estratégias de lances inteligentes para captar capital barato e rápido.";
          nextOptions = 'how_it_works';
          break;
        case 'simulate':
          botResponse = "Ótima escolha! Você pode usar nosso simulador logo acima para ver a economia real. Vou te levar para lá.";
          nextOptions = 'simulate';
          window.location.hash = "simulador";
          break;
        case 'advantages':
          botResponse = "As principais vantagens são: Taxa 0% de juros, proteção contra inflação, poder de compra à vista e flexibilidade total para imóveis, frotas ou capital de giro.";
          nextOptions = 'advantages';
          break;
        case 'talk_consultant':
          botResponse = "Nossos consultores estão prontos para desenhar sua estratégia personalizada. Clique no botão de WhatsApp abaixo ou me diga se quer voltar.";
          nextOptions = 'talk_consultant';
          break;
        case 'start':
          botResponse = "No que mais posso te ajudar?";
          nextOptions = 'start';
          break;
        default:
          botResponse = "Entendi. Como posso prosseguir?";
          nextOptions = 'start';
      }

      addMessage(botResponse, 'bot');
      setCurrentOptionSet(nextOptions);
      setShowOptions(true);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl relative group ${isOpen ? 'bg-zinc-800 rotate-90' : 'bg-amber-500 hover:scale-110'}`}
      >
        <div className="absolute inset-0 bg-amber-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
        {isOpen ? <X className="text-white relative z-10" /> : <MessageCircle className="text-zinc-950 relative z-10" />}
      </button>

      {/* Janela do Chat */}
      <div className={`absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[500px] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>

        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles size={20} className="text-zinc-950" />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-tight">Danka Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Online agora</span>
            </div>
          </div>
        </div>

        {/* Mensagens Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-chat-msg`}>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.type === 'user' ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none' : 'bg-zinc-900 text-zinc-300 border border-white/5 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Opções Selecionáveis */}
          {showOptions && (
            <div className="flex flex-wrap gap-2 pt-2">
              {options[currentOptionSet].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 hover:border-amber-500/30 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 animate-chat-msg"
                >
                  {opt.label}
                </button>
              ))}
              {currentOptionSet === 'talk_consultant' && (
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-zinc-950 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 animate-chat-msg flex items-center gap-1.5"
                >
                  <Phone size={12} /> WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer info sutil */}
        <div className="p-4 text-center border-t border-white/5">
          <p className="text-[10px] text-zinc-600 font-medium tracking-tighter uppercase">Tecnologia Danka Patrimônio &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <div className="font-sans bg-zinc-950 text-zinc-50 selection:bg-amber-500 selection:text-zinc-950 min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash { to { stroke-dashoffset: 200; } }
        .animate-dash { animation: dash 3s linear infinite backwards; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 20s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-chat-msg { animation: fadeIn 0.4s ease-out forwards; }
      `}} />

      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10 pt-10">
        <Hero />
        <SocialProofTicker />
        <BentoGrid />
        <InteractiveSimulator />
        <FAQ />
        <MegaCTA />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
