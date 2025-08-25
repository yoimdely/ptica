import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Stethoscope,
  Store, Trees, Dumbbell, Handshake, ArrowUp, Calendar, Route, Waves, Sun, KeyRound, Baby, Mountain
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Миндаль» — Ялта, Дарсан-холм: квартиры и таунхаусы";

  const meta = [
    { name: "description", content: "ЖК «Миндаль» в Ялте на холме Дарсан: квартиры и таунхаусы с видами на море и горы. Закрытая территория, 3-уровневый подземный паркинг (~98 м/м), SPA и фитнес, аллея, двор без машин. Адрес: Ялта, ул. Халтурина, 36А. Срок ввода ориентир — IV кв. 2025. ФЗ‑214, эскроу." },
    { property: "og:title", content: "ЖК «Миндаль» — Ялта, Дарсан-холм" },
    { property: "og:description", content: "Премиальный клубный квартал: квартиры и таунхаусы, виды 360°, SPA, 3-уровневый подземный паркинг. До набережной Ялты — ~20 мин пешком." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-mindal.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1600&auto=format&fit=crop"; // горы/море — заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, String(v)));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#D9E6D6", backgroundColor: "#FFFFFF", color: "#122017" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #2E7D32 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4C6B52" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#D9E6D6", backgroundColor: "#F3FAF2", color: "#122017" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F7FBF7", color: "#122017", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: зелёные холмы */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #EAF5EA 0%, #F7FBF7 45%, #F7FBF7 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#D9E6D6" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#E8F3E6" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: grid-шапка, кнопки разнесены */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(247,251,247,0.9)", borderColor: "#D9E6D6" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#122017", color: "#EAF5EA" }}>МД</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Миндаль»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#4C6B52" }}>
                <MapPin size={12} className="inline mr-1" /> Ялта · ул. Халтурина, 36А (Дарсан-холм)
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О квартале", "Планировки", "Wellness", "Паркинг", "Локация", "Этапы", "FAQ"].map((t, i) => (
                <a key={i} href={["#about","#plans","#well","#park","#location","#status","#faq"][i]} className="hover:text-emerald-700 whitespace-nowrap transition-colors" style={{ color: "#4C6B52" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#C7DAC5", color: "#122017" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#2E7D32", color: "#F7FBF7" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#D9E6D6' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О квартале','#about'],['Планировки','#plans'],['Wellness','#well'],['Паркинг','#park'],['Локация','#location'],['Этапы','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-emerald-50" style={{ color: '#4C6B52' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#C7DAC5', color: '#122017' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#2E7D32', color: '#F7FBF7' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#122017", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              Клубный квартал у моря и гор — «Миндаль», Ялта
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#4C6B52", maxWidth: 720 }}>
              Дарсан-холм, панорамы Ялтинских гор и Чёрного моря. Закрытая территория без машин, аллеи с вечнозелёными посадками, SPA и фитнес. До набережной — около 20 минут пешком; до пляжей ~5–7 минут на авто.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["Квартиры и таунхаусы", <Building2 size={18} key="b" />],["3-уровневый подземный паркинг", <ParkingSquare size={18} key="p" />],["ФЗ‑214, эскроу", <ShieldCheck size={18} key="s" />],["Сдача — IV кв. 2025", <Calendar size={18} key="c" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#D9E6D6", color: "#122017" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#2E7D32", color: "#F7FBF7" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#C7DAC5", color: "#122017" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#D9E6D6" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(217,230,214,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1600&auto=format&fit=crop" alt="Горы и море в Ялте рядом с ЖК Миндаль" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="IV кв. 2025" label="Срок ввода" sub="по данным застройщика" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="≈1 га" label="Территория" sub="клубный формат" icon={<Trees size={18} />} /></div>
          <div className="h-full"><Stat value="~98 м/м" label="Паркинг" sub="подземный, 3 уровня" icon={<ParkingSquare size={18} />} /></div>
          <div className="h-full"><Stat value="88–230 м²" label="Метражи" sub="квартиры/таунхаусы" icon={<Ruler size={18} />} /></div>
        </div>
      </section>

      {/* О КВАРТАЛЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О квартале</h2>
            <p className="mt-4" style={{ color: '#4C6B52' }}>
              «Миндаль» — клубный премиальный проект на Дарсан-холме с собственным ландшафтным парком и камерной застройкой. Здесь сочетаются городская инфраструктура и спокойствие зелёной зоны: двор без машин, охрана 24/7, консьерж‑сервис и закрытая прогулочная аллея.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировочные решения', t: 'Одно- и двухуровневые квартиры, пентхаусы; трёхэтажные таунхаусы с террасами.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Современные лифты, видеонаблюдение, контроль доступа, энергоэффективные решения.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой формат', t: 'ФЗ‑214, расчёты через эскроу‑счета.', icon: <ShieldCheck size={18} /> },
                { h: 'Wellness', t: 'SPA (хамам, купель), фитнес/йога‑зал, места для медитаций.', icon: <Bath size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#D9E6D6', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#122017' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#4C6B52' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#EAF5EA', borderColor: '#D9E6D6' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#122017' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#4C6B52' }}>
              <li><MapPin size={14} className="inline mr-2" /> Ялта, ул. Халтурина, 36А (Дарсан-холм)</li>
              <li><Mountain size={14} className="inline mr-2" /> Панорамные виды на горы и море</li>
              <li><FileText size={14} className="inline mr-2" /> Форматы: квартиры, таунхаусы; отделка — предчистовая</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#2E7D32', color: '#F7FBF7' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* WELLNESS */}
      <section id="well" className="py-14 md:py-20" style={{ backgroundColor: '#EAF5EA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Bath size={22} /> Wellness и рекреация</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4C6B52' }}>
              {[
                { t: 'SPA‑комплекс: хамам, купель, зоны релакса', icon: <Stethoscope size={16} /> },
                { t: 'Фитнес‑зал и площадка воркаут', icon: <Dumbbell size={16} /> },
                { t: 'Аллея для променада, амфитеатр, сухой фонтан', icon: <Trees size={16} /> },
                { t: 'Детская площадка и игровая комната', icon: <Baby size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9E6D6' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#122017' }}>
              <ParkingSquare size={18} /> Паркинг и сервис
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#4C6B52' }}>
              {["Подземный паркинг на 3 уровнях", "Около 98 парковочных мест", "Консьерж‑сервис и лобби", "Зарядка для электромобилей"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F7FBF7', borderColor: '#D9E6D6' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и виды</h2>
          <p className="mt-3" style={{ color: '#4C6B52' }}>
            От одноуровневых и двухуровневых квартир до трёхэтажных таунхаусов с террасами. По запросу пришлём PDF‑каталог с планами, этажами и ориентацией вида.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Квартиры", d: "Европланировки, большие окна, балконы/лоджии", icon: <Home size={18} /> },
              { t: "Двухуровневые", d: "С отдельными входами/галереями, возможны террасы", icon: <Home size={18} /> },
              { t: "Таунхаусы", d: "3 этажа, патио и террасы, отдельные входы", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9E6D6' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#122017' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#4C6B52' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#2E7D32' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#EAF5EA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4C6B52' }}>
              {[
                'Россия, Республика Крым, г. Ялта, ул. Халтурина, 36А (Дарсан-холм)',
                'Около 20 минут пешком до набережной Ялты (верхняя станция канатной дороги поблизости)',
                '~5–7 минут на авто до пляжей; рядом заповедные маршруты и парковая зона',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Route size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#D9E6D6' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%AF%D0%BB%D1%82%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A5%D0%B0%D0%BB%D1%82%D1%83%D1%80%D0%B8%D0%BD%D0%B0%2C%2036%D0%90&z=16" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СТАТУС И ЭТАПЫ */}
      <section id="status" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Статус и этапы</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "График", d: "Ориентир ввода — IV кв. 2025", icon: <Calendar size={18} /> },
            { t: "Формат", d: "Квартиры и таунхаусы, высота потолков ~3 м", icon: <Building2 size={18} /> },
            { t: "Право", d: "ФЗ‑214, расчёты через эскроу", icon: <ShieldCheck size={18} /> },
            { t: "Девелопер", d: "ООО «СЗ Исток»", icon: <FileText size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9E6D6' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#122017' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#4C6B52' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#EAF5EA' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где находится объект?", a: "Ялта, ул. Халтурина, 36А — Дарсан-холм, ближе к верхней станции канатной дороги." },
              { q: "Когда планируется сдача?", a: "По информации застройщика — декабрь 2025 (IV квартал 2025)." },
              { q: "Есть ли подземный паркинг?", a: "Да, подземный паркинг на трёх уровнях примерно на 98 машино‑мест." },
              { q: "Какой формат покупки?", a: "ФЗ‑214 с использованием эскроу‑счетов; отделка предчистовая." },
              { q: "Есть ли wellness‑зоны?", a: "SPA‑комплекс (хамам, купель), фитнес/йога‑зал, променады и амфитеатр." },
              { q: "Какие типы планировок?", a: "Одноуровневые и двухуровневые квартиры, а также трёхэтажные таунхаусы с террасами." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#D9E6D6' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#122017' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#4C6B52' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где находится объект?", "acceptedAnswer": { "@type": "Answer", "text": "Ялта, ул. Халтурина, 36А — Дарсан-холм, ближе к верхней станции канатной дороги." } },
            { "@type": "Question", "name": "Когда планируется сдача?", "acceptedAnswer": { "@type": "Answer", "text": "По информации застройщика — декабрь 2025 (IV квартал 2025)." } },
            { "@type": "Question", "name": "Есть ли подземный паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Да, подземный паркинг на трёх уровнях примерно на 98 машино‑мест." } },
            { "@type": "Question", "name": "Какой формат покупки?", "acceptedAnswer": { "@type": "Answer", "text": "ФЗ‑214, расчёты через эскроу, отделка предчистовая." } },
            { "@type": "Question", "name": "Есть ли wellness‑зоны?", "acceptedAnswer": { "@type": "Answer", "text": "SPA‑комплекс (хамам, купель), фитнес/йога‑зал; променады и амфитеатр." } },
            { "@type": "Question", "name": "Какие типы планировок?", "acceptedAnswer": { "@type": "Answer", "text": "Одноуровневые и двухуровневые квартиры, трёхэтажные таунхаусы." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#4C6B52' }}>
              Пришлём PDF с планировками и типами видов, актуальные предложения и условия покупки (ипотека/рассрочка), а также статус очередей.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#C7DAC5', color: '#122017' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D9E6D6' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#122017' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#4C6B52' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#122017' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#4C6B52' }}>
                  Оставьте контакты — вышлем актуальные предложения по ЖК «Миндаль».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9E6D6' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9E6D6' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9E6D6' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D9E6D6' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#2E7D32', color: '#F7FBF7' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#4C6B52' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#4C6B52' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#D9E6D6' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#4C6B52' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#122017' }}>
              <Home size={16} /> ЖК «Миндаль»
            </div>
            <p className="mt-2">Россия, Республика Крым, г. Ялта, ул. Халтурина, 36А</p>
            <p className="mt-1">ФЗ‑214, эскроу. Девелопер: ООО «СЗ Исток». Клубный формат.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК Миндаль",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Халтурина, 36А",
          "addressLocality": "Ялта",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#2E7D32", color: "#F7FBF7", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
