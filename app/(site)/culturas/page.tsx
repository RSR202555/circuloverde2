import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { culturas } from "@/data/culturas";

export const metadata = {
  title: "Culturas & Irrigação de Precisão | Círculo Verde",
  description: "Descubra como a tecnologia de irrigação por pivô central KREBS potencializa a produtividade de diversas culturas, como algodão, batata, soja, milho, café e muito mais.",
};

export default function CulturasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 bg-surface-container-lowest font-body text-on-surface">
        {/* Intro/Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 text-center pt-12 mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Inteligência Hídrica por Cultura
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-black text-primary tracking-tight leading-none mb-6">
            Culturas & <br className="sm:hidden" />
            <span className="text-secondary">Resultados</span>
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Nosso pivô de irrigação já foi testado e aprovado em diversas culturas, entregando eficiência,
            produtividade e resultados reais em campo. É tecnologia que funciona na prática. Estamos levando mais
            segurança hídrica ao produtor e transformando o Nordeste com inovação e alta performance na
            agricultura. Confira nossos pivôs em diferentes culturas:
          </p>
        </section>

        {/* 9-Crop Grid Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturas.map((cultura) => (
              <Link
                key={cultura.id}
                href={`/culturas/${cultura.id}`}
                className="group text-left relative focus:outline-none transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-center bg-white border border-outline-variant/20 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-lg hover:shadow-xl"
              >
                {/* Crop Photo with Shape */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-surface-container-low">
                  <img
                    src={cultura.imagem}
                    alt={cultura.nome}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Pill Title Footer */}
                <div className="py-5 px-6 w-full flex justify-center bg-white relative z-10">
                  <span className="inline-flex items-center justify-center px-8 py-2.5 rounded-full font-bold text-sm tracking-wide bg-secondary/10 text-emerald-900 transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:shadow-md">
                    {cultura.nome}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
