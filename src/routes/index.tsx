import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Crown, Lock, Menu, X } from "lucide-react";
import heroDama from "@/assets/hero-dama.jpg";
import emilleAsset from "@/assets/emille.png.asset.json";
import { SITE, trackCheckout } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dona do Jogo — Mentoria Individual com Êmille Matos" },
      { name: "description", content: "Pare de se sabotar. Em 5 encontros individuais, entenda seu padrão, desbloqueie o que te paralisa e saia com um protocolo de ação. R$197." },
      { property: "og:title", content: "Dona do Jogo — Mentoria Individual com Êmille Matos" },
      { property: "og:description", content: "Pare de se sabotar. Assuma o jogo da sua vida. Mentoria individual em 5 encontros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useNotice() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 4000);
    return () => clearTimeout(t);
  }, [msg]);
  return { msg, setMsg };
}

let notify: (m: string) => void = () => {};

function go(url: string, label: string, isCheckout = false) {
  if (!url) {
    notify(`${label} ainda não foi configurado. Em breve estará disponível.`);
    return;
  }
  if (isCheckout) trackCheckout();
  window.open(url, "_blank", "noopener");
}

function BuyButton({ children = "QUERO SER DONA DO JOGO POR R$197", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <button
      onClick={() => go(SITE.checkoutUrl, "O link de compra", true)}
      className={`group inline-flex items-center justify-center gap-3 border border-gold/60 bg-wine px-7 py-4 text-sm font-bold tracking-[0.08em] text-ivory shadow-[0_10px_40px_-10px_var(--wine)] transition hover:bg-wine/80 hover:border-gold ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </button>
  );
}

function Trust() {
  return (
    <p className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
      <Lock className="h-3 w-3" /> Pagamento seguro | 7 dias de garantia | Acesso imediato aos bônus
    </p>
  );
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const KEY = "ddj_deadline";
    let d = Number(localStorage.getItem(KEY));
    if (!d || d < Date.now()) {
      d = Date.now() + 24 * 3600 * 1000;
      localStorage.setItem(KEY, String(d));
    }
    const tick = () => setLeft(Math.max(0, d - Date.now()));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  if (left === null) return "23:59:59";
  const s = Math.floor(left / 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-9 bg-gold" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative border-t border-border px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

const NAV = [
  ["O método", "#metodo"],
  ["O que está incluso", "#incluso"],
  ["A mentora", "#mentora"],
  ["Dúvidas", "#duvidas"],
];

function Index() {
  const { msg, setMsg } = useNotice();
  notify = setMsg;
  const time = useCountdown();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!SITE.metaPixelId) return;
    const w = window as unknown as Record<string, unknown>;
    if (w["fbq"]) return;
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      const n: any = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      n.queue = []; n.loaded = true; n.version = "2.0";
      const t = b.createElement(e); t.async = true; t.src = v;
      b.head.appendChild(t);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    (w["fbq"] as any)("init", SITE.metaPixelId);
    (w["fbq"] as any)("track", "PageView");
  }, []);

  return (
    <div className="pb-24 md:pb-0">
      {/* Oferta */}
      <div className="bg-wine px-4 py-2.5 text-center text-[11px] font-bold tracking-[0.14em] text-gold-soft">
        OFERTA DE LANÇAMENTO | VAGAS LIMITADAS
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#topo" className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-gold" strokeWidth={1.3} />
            <span className="font-display text-2xl md:text-3xl">Dona do Jogo</span>
          </a>
          <nav className="hidden gap-8 lg:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-[11px] uppercase tracking-[0.18em] text-ivory/80 hover:text-gold">{l}</a>
            ))}
          </nav>
          <div className="hidden lg:block"><BuyButton className="!px-5 !py-3 !text-xs">QUERO SER DONA DO JOGO</BuyButton></div>
          <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-5 border-t border-border px-5 py-6 lg:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.18em]">{l}</a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero: texto à esquerda, dama à direita */}
      <section id="topo" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,var(--wine-deep),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-6 lg:grid-cols-2">
          {/* Dama (direita no computador, topo no celular) */}
          <div className="relative order-1 min-h-[520px] lg:order-2 lg:min-h-[860px]">
            <img
              src={heroDama}
              alt="Dama de xadrez dourada (imagem provisória)"
              width={1600}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover object-[80%_center] lg:-right-20 lg:w-[calc(100%+5rem)]"
              style={{
                maskImage: "radial-gradient(ellipse 62% 65% at 55% 50%, #000 35%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(ellipse 62% 65% at 55% 50%, #000 35%, transparent 78%)",
              }}
            />
            <div className="relative flex flex-col items-start px-6 pt-10 lg:px-10 lg:pt-24">
              <Crown className="mb-2 h-9 w-9 text-gold" strokeWidth={1.2} />
              <h1 className="animate-rise font-display font-medium leading-[0.85]">
                <span className="block text-[68px] text-ivory md:text-[110px]">DONA</span>
                <span className="block bg-gradient-to-b from-gold-soft to-gold bg-clip-text text-[68px] text-transparent md:text-[110px]">DO JOGO</span>
              </h1>
              <div className="mt-5 h-px w-64 bg-gold/50 md:w-96" />
              <p className="mt-3 text-[10px] font-bold tracking-[0.2em] text-gold-soft">MENTORIA INDIVIDUAL COM ÊMILLE MATOS</p>
            </div>
            <span className="absolute bottom-6 right-6 text-[9px] uppercase tracking-[0.2em] text-ivory/40">I</span>
          </div>

          {/* Texto */}
          <div className="relative order-2 px-6 pb-20 lg:order-1 lg:py-24 lg:pl-16">
            <Eyebrow>MÃE • EMPREENDEDORA • MENTORA</Eyebrow>
            <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-gold">ÊMILLE MATOS</p>
            <h2 className="mt-3 font-display text-[52px] leading-[0.95] text-ivory md:text-[88px]">
              PARE DE SE SABOTAR.
              <span className="block italic text-gold">Assuma o jogo</span>
              DA SUA VIDA.
            </h2>
            <div className="my-8 h-px w-24 bg-gold/70" />
            <p className="max-w-xl text-[15px] leading-[1.8] text-ivory/80">
              Uma mentoria individual para mulheres que sabem que são capazes, mas continuam travando, adiando, se sabotando ou repetindo comportamentos que as afastam da vida que dizem querer construir. Em 5 encontros comigo, você entende o padrão que te mantém parada, desbloqueia o que te paralisa e sai com um protocolo de ação para agir como a mulher que decidiu se tornar.
            </p>
            <p className="mt-8 font-display text-3xl italic text-gold">A VIDA É HOJE!</p>
            <BuyButton className="mt-8" />
            <Trust />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-gold/30 bg-wine-deep py-4">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-2xl italic text-gold-soft">
          {Array.from({ length: 16 }).map((_, i) => <span key={i}>VOCÊ É A DONA DO SEU FUTURO •</span>)}
        </div>
      </div>

      {/* Primeiro movimento */}
      <Section>
        <Eyebrow>O PRIMEIRO MOVIMENTO</Eyebrow>
        <h2 className="mt-6 font-display text-5xl leading-none md:text-7xl">VOCÊ NÃO PRECISA DE <span className="block italic text-gold">MAIS INFORMAÇÃO.</span></h2>
        <p className="mt-8 max-w-2xl leading-[1.8] text-ivory/80">Você precisa entender o que está fazendo você permanecer parada, e aprender a agir diferente. Entenda seu padrão. Desbloqueie o que te paralisa. E comece a agir de acordo com a mulher que você quer se tornar.</p>
        <BuyButton className="mt-8">QUERO SER DONA DO JOGO</BuyButton>
        <p className="mt-16 font-display text-2xl italic text-gold-soft">Você sabe o que precisa fazer. Agora precisa aprender a agir diferente.</p>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-4">
          {[
            ["ENTENDER", "Análise do seu temperamento e identificação dos seus padrões."],
            ["DESBLOQUEAR", "Nos encontros, vamos olhar para os comportamentos que estão te mantendo parada."],
            ["AGIR", "Você coloca em prática através do protocolo Expertus."],
            ["SUSTENTAR", "15 dias de suporte para não voltar automaticamente ao padrão anterior."],
          ].map(([t, d], i) => (
            <div key={t} className="bg-background p-8">
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-2xl tracking-wide">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Diagnóstico */}
      <Section className="bg-graphite">
        <Eyebrow>O DIAGNÓSTICO</Eyebrow>
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">VOCÊ SABE O QUE PRECISA FAZER. <span className="block italic text-gold">ENTÃO POR QUE CONTINUA SEM FAZER?</span></h2>
        <p className="mt-10 eyebrow">Talvez você:</p>
        <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
          {["Comece e não consiga sustentar;", "Procrastine justamente aquilo que mais importa;", "Tenha medo de tentar novamente e fracassar;", "Saiba que precisa se posicionar, mas continue se escondendo;", "Queira empreender, mas sempre encontre um motivo para adiar;", "Tenha dificuldade de manter disciplina;", "Se cobre muito e, ainda assim, sinta que não sai do lugar;", "Esteja cansada de consumir conteúdo e continuar no mesmo ponto."].map((t) => (
            <li key={t} className="flex gap-4 border-b border-border py-4 text-ivory/85"><span className="text-gold">♛</span>{t}</li>
          ))}
        </ul>
        <p className="mt-14 border-l-2 border-wine pl-6 font-display text-3xl italic text-gold-soft">Não é falta de informação. Existe um padrão por trás do seu comportamento.</p>
      </Section>

      {/* Método */}
      <Section id="metodo">
        <Eyebrow>O MÉTODO</Eyebrow>
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">UM PROTOCOLO PARA QUEM DECIDIU <span className="italic text-gold">PARAR DE REPETIR</span> OS MESMOS PADRÕES</h2>
        <p className="mt-8 max-w-3xl leading-[1.8] text-ivory/80">Um protocolo desenvolvido para aquela mulher que deseja parar de repetir os padrões que a mantêm travada, transformando-a em uma mulher capaz de sustentar a vida que decidiu construir. Você se torna a dona do seu futuro através de um método.</p>
        <h3 className="mt-12 text-3xl text-gold">VOCÊ VAI APLICAR UM MÉTODO VALIDADO!</h3>
        <p className="mt-4 max-w-3xl leading-[1.8] text-ivory/80">Você não vai sair daqui apenas com insights. Vai executar um protocolo de tarefas para tirar da cabeça o que foi trabalhado nos encontros e levar para a sua rotina.</p>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {["CONSCIÊNCIA", "DECISÃO", "AÇÃO", "ACOMPANHAMENTO"].map((t, i) => (
            <div key={t} className="border-t border-gold/60 pt-5">
              <span className="font-display text-5xl text-gold/80">0{i + 1}</span>
              <p className="mt-2 text-sm font-bold tracking-[0.14em]">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 font-display text-2xl italic text-gold-soft">Entenda seu comportamento. Identifique o que está te travando. Crie novas estratégias de ação.</p>
      </Section>

      {/* Por que funciona */}
      <Section className="bg-wine-deep/40">
        <Eyebrow>POR QUE VAI FUNCIONAR COM VOCÊ</Eyebrow>
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">SABE COMO EU SEI QUE ESSE MÉTODO VAI <span className="italic text-gold">FUNCIONAR COM VOCÊ?</span></h2>
        <div className="mt-10 max-w-3xl space-y-5 leading-[1.9] text-ivory/85">
          <p>Porque eu não criei a Dona do Jogo quando tudo estava no cenário perfeito. Eu criei porque também precisei aprender a me enxergar.</p>
          <p>Por muito tempo, acumulei conhecimento, comecei coisas, parei, tentei novamente e procurei respostas fora de mim, até perceber que não adiantava conhecer mais uma estratégia se eu continuava repetindo os mesmos padrões.</p>
          <p>Foi quando comecei a olhar para comportamento, disciplina, identidade e para aquilo que acontecia dentro de mim antes das minhas decisões. E foi nesse processo que encontrei algo que mudou minha forma de enxergar a vida:</p>
          <p className="font-display text-2xl italic text-gold">não basta querer uma vida diferente. É preciso se tornar capaz de tomar e sustentar decisões diferentes.</p>
          <p>Hoje, é isso que eu ensino para outras mulheres.</p>
        </div>
      </Section>

      {/* Para você */}
      <Section>
        <Eyebrow>ESCOLHA COM CONSCIÊNCIA</Eyebrow>
        <h2 className="mt-6 font-display text-5xl md:text-7xl">COMO SABER SE A DONA DO JOGO <span className="italic text-gold">É PARA VOCÊ?</span></h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border border-gold/50 p-8">
            <h3 className="text-3xl text-gold">É PARA VOCÊ SE:</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ivory/85">
              {["Está cansada de saber que pode mais, mas não consegue transformar isso em movimento.", "Sente que está andando em círculos.", "Já tentou mudar várias vezes e acabou voltando para os mesmos comportamentos.", "Quer empreender, aumentar sua renda ou construir uma vida diferente, mas percebe que existe algo dentro de você te segurando.", "Quer parar de depender da motivação e desenvolver uma relação mais consciente com disciplina e ação.", "Quer assumir responsabilidade pelas suas escolhas sem transformar isso em culpa."].map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="border border-wine p-8">
            <h3 className="text-3xl text-ivory/70">NÃO É PARA VOCÊ</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {["Mulheres que preferem continuar na escassez e sem evolução.", "Mulheres que preferem ficar só olhando as outras fazerem e terem resultados.", "Mulheres que estão procurando alguém para fazer por elas.", "Mulheres que querem continuar deixando tudo para depois.", "Mulheres que querem uma fórmula mágica.", "Mulheres que não estão dispostas a olhar para os próprios comportamentos.", "Mulheres que querem continuar acumulando conhecimento sem colocá-lo em prática."].map((t) => (
                <li key={t} className="flex gap-3"><X className="mt-0.5 h-4 w-4 shrink-0 text-wine" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 max-w-3xl space-y-4 leading-[1.8] text-ivory/80">
          <p className="font-display text-2xl italic text-gold-soft">Se você ainda não tem coragem de conhecer a sua melhor versão, esta mentoria não é para você.</p>
          <p>A Dona do Jogo não promete transformar sua vida em cinco encontros. Ela te ajuda a parar de repetir os mesmos padrões que estão mantendo sua vida no mesmo lugar.</p>
          <p>O passo a passo que desenvolvi neste protocolo me fez perder o medo de me posicionar para o mundo, abrir meu próprio negócio, melhorar minha relação com minha família e me encontrar espiritualmente.</p>
          <p>Se você não está disposta a abrir mão de uma vida mediana, é melhor pararmos por aqui.</p>
        </div>
      </Section>

      {/* O que recebe */}
      <Section id="incluso" className="bg-graphite">
        <Eyebrow>O QUE VOCÊ RECEBE</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-6xl">TUDO O QUE ESTÁ INCLUÍDO NA <span className="italic text-gold">DONA DO JOGO</span></h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {[
            ["ANÁLISE DE TEMPERAMENTO", "Entenda como o seu temperamento comanda suas decisões, seus medos e seus padrões."],
            ["5 ENCONTROS AO VIVO", "Sessões exclusivas, só você e eu, para olhar para os comportamentos que te mantêm parada e construir o seu plano de ação."],
            ["MATERIAL PERSONALIZADO", "Conteúdo montado a partir do seu padrão e do seu momento."],
            ["15 DIAS DE SUPORTE", "Acompanhamento para você não voltar automaticamente ao padrão anterior."],
          ].map(([t, d], i) => (
            <div key={t} className="grid gap-2 py-7 md:grid-cols-[100px_1fr_1.4fr] md:items-center">
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="text-2xl">{t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bônus */}
      <Section>
        <Eyebrow>BÔNUS </Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-6xl">E LEVA <span className="italic text-gold">3 BÔNUS </span> LIBERADOS NA HORA</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["O COMPORTAMENTO FINANCEIRO DE CADA TEMPERAMENTO", "Entenda como o seu temperamento influencia a sua relação com o dinheiro."],
            ["DESTRAVE SUA PRODUTIVIDADE", "Para sair do ciclo de começar e parar e colocar a sua rotina em movimento."],
            ["A JORNADA DA MULHER PRÓSPERA", "Um caminho para construir, com consciência, a vida próspera que você decidiu viver."],
          ].map(([t, d], i) => (
            <div key={t} className="border border-gold/20 bg-card/60 p-7">
              <div className="relative aspect-[6/5] overflow-hidden border border-gold/60 bg-background p-6">
                <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -right-6 top-0 h-full text-gold/15" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M40 40 L110 110 L180 40" /><path d="M90 0 L160 70 L230 0" /><path d="M40 120 L110 190 L180 120" />
                </svg>
                <div className="relative flex h-full flex-col">
                  <span className="self-start bg-wine px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-ivory">BÔNUS</span>
                  <div className="mt-auto">
                    <Crown className="h-5 w-5 text-gold" />
                    <p className="mt-3 font-display text-2xl leading-tight text-gold-soft md:text-[1.7rem]">{t}</p>
                  </div>
                  <p className="mt-6 text-[9px] tracking-[0.25em] text-ivory/60">DONA DO JOGO · 0{i + 1}</p>
                </div>
              </div>
              <p className="mt-7 text-[10px] font-bold tracking-[0.2em] text-gold">BÔNUS {i + 1} — {t}</p>
              <p className="mt-4 text-sm leading-[2] text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 border border-gold/40 p-5 text-center text-sm text-gold-soft">
          <strong>EXTRAS DE LANÇAMENTO (liberados após 7 dias):</strong> Protocolo Expertus + Ebook Destravando a Mente Próspera
        </p>
      </Section>

      {/* Oferta */}
      <Section className="bg-[radial-gradient(ellipse_at_center,var(--wine-deep),var(--background)_70%)]">
        <div className="mx-auto max-w-2xl border border-gold/60 bg-background/70 p-8 text-center md:p-14">
          <p className="eyebrow">OFERTA DE LANÇAMENTO</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">ENTRE PARA A MENTORIA <span className="block italic text-gold">A DONA DO JOGO</span></h2>
          <p className="mt-8 text-lg text-muted-foreground">De <s className="text-muted-foreground/80">R$ 497</s> por</p>
          <p className="mt-2 font-display text-7xl text-ivory md:text-8xl">R$ 197</p>
          <p className="text-sm text-muted-foreground">à vista</p>
          <p className="mt-6 text-xs tracking-[0.15em] text-gold">SEU ACESSO A ESTA CONDIÇÃO TERMINA EM: <span className="tabular-nums">{time}</span></p>
          <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left text-sm sm:grid-cols-2">
            {["Análise de Temperamento", "5 encontros ao vivo", "Material personalizado", "15 dias de suporte", "3 bônus", "Protocolo Expertus (após 7 dias)", "Ebook Destravando a Mente Próspera (após 7 dias)"].map((t) => (
              <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{t}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm italic text-ivory/75">Você não está comprando mais conteúdo. Está escolhendo olhar para aquilo que vem te impedindo de avançar.</p>
          <BuyButton className="mt-8 w-full">SIM, QUERO TER ACESSO AGORA</BuyButton>
          <div className="flex justify-center"><Trust /></div>
        </div>
      </Section>

      {/* Mentora */}
      <Section id="mentora">
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative border border-gold/70 p-3">
            <img src={emilleAsset.url} alt="Êmille Matos" loading="lazy" width={1122} height={1402} className="aspect-[4/5] w-full object-cover object-top" />
            <span className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[0.2em] text-ivory/50">{"\n"}</span>
          </div>
          <div>
            <Eyebrow>QUEM ESTÁ POR TRÁS</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl">QUEM ESTÁ POR TRÁS DA <span className="italic text-gold">DONA DO JOGO?</span></h2>
            <div className="mt-8 space-y-5 text-[15px] leading-[1.85] text-ivory/85">
              <p>Eu sou <strong className="text-gold-soft">Êmille Matos</strong>. Pedagoga, pós-graduada em Psicopedagogia, Analista de Temperamentos Humanos e mentora com especialidade em Desbloqueio Emocional.</p>
              <p>Mas antes de qualquer título, eu sou uma mulher que também precisou aprender a se enxergar. Por muito tempo, eu sabia que queria uma vida diferente, tinha ideias, buscava conhecimento e começava novos caminhos. Mas, em muitos momentos, eu me via repetindo os mesmos comportamentos: adiando, travando, duvidando de mim e procurando uma nova estratégia quando, na verdade, precisava olhar para aquilo que estava acontecendo dentro de mim.</p>
              <p>Eu não estou aqui para viver a sua vida por você. Estou aqui para te ajudar a enxergar o jogo que você está jogando e assumir novamente o lugar de quem faz as escolhas. Ser Dona do Jogo não significa controlar tudo. Significa não entregar o controle das suas escolhas aos seus medos, padrões e comportamentos automáticos.</p>
              <p className="font-display text-xl italic text-gold">Meu propósito é claro: resgatar sua identidade e curar as feridas que bloqueiam a prosperidade na sua vida e nos seus negócios, tornando você disciplinada, autoconfiante e com uma vida equilibrada emocionalmente.</p>
            </div>
            <p className="mt-8 font-display text-3xl italic">Êmille Matos</p>
            <p className="eyebrow">Mentora</p>
          </div>
        </div>
      </Section>

      {/* Garantia */}
      <Section className="bg-graphite text-center">
        <p className="eyebrow">VOCÊ TEM</p>
        <p className="font-display text-8xl text-gold md:text-9xl">7 DIAS</p>
        <h2 className="font-display text-3xl md:text-4xl">PARA TER CERTEZA DA SUA DECISÃO.</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 leading-[1.8] text-ivory/80">
          <p>Se dentro desse prazo você perceber que a mentoria não faz sentido para o seu momento, poderá solicitar o cancelamento conforme as condições da oferta, sem precisar permanecer em algo que você decidiu que não é para você.</p>
          <p>Mas existe uma coisa que eu não posso garantir: eu não posso prometer que a sua vida vai mudar simplesmente porque você entrou na mentoria. O que eu posso garantir é que você terá um processo estruturado, direcionamento individual, ferramentas para colocar em prática e suporte durante os 15 dias. A mudança começa quando você decide participar do processo e continua nas escolhas que você faz depois dele.</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="duvidas">
        <Eyebrow>DÚVIDAS FREQUENTES</Eyebrow>
        <h2 className="mt-6 font-display text-5xl md:text-6xl">PERGUNTAS <span className="italic text-gold">FREQUENTES</span></h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {[
            ["Preciso ter um negócio para participar?", "Não. A mentoria é para quem quer empreender, aumentar a renda ou construir uma vida diferente, esteja começando, recomeçando ou travada no primeiro passo."],
            ["Como funcionam os 5 encontros individuais?", "São sessões exclusivas comigo. Após a confirmação do pagamento, você recebe as instruções para agendar."],
            ["Não tenho muito tempo. Funciona para mim?", "Sim. O processo foi pensado para mulheres com a rotina cheia."],
            ["Quando recebo os bônus?", "Imediatamente após a confirmação do pagamento, por e-mail."],
            ["Isso é terapia?", "Não. É mentoria de comportamento e desbloqueio emocional com foco em ação. Não substitui acompanhamento psicológico."],
            ["E se eu não gostar?", "Você tem 7 dias para solicitar o cancelamento, conforme as condições da oferta."],
          ].map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl md:text-2xl">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 text-gold transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA final */}
      <Section className="text-center">
        <Crown className="mx-auto h-10 w-10 text-gold" strokeWidth={1.2} />
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-tight md:text-6xl">A VIDA É HOJE. DAQUI A UM ANO VOCÊ VAI ESTAR NO MESMO LUGAR OU NA VIDA QUE VOCÊ DECIDIU <span className="italic text-gold">CONSTRUIR.</span></h2>
        <p className="mt-6 text-ivory/75">A decisão que você adia hoje é a vida que você não vive amanhã.</p>
        <BuyButton className="mt-10" />
        <p className="mt-4 text-xs text-muted-foreground">O valor de lançamento e os bônus são por tempo limitado.</p>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl"><Crown className="h-5 w-5 text-gold" strokeWidth={1.3} />Dona do Jogo</p>
            <p className="text-xs text-muted-foreground">Êmille Matos · Mentora</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.15em] text-ivory/70">
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">@emillematos_</a>
            <button onClick={() => go(SITE.whatsappUrl, "O WhatsApp")} className="uppercase hover:text-gold">WhatsApp</button>
            <button onClick={() => go(SITE.email ? `mailto:${SITE.email}` : "", "O e-mail")} className="uppercase hover:text-gold">E-mail</button>
            <button onClick={() => go(SITE.termsUrl, "Os termos de uso")} className="uppercase hover:text-gold">Termos de uso</button>
            <button onClick={() => go(SITE.privacyUrl, "A política de privacidade")} className="uppercase hover:text-gold">Política de privacidade</button>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-[11px] leading-relaxed text-muted-foreground">Os resultados variam de pessoa para pessoa e dependem do seu empenho e aplicação. Este programa não garante ganhos financeiros específicos nem substitui acompanhamento psicológico ou profissional.</p>
      </footer>

      {/* Botão fixo celular */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/40 bg-background/95 p-3 backdrop-blur md:hidden">
        <BuyButton className="w-full !py-4 !text-xs" />
      </div>

      {msg && (
        <div role="status" className="fixed left-1/2 top-20 z-[60] w-[90%] max-w-md -translate-x-1/2 border border-gold/60 bg-card px-5 py-4 text-center text-sm text-ivory shadow-xl">
          {msg}
        </div>
      )}
    </div>
  );
}
