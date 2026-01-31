import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Car, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  Building2,
  Info,
  Clock
} from 'lucide-react';

// --- DATASET COM IMAGENS TESTADAS E VALIDADAS ---
const imoveis = [
  {
    id: "sp-itaim-101",
    titulo: "Apex Itaim: Design Internacional em São Paulo",
    tipo: "Lançamento",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    entrega: "Out/2027",
    endereco: "Rua Leopoldo Couto de Magalhães Jr - Itaim Bibi, SP",
    preco: 3200000,
    condominioEstimado: 2500,
    areaM2: 120,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    tags: ["Luxo", "Itaim Bibi", "Automação"],
    descricaoCurta: "O novo ícone arquitetônico de São Paulo.",
    descricaoLonga: "O Apex Itaim traz o que há de mais moderno em design global para o coração financeiro de São Paulo. Apartamentos amplos com tecnologia de ponta e lazer suspenso.",
    destaques: [
      "Projeto assinado por escritório premiado",
      "Lazer no 25º andar com vista 360º",
      "Vagas para carros elétricos",
      "Segurança com reconhecimento facial"
    ],
    faq: [
      { q: "Qual o estágio da obra?", a: "Estamos na fase de fundação profunda." },
      { q: "Há unidades decoradas?", a: "Sim, o stand conta com o apartamento modelo de 120m²." }
    ],
    imagens: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  {
    id: "bc-ocean-500",
    titulo: "Ocean Tower: Viva o Amanhã em Balneário Camboriú",
    tipo: "Em Construção",
    bairro: "Centro",
    cidade: "Balneário Camboriú",
    entrega: "Dez/2028",
    endereco: "Avenida Atlântica - Centro, Balneário Camboriú, SC",
    preco: 5800000,
    condominioEstimado: 3200,
    areaM2: 210,
    quartos: 4,
    banheiros: 5,
    vagas: 3,
    tags: ["Frente Mar", "Alto Padrão", "Investimento"],
    descricaoCurta: "O metro quadrado que mais valoriza no Brasil.",
    descricaoLonga: "O Ocean Tower é um empreendimento de altíssimo padrão com vista definitiva para o mar. Plantas exclusivas com uma unidade por andar.",
    destaques: [
      "Piscina privativa na varanda",
      "Acabamento em mármore importado",
      "Spa e heliponto privativo",
      "Janelas do chão ao teto"
    ],
    faq: [
      { q: "Quais as opções de lazer?", a: "Mais de 20 itens de lazer, incluindo boate privativa e simulador de golf." }
    ],
    imagens: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  {
    id: "copacabana-lan-210",
    titulo: "Copa-Studio: O novo hub de investimento em Copacabana",
    tipo: "Pronto para Morar/Novo",
    bairro: "Copacabana",
    cidade: "Rio de Janeiro",
    entrega: "Imediata",
    endereco: "Rua Barata Ribeiro, 520 - Copacabana, Rio de Janeiro - RJ",
    preco: 1180000,
    condominioEstimado: 1250,
    areaM2: 68,
    quartos: 2,
    banheiros: 1,
    vagas: 0,
    tags: ["Pronto", "Ideal para Airbnb", "Rooftop com Piscina"],
    descricaoCurta: "Design moderno e lazer completo em Copacabana.",
    descricaoLonga: "Apartamentos recém-entregues com acabamento impecável. O Copa-Studio oferece a conveniência de morar perto de tudo com um lazer de tirar o fôlego no rooftop.",
    destaques: [
      "Unidades prontas com chaves na mão",
      "Rooftop com piscina, bar e academia",
      "Coworking e lavanderia coletiva",
      "Fácil gestão de locação por curta temporada"
    ],
    faq: [
      { q: "O prédio tem portaria?", a: "Sim, portaria 24h e controle de acesso biométrico." }
    ],
    imagens: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1600"
    ]
  }
];

// --- COMPONENTES UI ---

const Header = ({ navigateTo }: { navigateTo: (page: string) => void }) => (
  <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => navigateTo('home')}
      >
        <Building2 className="text-blue-700" size={32} />
        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Imóvel<span className="text-blue-700"> na Planta</span></span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
        <button onClick={() => navigateTo('home')} className="hover:text-blue-700 transition-colors">Lançamentos</button>
        <button className="hover:text-blue-700 transition-colors">Investimento</button>
        <button className="px-6 py-2.5 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-200">
          Minha Conta
        </button>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
        <div>
          <h3 className="text-slate-900 font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
            <Building2 className="text-blue-700" size={24} /> IMÓVEL NA PLANTA
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Curadoria exclusiva dos projetos que estão definindo o novo padrão de morar e investir no Brasil.
          </p>
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold mb-4">Mercados em Alta</h4>
          <ul className="text-slate-500 text-sm space-y-3 font-medium">
            <li>Itaim Bibi & Jardins (SP)</li>
            <li>Balneário Camboriú (SC)</li>
            <li>Zona Sul & Barra (RJ)</li>
            <li>Curadoria Nacional</li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold mb-4">Atendimento</h4>
          <p className="text-slate-500 text-sm">premium@imovelnaplanta.com.br</p>
          <p className="text-blue-700 font-bold text-sm mt-2">0800-400-9000</p>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        © 2024 Portal Imóvel na Planta — Tecnologia em Real Estate.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImovelId, setSelectedImovelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'contato' | 'agendamento'>('contato');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const navigateTo = (p: string, params?: { q?: string, id?: string }) => {
    window.scrollTo(0, 0);
    if (params?.q !== undefined) setSearchQuery(params.q);
    if (params?.id) setSelectedImovelId(params.id);
    setPage(p);
  };

  const currentImovel = useMemo(() => 
    imoveis.find(i => i.id === selectedImovelId), 
    [selectedImovelId]
  );

  const filteredImoveis = useMemo(() => {
    if (!searchQuery) return imoveis;
    const q = searchQuery.toLowerCase();
    return imoveis.filter(i => 
      i.bairro.toLowerCase().includes(q) || 
      i.cidade.toLowerCase().includes(q) ||
      i.endereco.toLowerCase().includes(q) || 
      i.titulo.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const openModal = (type: 'contato' | 'agendamento') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus('idle');
      }, 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header navigateTo={navigateTo} />

      {/* HOME PAGE */}
      {page === 'home' && (
        <main>
          <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-12">
            <div className="absolute inset-0 bg-slate-50 overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/40 clip-path-slant hidden lg:block"></div>
               <div className="absolute top-40 left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-100 text-blue-700 text-[11px] font-black tracking-widest uppercase rounded-full mb-8 shadow-sm">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Curadoria Premium Nacional
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.1] tracking-tighter">
                  A elite dos lançamentos <br />
                  <span className="text-blue-700">agora num só lugar.</span>
                </h1>
                <p className="text-slate-600 text-xl mb-12 max-w-lg leading-relaxed font-medium">
                  Antecipe-se ao mercado. Tenha acesso exclusivo aos projetos imobiliários mais cobiçados do Brasil, antes mesmo da abertura oficial de vendas.
                </p>
                
                <div className="bg-white p-3 rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-slate-100 flex flex-col md:flex-row items-center gap-3 max-w-2xl">
                  <div className="flex-1 flex items-center px-5 gap-3 w-full">
                    <Search className="text-blue-600 shrink-0" size={24} />
                    <input 
                      type="text"
                      placeholder="Onde deseja morar ou investir?"
                      className="w-full h-14 outline-none text-slate-700 font-bold placeholder:text-slate-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && navigateTo('busca', { q: searchQuery })}
                    />
                  </div>
                  <button 
                    onClick={() => navigateTo('busca', { q: searchQuery })}
                    className="w-full md:w-auto px-10 py-5 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95"
                  >
                    Ver Oportunidades
                  </button>
                </div>
                
                <div className="mt-12 flex items-center gap-6 grayscale opacity-60">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Parceiros Elite:</p>
                  <div className="flex gap-4 font-black italic text-slate-500 text-lg">
                    <span>CYRELA</span>
                    <span>VITACON</span>
                    <span>EMBRAED</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:grid grid-cols-2 gap-6 relative">
                <div className="space-y-6 pt-16">
                  <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* BUSCA E LISTAGEM */}
      {page === 'busca' && (
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter">
              {searchQuery ? `Projetos encontrados para "${searchQuery}"` : "Seleção Exclusive Nacional"}
            </h2>
            <div className="w-24 h-2 bg-blue-700 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredImoveis.map(item => (
              <div 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-3xl transition-all duration-700 cursor-pointer flex flex-col"
                onClick={() => navigateTo('detalhe', { id: item.id })}
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={item.imagens[0]} alt={item.titulo} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-5 py-2 bg-blue-700 text-white text-[10px] font-black uppercase rounded-full shadow-xl">
                      {item.tipo}
                    </span>
                    <span className="px-5 py-2 bg-white/95 backdrop-blur text-slate-900 text-[10px] font-black uppercase rounded-full shadow-md">
                      {item.cidade}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-950 mb-4 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors tracking-tight">
                    {item.titulo}
                  </h3>
                  <div className="flex items-center gap-2 mb-8 text-slate-500 font-bold text-sm">
                    <Clock size={16} className="text-blue-600" /> Previsão: <span className="text-slate-900">{item.entrega}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Square size={18} className="text-blue-600 mb-2" />
                      <span className="text-xs font-black">{item.areaM2}m²</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <BedDouble size={18} className="text-blue-600 mb-2" />
                      <span className="text-xs font-black">{item.quartos} qts</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Car size={18} className="text-blue-600 mb-2" />
                      <span className="text-xs font-black">{item.vagas} vgs</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Preço de Lançamento</p>
                      <span className="text-3xl font-black text-slate-950">
                        {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="w-14 h-14 bg-slate-950 text-white rounded-full flex items-center justify-center group-hover:bg-blue-700 group-hover:scale-110 transition-all shadow-lg">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* DETALHAMENTO */}
      {page === 'detalhe' && currentImovel && (
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <section className="relative h-[75vh] flex items-end">
            <div className="absolute inset-0">
               <img src={currentImovel.imagens[0]} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-20">
               <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                 <div className="max-w-4xl">
                   <div className="flex items-center gap-3 mb-8">
                      <span className="px-6 py-2 bg-blue-700 text-white text-[11px] font-black uppercase rounded-full shadow-2xl">{currentImovel.tipo}</span>
                      <span className="px-6 py-2 bg-white/20 backdrop-blur text-white text-[11px] font-black uppercase rounded-full flex items-center gap-2 border border-white/20"><Clock size={16}/> Entrega em {currentImovel.entrega}</span>
                   </div>
                   <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
                     {currentImovel.titulo}
                   </h1>
                   <p className="text-white/80 text-xl font-bold flex items-center gap-3">
                     <MapPin size={24} className="text-blue-500" /> {currentImovel.endereco}
                   </p>
                 </div>
                 <div className="bg-white p-10 rounded-[3rem] shadow-3xl min-w-[360px] border border-slate-100">
                   <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-2">Unidades Limitadas</p>
                   <div className="text-5xl font-black text-slate-950 mb-10 tracking-tighter">
                     {currentImovel.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                   </div>
                   <div className="space-y-4">
                     <button 
                       onClick={() => openModal('contato')}
                       className="w-full py-5 bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95"
                     >
                       Falar com Especialista
                     </button>
                     <button 
                       onClick={() => openModal('agendamento')}
                       className="w-full py-5 bg-slate-100 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-95"
                     >
                       <Calendar size={20} /> Agendar Visita
                     </button>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          <section className="bg-white border-b border-slate-100 py-12 sticky top-20 z-40 shadow-sm">
             <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-16 justify-center lg:justify-start">
               {[
                 { label: "Área Útil", val: `${currentImovel.areaM2}m²`, icon: Square },
                 { label: "Dormitórios", val: currentImovel.quartos, icon: BedDouble },
                 { label: "W.C.s", val: currentImovel.banheiros, icon: Bath },
                 { label: "Garagem", val: `${currentImovel.vagas} vagas`, icon: Car }
               ].map((stat, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700">
                     <stat.icon size={24} />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                     <span className="text-xl font-black text-slate-950">{stat.val}</span>
                   </div>
                 </div>
               ))}
             </div>
          </section>

          <section className="py-24 max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black mb-16 flex items-center gap-6 tracking-tighter">
              <div className="w-16 h-2 bg-blue-700 rounded-full"></div> Galeria de Perspectivas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 h-[800px]">
               <div className="lg:col-span-8 overflow-hidden rounded-[3rem] shadow-2xl relative group">
                  <img src={currentImovel.imagens[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
               <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="flex-1 overflow-hidden rounded-[2.5rem] shadow-xl relative group">
                    <img src={currentImovel.imagens[1]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="flex-1 overflow-hidden rounded-[2.5rem] shadow-xl relative group">
                    <img src={currentImovel.imagens[2]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
               </div>
            </div>
          </section>

          <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
              <div>
                <h2 className="text-5xl font-black mb-12 leading-[1.1] tracking-tighter uppercase">Diferenciais <br />que valorizam.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                   {currentImovel.destaques.map((d, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/20">
                           <CheckCircle2 size={24} />
                        </div>
                        <span className="font-bold text-lg leading-snug">{d}</span>
                     </div>
                   ))}
                </div>
                <div className="p-10 bg-blue-700 text-white rounded-[3rem] flex items-center gap-10 shadow-2xl shadow-blue-600/30">
                   <div className="hidden sm:flex w-24 h-24 bg-white/20 rounded-3xl items-center justify-center shrink-0 border border-white/20">
                      <ShieldCheck size={48} />
                   </div>
                   <div>
                      <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">Investimento Seguro</h4>
                      <p className="text-blue-100 font-medium leading-relaxed">Registo de Incorporação completo (RI) e seguro-obra garantido por instituições de primeira linha.</p>
                   </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                 <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-md">
                    <h4 className="text-2xl font-black mb-10 flex items-center gap-4">
                       <Info size={28} className="text-blue-500" /> Consultoria Técnica
                    </h4>
                    <div className="space-y-10">
                       {currentImovel.faq.map((item, idx) => (
                         <div key={idx}>
                            <h5 className="text-xl font-bold mb-4 text-blue-400">{item.q}</h5>
                            <p className="text-slate-400 font-medium leading-relaxed">{item.a}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA - BANNER DE IMPACTO */}
          <section className="py-32 px-6">
             <div className="max-w-6xl mx-auto bg-blue-700 rounded-[4rem] overflow-hidden relative shadow-3xl">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 py-24 px-10 md:px-24 text-center">
                   <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur rounded-full text-white text-xs font-black uppercase mb-8 border border-white/20">Oportunidade de Investimento</span>
                   <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase">Garanta sua unidade <br />com condições exclusivas</h2>
                   <p className="text-blue-50 text-xl mb-16 max-w-2xl mx-auto font-medium">Os nossos consultores premium estão disponíveis para uma reunião privada, presencial ou por vídeo.</p>
                   <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <button 
                        onClick={() => openModal('contato')}
                        className="px-16 py-6 bg-white text-blue-700 font-black text-lg rounded-3xl shadow-2xl hover:bg-blue-50 transition-all active:scale-95"
                      >
                        Falar com Especialista
                      </button>
                      <button 
                        onClick={() => openModal('agendamento')}
                        className="px-16 py-6 bg-blue-950 text-white font-black text-lg rounded-3xl hover:bg-slate-900 transition-all shadow-xl"
                      >
                        Agendar Visita Particular
                      </button>
                   </div>
                </div>
             </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <Footer />

      {/* MODAL DE CONVERSÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[4rem] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="p-12 md:p-16">
              {formStatus === 'success' ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-slate-950 mb-6 tracking-tighter">Sua vaga está garantida!</h3>
                  <p className="text-slate-500 text-lg mb-10 font-medium leading-relaxed">
                    {modalType === 'agendamento' 
                      ? "Recebemos o seu interesse. Um consultor premium entrará em contacto em menos de 15 minutos para confirmar os detalhes." 
                      : "A sua solicitação foi processada. Prepare-se para receber informações privilegiadas sobre este projeto."}
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl text-lg"
                  >
                    Concluir
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <h3 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter uppercase">
                      {modalType === 'agendamento' ? "Agendar Consultoria" : "Acesso Exclusivo"}
                    </h3>
                    <p className="text-slate-500 text-lg font-medium">
                      O primeiro passo para o seu novo património começa aqui.
                    </p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-widest">O seu Nome</label>
                      <input required type="text" placeholder="Nome e apelido" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 ring-blue-50 focus:bg-white transition-all font-bold text-lg" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-widest">WhatsApp Privado</label>
                      <input required type="tel" placeholder="(00) 00000-0000" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 ring-blue-50 focus:bg-white transition-all font-bold text-lg" />
                    </div>
                    
                    {modalType === 'agendamento' && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-widest">Data Sugerida</label>
                          <input required type="date" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 ring-blue-50 font-bold" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-widest">Período</label>
                          <select required className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 ring-blue-50 font-bold">
                            <option>Manhã</option>
                            <option>Tarde</option>
                            <option>Noite (Virtual)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <button 
                      disabled={formStatus === 'sending'}
                      className="w-full py-6 bg-blue-700 text-white font-black rounded-[2rem] text-xl hover:bg-blue-800 transition-all mt-8 shadow-2xl shadow-blue-200 active:scale-95 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? "Garantindo Acesso..." : (modalType === 'agendamento' ? "Solicitar Agendamento" : "Falar com Especialista")}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                      <ShieldCheck size={14} /> Os seus dados estão protegidos pela LGPD
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
