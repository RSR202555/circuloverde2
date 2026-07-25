import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sobre Nós | Círculo Verde",
  description: "Conheça a história, missão e valores da Círculo Verde, revenda autorizada de pivôs de irrigação KREBS no Nordeste brasileiro.",
};

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface-container-lowest">
        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-8 mb-24 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Nossa História
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-6">
                Quem somos?
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed mb-8">
                A Círculo Verde nasceu do sonho e da dedicação do senhor Adriano, um homem de fé, trabalhador e que construiu sua trajetória com muito esforço e compromisso. Há mais de 20 anos no mercado, nossa história é marcada por persistência, valores sólidos e respeito pelo campo.
              </p>
            </div>
            <div className="relative group">
              <div className="aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src="/foto4.jpeg"
                  alt="História Círculo Verde"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Quem Somos / Missão / Visão */}
        <section className="bg-surface-container-low py-24 mb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl font-bold">workspace_premium</span>
                </div>
                <h3 className="text-xl font-bold text-primary font-headline">Nossa Missão</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Garantir a segurança hídrica e a produtividade sustentável no campo do Nordeste brasileiro, entregando equipamentos robustos de alta durabilidade e suporte técnico ininterrupto.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl font-bold">visibility</span>
                </div>
                <h3 className="text-xl font-bold text-primary font-headline">Nossa Visão</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Ser a principal referência em engenharia de irrigação por pivô central e suporte de alta performance no Nordeste, expandindo com inovação e qualidade reconhecida.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl font-bold">favorite</span>
                </div>
                <h3 className="text-xl font-bold text-primary font-headline">Nossos Valores</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Compromisso com o produtor rural, integridade nas relações comerciais, sustentabilidade no uso de recursos naturais e busca contínua por excelência técnica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Números */}
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src="/imagem 5.jpeg"
                  alt="Pivô Central Círculo Verde"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
                  Experiência Comprovada
                </span>
                <h2 className="text-3xl lg:text-4xl font-headline font-extrabold text-primary leading-tight">
                  Parceiro estratégico da sua lavoura
                </h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Atuamos com a venda de pivôs centrais de irrigação da Krebs, além de peças de reposição, assistência técnica e reparos em equipamentos, sempre oferecendo soluções eficientes e confiáveis para produtores rurais e empresas do setor. Círculo Verde é trabalho, fé e compromisso com resultados que fazem a diferença.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-outline-variant/10">
                <div>
                  <div className="text-3xl font-black text-secondary">10 Anos</div>
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">de atuação</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-secondary">+400</div>
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">Pivôs Vendidos</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-secondary">+15k</div>
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">Hectares Irrigados</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="bg-primary p-12 md:p-16 rounded-3xl relative overflow-hidden text-center shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-black text-on-tertiary">
                Pronto para otimizar sua produção?
              </h2>
              <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                Nossos especialistas estão prontos para desenhar o projeto ideal de irrigação para a sua propriedade. Aumente seu rendimento com o menor custo operacional do mercado.
              </p>
              <div className="pt-4">
                <Link
                  href="/#chamado"
                  className="inline-flex items-center gap-2 bg-secondary text-emerald-950 font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-md"
                >
                  Solicitar Orçamento
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
