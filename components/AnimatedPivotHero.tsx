"use client";

export default function AnimatedPivotHero() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imagem 1.jpeg"
        alt="Pivô central KREBS"
        className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.05]"
      />
    </div>
  );
}
