import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-20 max-w-7xl mx-auto">
        <div className="col-span-1">
          <Link
            href="/"
            className="text-2xl font-black text-emerald-50 mb-8 flex items-center gap-2.5 tracking-tighter font-headline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Prancheta 2.png"
              alt="Logo Círculo Verde"
              className="w-8 h-8 object-contain"
            />
            <span>Círculo <span className="text-[#47a934]">Verde</span></span>
          </Link>
          <p className="text-emerald-200/60 text-sm leading-relaxed mb-8">
            Soluções avançadas para irrigação de precisão. Tecnologia KREBS a
            serviço da produtividade e sustentabilidade no campo brasileiro.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/circuloverdeirrigacao"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors"
              title="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com/@circuloverdeirrigacao"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors"
              title="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 00-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 002.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 002.11-2.108C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-8">
            Soluções
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                href="/catalogo?categoria=pivos"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Pivôs Centrais
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?categoria=controle"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Automação Smart
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Catálogo de Peças
              </Link>
            </li>
            <li>
              <Link
                href="/eventos"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Eventos & Feiras
              </Link>
            </li>
            <li>
              <Link
                href="/culturas"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Culturas & Resultados
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors font-bold text-emerald-300"
              >
                Notícias & Matérias
              </Link>
            </li>
            <li>
              <Link
                href="#chamado"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Consultoria Técnica
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Sobre Nós
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-8">
            Sede Operacional
          </div>
          <p className="text-emerald-200/60 text-sm leading-relaxed">
            Av. Pres. Dutra, 911 - Centro
            <br />
            Feira de Santana - BA
            <br />
            CEP: 44001-425
            <br />
            <br />
            <span className="text-emerald-400 font-bold block mb-2">
              Contatos:
            </span>
            <a href="tel:71999091317" className="text-emerald-200/80 hover:text-emerald-400 font-bold block mb-1 transition-colors">
              (71) 99909-1317
            </a>
            <a href="tel:75999065174" className="text-emerald-200/80 hover:text-emerald-400 font-bold block transition-colors">
              (75) 99906-5174
            </a>
          </p>
        </div>

      </div>
      <div className="border-t border-white/5 px-8 py-6 max-w-7xl mx-auto">
        <p className="text-emerald-200/30 text-xs text-center">
          © {new Date().getFullYear()} Círculo Verde. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
