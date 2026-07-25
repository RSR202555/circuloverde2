export interface Metrica {
  rotulo: string;
  valor: string;
}

export interface Cultura {
  id: string;
  nome: string;
  imagem: string;
  imagem_detail?: string;
  imagem2?: string;
  tituloDoc: string;
  subtitulo1: string;
  texto1: string;
  subtitulo2: string;
  texto2: string;
  beneficios: string[];
  metricas: Metrica[];
}

export const culturas: Cultura[] = [
  {
    id: "algodao",
    nome: "Algodão",
    imagem: "/algodao.avif",
    imagem2: "/algodao2.avif",
    tituloDoc: "CULTURA DO ALGODÃO",
    subtitulo1: "Algodão irrigado é sinônimo de alta produtividade",
    texto1: "O pivô de irrigação central tem desempenhado um papel fundamental na modernização da cotonicultura, especialmente em regiões onde a irregularidade das chuvas limita o potencial produtivo. Na cultura do algodão, a água é um fator determinante em fases críticas como germinação, florescimento e enchimento das maçãs.",
    subtitulo2: "Água na medida certa, algodão de excelência",
    texto2: "O impacto econômico também é significativo. Com o pivô central, o produtor consegue maior previsibilidade de safra, redução de riscos climáticos e aumento da produtividade por hectare. Em regiões no Nordeste, essa tecnologia tem sido decisiva para consolidar o algodão como uma cultura altamente rentável e tecnificada.",
    beneficios: [
      "Uniformidade hídrica total para enchimento uniforme de maçãs",
      "Aplicação precisa de fitossanitários e fertilizantes via quimigação",
      "Redução drástica do estresse térmico em períodos de calor extremo"
    ],
    metricas: [
      { rotulo: "Aumento de Produtividade", valor: "+45%" },
      { rotulo: "Qualidade de Fibra", valor: "Tipo 1 (Premium)" }
    ]
  },
  {
    id: "batata",
    nome: "Batata",
    imagem: "/batata.avif",
    imagem_detail: "/batata3.avif",
    imagem2: "/batata2.avif",
    tituloDoc: "CULTURA DA BATATA",
    subtitulo1: "O pivô transforma o potencial da batata em resultado",
    texto1: "Durante o ciclo da batata, fases como emergência, tuberização e enchimento dos tubérculos são extremamente dependentes de uma oferta hídrica equilibrada. A falta de água pode resultar em tubérculos menores, deformados e com baixa qualidade comercial.",
    subtitulo2: "O manejo hídrico define o sucesso da batata",
    texto2: "Um dos grandes diferenciais do pivô é a sua alta uniformidade de distribuição, que garante condições homogêneas em toda a área cultivada. Isso resulta em uma lavoura mais padronizada, com tubérculos de tamanho uniforme, melhor aparência e maior valor de mercado. Essa uniformidade também facilita a colheita e o processamento, agregando eficiência ao sistema produtivo.",
    beneficios: [
      "Prevenção de distúrbios fisiológicos decorrentes de estresse hídrico",
      "Controle rigoroso da umidade do solo diretamente na zona radicular",
      "Qualidade superior de pele e formato para mercado fresco e indústrias"
    ],
    metricas: [
      { rotulo: "Padronização de Tubérculos", valor: "98%" },
      { rotulo: "Aproveitamento Comercial", valor: "+30%" }
    ]
  },
  {
    id: "cafe",
    nome: "Café",
    imagem: "/cafe.avif",
    imagem_detail: "/cafe2.avif",
    imagem2: "/cafe3.avif",
    tituloDoc: "CULTURA DO CAFÉ",
    subtitulo1: "Café de alto padrão exige irrigação eficiente",
    texto1: "Tradicionalmente cultivado em regime de sequeiro, o cafeeiro responde de forma extremamente positiva quando submetido a um manejo hídrico eficiente, o que torna a irrigação um fator decisivo para elevar a produtividade e a qualidade dos grãos.",
    subtitulo2: "Sem irrigação, o café não atinge seu potencial máximo",
    texto2: "O café é uma cultura perene que depende de equilíbrio hídrico ao longo de todo o ano. Fases como a indução floral, a florada e o enchimento dos grãos são altamente sensíveis à disponibilidade de água. A falta de umidade nesses períodos pode comprometer a uniformidade da florada, reduzir o pegamento dos frutos e impactar diretamente o rendimento final da colheita.",
    beneficios: [
      "Uniformização acentuada do florescimento e maturação dos frutos",
      "Redução drástica do abortamento de flores em anos de seca severa",
      "Fertirrigação contínua e precisa nas fases de maior demanda nutricional"
    ],
    metricas: [
      { rotulo: "Uniformidade de Florada", valor: "95%" },
      { rotulo: "Grãos Tipo Cereja (Bebida Fina)", valor: "+40%" }
    ]
  },
  {
    id: "cenoura",
    nome: "Cenoura",
    imagem: "/cenoura.avif",
    imagem2: "/cenoura2.avif",
    tituloDoc: "CULTURA DA CENOURA",
    subtitulo1: "Cenoura irrigada cresce uniforme e valorizada",
    texto1: "A cenoura é uma hortaliça altamente exigente em água, principalmente por possuir sistema radicular sensível e por depender de umidade constante no solo para garantir raízes bem formadas, uniformes e com alto padrão comercial.",
    subtitulo2: "Cenoura irrigada é raiz de qualidade",
    texto2: "Um dos principais benefícios do pivô é a sua capacidade de manter a umidade do solo em níveis adequados de forma continua, evitando oscilações que prejudicam o desenvolvimento da raiz. Isso resulta em cenouras mais lisas, bem formadas e com padrão comercial elevado, características fundamentais para atender às exigências do mercado.",
    beneficios: [
      "Prevenção eficaz de bifurcação e rachaduras nas raízes comerciais",
      "Estímulo para o desenvolvimento de coloração laranja intensa e uniforme",
      "Ciclo de cultivo otimizado com germinação rápida e altamente homogênea"
    ],
    metricas: [
      { rotulo: "Raízes de Classe A (Lavadas)", valor: "92%" },
      { rotulo: "Ciclo de Produção", valor: "-10 dias" }
    ]
  },
  {
    id: "laranja",
    nome: "Laranja",
    imagem: "/Laranja.avif",
    imagem2: "/laranja2.avif",
    tituloDoc: "CULTURA DA LARANJA",
    subtitulo1: "O pivô é o maior aliado da laranja no Nordeste",
    texto1: "O pivô de irrigação central tem se consolidado como uma das tecnologias mais importantes para elevar o desempenho da cultura da laranja, principalmente em regiões com irregularidade hídrica ao longo do ano. A laranjeira é uma cultura perene que exige fornecimento contínuo e equilibrado de água para sustentar processos fundamentais como crescimento vegetativo, indução floral, pegamento dos frutos e enchimento.",
    subtitulo2: "Transformamos seca em oportunidade na citricultura nordestina",
    texto2: "Além disso, o pivô central contribui para a redução dos riscos climáticos, trazendo maior previsibilidade à produção. Em regiões como a Bahia, onde a citricultura vem crescendo com o uso de tecnologias, a irrigação tem sido essencial para garantir produtividade e qualidade mesmo em períodos de estiagem.",
    beneficios: [
      "Aumento expressivo no rendimento de extração de suco por caixa de fruta",
      "Prevenção da queda de botões florais provocada pelo estresse térmico",
      "Melhor vigor e redução do desgaste da planta nas safras consecutivas"
    ],
    metricas: [
      { rotulo: "Diâmetro Médio do Fruto", valor: "+25%" },
      { rotulo: "Concentração de Sólidos Solúveis", valor: "+18%" }
    ]
  },
  {
    id: "milho",
    nome: "Milho",
    imagem: "/Milho.avif",
    imagem2: "/milho 2.avif",
    tituloDoc: "CULTURA DO MILHO",
    subtitulo1: "Milho de ponta nasce com irrigação precisa",
    texto1: "A ausência de água nesses estágios pode comprometer seriamente a formação das espigas, reduzir o número de grãos por fileira e impactar diretamente a produtividade final. Nesse cenário, o pivô central se destaca por permitir a aplicação precisa e uniforme da água, garantindo que a planta receba a quantidade ideal no momento certo, evitando estresses hídricos e promovendo um desenvolvimento mais equilibrado.",
    subtitulo2: "Milho bem irrigado enche espiga e lucro",
    texto2: "Do ponto de vista econômico, o impacto é significativo. A irrigação por pivô central reduz os riscos associados à variabilidade climática, aumenta a previsibilidade da produção e possibilita incrementos expressivos na produtividade por hectare. Em muitos casos, também permite o cultivo em safras estratégicas, como a safrinha, elevando ainda mais a rentabilidade do produtor.",
    beneficios: [
      "Polinização uniforme e espigas 100% granadas até a ponta",
      "Eliminação de riscos de perda total por veranicos na safrinha",
      "Aplicação de fertilizantes em tempo recorde via água de irrigação"
    ],
    metricas: [
      { rotulo: "Produtividade Média Irrigada", valor: "180+ sc/ha" },
      { rotulo: "Previsibilidade de Safra", valor: "100% Garantida" }
    ]
  },
  {
    id: "pecuaria",
    nome: "Pecuária",
    imagem: "/Pecuária.avif",
    imagem2: "/pecuaria2.avif",
    tituloDoc: "PECUÁRIA INTENSIVA",
    subtitulo1: "Pasto de qualidade sustenta pecuária de sucesso",
    texto1: "O pivô de irrigação central, tradicionalmente associado às culturas agrícolas, tem ganhado cada vez mais espaço na pecuária moderna como uma ferramenta estratégica para intensificação da produção. Seu uso está diretamente ligado à irrigação de pastagens, promovendo maior disponibilidade de forragem ao longo do ano e reduzindo a dependência das chuvas, especialmente em regiões com períodos prolongados de seca.",
    subtitulo2: "Pecuária moderna investe em irrigação",
    texto2: "Outro benefício importante é a redução da sazonalidade. Em sistemas tradicionais, a produção de forragem varia bastante ao longo do ano, com excesso no período chuvoso e escassez na seca. Com o uso do pivô, é possível manter uma produção mais constante, permitindo planejamento alimentar mais eficiente e evitando perdas de desempenho dos animais.",
    beneficios: [
      "Produção de forragem fresca de alta qualidade mesmo no auge do inverno seco",
      "Aumento exponencial na taxa de lotação de UA/ha (Unidade Animal)",
      "Aceleração marcante no ciclo de engorda, reduzindo a idade de abate"
    ],
    metricas: [
      { rotulo: "Lotação Média", valor: "8 a 10 UA/ha" },
      { rotulo: "Ganho de Peso Diário (GMD)", valor: "+35%" }
    ]
  },
  {
    id: "soja",
    nome: "Soja",
    imagem: "/soja.avif",
    imagem2: "/soja2.avif",
    tituloDoc: "CULTURA DA SOJA",
    subtitulo1: "Sem água controlada, a soja perde desempenho",
    texto1: "A soja é altamente sensível ao déficit hídrico, principalmente em fases críticas como germinação, florescimento e enchimento de grãos. A falta de água nesses momentos pode reduzir significativamente a produtividade e a qualidade dos grãos.",
    subtitulo2: "Onde tem pivô, a soja responde com produtividade",
    texto2: "Com o pivô, é possível ajustar lâminas de irrigação conforme a necessidade da lavoura, reduzindo desperdícios e aumentando a sustentabilidade do sistema produtivo. Além disso, a tecnologia permite a fertirrigação, potencializando o aproveitamento de nutrientes e melhorando o desempenho da soja no campo.",
    beneficios: [
      "Aumento no número de vagens por planta e grãos por vagem",
      "Facilidade no agendamento do plantio, aproveitando as melhores janelas de mercado",
      "Melhor absorção de macro e micronutrientes do solo"
    ],
    metricas: [
      { rotulo: "Produtividade Média Irrigada", valor: "90+ sc/ha" },
      { rotulo: "Segurança Hídrica contra Veranicos", valor: "100%" }
    ]
  },
  {
    id: "trigo",
    nome: "Trigo",
    imagem: "/trigo.avif",
    imagem2: "/trigo2.avif",
    tituloDoc: "CULTURA DO TRIGO",
    subtitulo1: "Água na dose certa faz o trigo render mais",
    texto1: "O trigo, apesar de ser tradicionalmente cultivado em condições de sequeiro, responde de maneira extremamente positiva quando submetido a um manejo hídrico controlado, o que torna a irrigação um fator estratégico para elevar a produtividade.",
    subtitulo2: "Irrigação inteligente transforma a produção de trigo",
    texto2: "Além da irrigação em si, o sistema também possibilita a fertirrigação, o que aumenta significativamente a eficiência no uso de fertilizantes. Nutrientes podem ser aplicados junto com a água, diretamente na zona radicular, reduzindo perdas e potencializando a absorção pelas plantas. Isso contribui para um trigo mais vigoroso, com melhor sanidade e maior capacidade produtiva.",
    beneficios: [
      "Perfilhamento abundante para maior densidade de espigas por metro quadrado",
      "Qualidade industrial superior (PH elevado e trigo de força de glúten)",
      "Colheita totalmente seca garantida, livre de chuvas que depreciam o grão na maturação"
    ],
    metricas: [
      { rotulo: "Força de Glúten (W)", valor: "300+ (Premium)" },
      { rotulo: "Produtividade Média", valor: "110+ sc/ha" }
    ]
  }
];
