import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eventos & Feiras | Círculo Verde",
  description: "Participação da Círculo Verde nas principais feiras agropecuárias do Brasil, levando tecnologia e inteligência em irrigação KREBS.",
};

const eventos = [
  {
    titulo: "Agrishow 2025",
    ano: "2025",
    local: "Ribeirão Preto - SP",
    descricao: "Participamos da maior feira de tecnologia agrícola da América Latina, apresentando as soluções de pivôs centrais KREBS adaptadas e a inovadora automação inteligente Kube by B-hyve.",
    imagem: "/agrishow2025.avif",
    badge: "Maior Feira do Agro"
  },
  {
    titulo: "e-Agro / Agrotech",
    ano: "2024",
    local: "Salvador - BA",
    descricao: "Estivemos presentes no e-Agro, o grande encontro de tecnologia e inovação do agro nordestino. Levamos workshops, networking e as melhores práticas de eficiência hídrica para o produtor rural.",
    imagem: "/agrotech.avif",
    badge: "Inovação & Tecnologia"
  },
  {
    titulo: "Leilão Nelore JESB",
    ano: "2024",
    local: "Região Nordeste",
    descricao: "Fortalecemos a parceria com os criadores de Nelore no Leilão JESB, demonstrando como a irrigação de precisão impulsiona a produção de pastagens e a produtividade da pecuária intensiva.",
    imagem: "/Leilao nelore.avif",
    badge: "Pecuária de Elite"
  },
  {
    titulo: "Bahia Farm Show",
    ano: "2024",
    local: "Luís Eduardo Magalhães - BA",
    descricao: "Presença consolidada na maior feira do Norte/Nordeste do país. Apresentamos equipamentos robustos para o Matopiba, focando em uniformidade hídrica total e assistência técnica especializada.",
    imagem: "/bahia farm show.avif",
    badge: "Força do Matopiba"
  }
];

export default function EventosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface-container-lowest">
        {/* Header/Hero Section */}
        <header className="max-w-7xl mx-auto px-8 mb-20 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Nossa Presença no Campo
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-6">
                Eventos & <br />
                <span className="text-secondary">Feiras</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed mb-8">
                Estamos presentes nas principais feiras e eventos do agro nacional, levando conhecimento prático, tecnologia de ponta e suporte especializado sobre pivôs de irrigação para quem vive da terra.
              </p>
            </div>
            <div className="relative group flex justify-center lg:justify-end">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative w-full aspect-[4/3] max-w-lg">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/feira 2.png"
                  alt="Feira Agrícola Círculo Verde"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Grid de Eventos */}
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {eventos.map((evento, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-outline-variant/10 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col md:flex-row"
              >
                {/* Imagem do Evento */}
                <div className="md:w-1/2 relative min-h-[250px] overflow-hidden bg-surface-container-low">
                  <img
                    src={evento.imagem}
                    alt={evento.titulo}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10 md:to-transparent"></div>
                  <span className="absolute top-4 left-4 text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/15 backdrop-blur-md px-3 py-1 rounded-full border border-secondary/20">
                    {evento.badge}
                  </span>
                </div>

                {/* Conteúdo do Evento */}
                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 font-headline group-hover:text-secondary transition-colors">
                      {evento.titulo}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {evento.descricao}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant/80 font-medium">Tecnologia KREBS</span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      Eventos Círculo Verde
                      <span className="material-symbols-outlined text-xs">verified</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="bg-primary p-12 md:p-16 rounded-3xl relative overflow-hidden text-center shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-black text-on-tertiary">
                Quer saber onde será nosso próximo encontro?
              </h2>
              <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                Nossa equipe está sempre em movimento pela Bahia, Piauí e Pernambuco. Fale conosco para saber a agenda completa ou agendar a visita de um consultor em sua propriedade.
              </p>
              <div className="pt-4">
                <Link
                  href="/#chamado"
                  className="inline-flex items-center gap-2 bg-secondary text-emerald-950 font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-md"
                >
                  Falar com um Consultor
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
