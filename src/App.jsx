import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Stethoscope,
  Store, Trees, Dumbbell, Handshake, ArrowUp, Calendar, Route, Waves, Sun, KeyRound
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "Клубный дом «Массандра Парк» — Массандра/Ялта, у парка и моря";

  const meta = [
    { name: "description", content: "Клубный дом «Массандра Парк» в Массандре (Ялта): 9 этажей, апартаменты 26–244 м² с потолками 3,6–4,5 м, подземный паркинг на ~60 м/м, авторское лобби, открытый всесезонный бассейн, эксплуатируемая кровля с лаундж-зонами. 50 м до Массандровского парка, ~300 м до Массандровского пляжа. ФЗ‑214, эскроу. Ориентир сдачи — 2026 г." },
    { property: "og:title", content: "Клубный дом «Массандра Парк» — апартаменты у парка и моря" },
    { property: "og:description", content: "Панорамные виды, просторные террасы, подземный паркинг, бассейн и лаундж на крыше. Адрес: пгт Массандра, ул. Мухина, 17А." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-massandra-park.jpg" },
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
      style={{ borderColor: "#D8E2F0", backgroundColor: "#FFFFFF", color: "#0F1B24" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #0E7490 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4C6A84" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#D8E2F0", backgroundColor: "#F4F9FF", color: "#0F1B24" }}>
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
    <div className="min-h-screen relative" style={{ backgroundColor: "#F6FAFE", color: "#0F1B24", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: мягкие волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E8F2FA 0%, #F6FAFE 45%, #F6FAFE 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#D8E2F0" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#E3EDF9" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: grid-шапка с воздушными отступами */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(246,250,254,0.9)", borderColor: "#D8E2F0" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0F1B24", color: "#E8F2FA" }}>MP</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">Массандра Парк</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#4C6A84" }}>
                <MapPin size={12} className="inline mr-1" /> пгт Массандра · ул. Мухина, 17А (Ялта)
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О доме", "Планировки", "Сервис", "Крыша", "Локация", "Статус", "FAQ"].map((t, i) => (
                <a key={i} href={["#about","#plans","#amen","#roof","#location","#status","#faq"][i]} className="hover:text-cyan-800 whitespace-nowrap transition-colors" style={{ color: "#4C6A84" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#BDD0E4", color: "#0F1B24" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0E7490", color: "#F6FAFE" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#D8E2F0' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О доме','#about'],['Планировки','#plans'],['Сервис','#amen'],['Крыша','#roof'],['Локация','#location'],['Статус','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-cyan-50" style={{ color: '#4C6A84' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#BDD0E4', color: '#0F1B24' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#0E7490', color: '#F6FAFE' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0F1B24", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              Клубный дом у парка и моря — «Массандра Парк»
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#4C6A84", maxWidth: 720 }}>
              Тихая часть Ялты в окружении Массандровского парка: до зелёных аллей ~50 м, до пляжа порядка 300 м. Апартаменты с высокими потолками и панорамным остеклением, подземный паркинг и сервис курортного уровня.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["~50 м до парка", <Trees size={18} key="t" />],["~300 м до пляжа", <Waves size={18} key="w" />],["ФЗ‑214, эскроу", <ShieldCheck size={18} key="s" />],["Ориентир сдачи — 2026", <Calendar size={18} key="c" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#D8E2F0", color: "#0F1B24" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0E7490", color: "#F6FAFE" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#BDD0E4", color: "#0F1B24" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#D8E2F0" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(216,226,240,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1600&auto=format&fit=crop" alt="Горы и море рядом с Массандрой" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="9 этажей" label="Высотность" sub="клубный дом" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="26–244 м²" label="Площади" sub="апартаменты" icon={<Ruler size={18} />} /></div>
          <div className="h-full"><Stat value="3,6–4,5 м" label="Потолки" sub="панорамное остекление" icon={<Sun size={18} />} /></div>
          <div className="h-full"><Stat value="~60 м/м" label="Паркинг" sub="подземный" icon={<ParkingSquare size={18} />} /></div>
        </div>
      </section>

      {/* О ДОМЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx_auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#4C6A84' }}>
              «Массандра Парк» — камерный дом премиального уровня у входа в Массандровский парк. Авторская архитектура, лобби‑галерея, дворы без машин и эксплуатируемая кровля с лаундж‑пространствами. Внутри — планировки от компактных до видових с террасами.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировки', t: 'Апартаменты 26–244 м²; террасы и лоджии, варианты видовых угловых планов.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Современные лифты, видеонаблюдение, контроль доступа, энергоэффективные решения.', icon: <CircuitBoard size={18} /> },
                { h: 'Право и расчёты', t: 'ФЗ‑214, расчёты через эскроу‑счета.', icon: <ShieldCheck size={18} /> },
                { h: 'Инфраструктура', t: 'Открытый всесезонный бассейн, ресторан/лобби‑бар, детская комната, игровые площадки.', icon: <Store size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#D8E2F0', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0F1B24' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#4C6A84' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#E8F2FA', borderColor: '#D8E2F0' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F1B24' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#4C6A84' }}>
              <li><MapPin size={14} className="inline mr-2" /> пгт Массандра, ул. Мухина, 17А</li>
              <li><Trees size={14} className="inline mr-2" /> 50 м до входа в Массандровский парк</li>
              <li><Waves size={14} className="inline mr-2" /> ~300 м до Массандровского пляжа</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#0E7490', color: '#F6FAFE' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* КРЫША / ЛАУНДЖ */}
      <section id="roof" className="py-14 md:py-20" style={{ backgroundColor: '#E8F2FA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Sun size={22} /> Эксплуатируемая кровля</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4C6A84' }}>
              {[
                { t: 'Лаундж‑пространства для резидентов', icon: <KeyRound size={16} /> },
                { t: 'Панорамы моря и парка', icon: <Waves size={16} /> },
                { t: 'Зоны отдыха и событийные площадки', icon: <Store size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D8E2F0' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F1B24' }}>
              <Bath size={18} /> Wellness и досуг
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#4C6A84' }}>
              {["Открытый всесезонный бассейн", "Ресторан/лобби‑бар", "Детская комната", "Зоны для тренировок"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F6FAFE', borderColor: '#D8E2F0' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и виды</h2>
          <p className="mt-3" style={{ color: '#4C6A84' }}>
            Форматы от компактных до просторных видових апартаментов с террасами. По запросу пришлём PDF‑каталог с планами, этажами и ориентацией видов.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Компактные", d: "Рациональные европланировки, балконы/лоджии", icon: <Home size={18} /> },
              { t: "1–2‑комнатные", d: "Большие окна, сценарии хранения, варианты с террасами", icon: <Home size={18} /> },
              { t: "Видовые", d: "Угловые планы и пентхаусы, панорамы моря/парка", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D8E2F0' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0F1B24' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#4C6A84' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0E7490' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#E8F2FA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4C6A84' }}>
              {[
                'Республика Крым, г.о. Ялта, пгт Массандра, ул. Мухина, 17А',
                'Массандровский парк — ~50 м от дома; прогулочные аллеи и исторические локации',
                'Массандровский пляж — ориентировочно 300 м; набережная Ялты ~1,5 км',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Route size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#D8E2F0' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9C%D1%83%D1%85%D0%B8%D0%BD%D0%B0%2C%2017%D0%90&z=16" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СТАТУС И ДОКУМЕНТЫ */}
      <section id="status" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Статус и документы</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Сроки", d: "Ориентир сдачи — 2026 год (по витринам/ЕИСЖС)", icon: <Calendar size={18} /> },
            { t: "Высотность", d: "Дом 9 этажей", icon: <Building2 size={18} /> },
            { t: "Правовой формат", d: "Апартаменты по ФЗ‑214, расчёты через эскроу", icon: <ShieldCheck size={18} /> },
            { t: "Застройщик", d: "ООО СЗ «Массандра Парк» / ГК «Таврида Девелопмент»", icon: <FileText size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#D8E2F0' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#0F1B24' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#4C6A84' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-4 text-sm" style={{ color: '#4C6A84' }}>
          Документы (проектная декларация, разрешение на строительство и др.) доступны на портале ЕИСЖС и на страницах девелопера.
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#E8F2FA' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где находится дом?", a: "Республика Крым, г.о. Ялта, пгт Массандра, ул. Мухина, 17А." },
              { q: "Как далеко парк и море?", a: "До входа в Массандровский парк около 50 м, до Массандровского пляжа — примерно 300 м." },
              { q: "Какая инфраструктура?", a: "Открытый бассейн, ресторан/лобби‑бар, детская комната, игровые зоны, лаундж на крыше." },
              { q: "Есть ли паркинг?", a: "Да, подземный паркинг ориентировочно на 60 машиномест." },
              { q: "Какой формат покупки?", a: "Апартаменты по ФЗ‑214, расчёты через эскроу‑счета." },
              { q: "Высота потолков и площади?", a: "Потолки 3,6–4,5 м, площади апартаментов — примерно 26–244 м²." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#D8E2F0' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0F1B24' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#4C6A84' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где находится дом?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г.о. Ялта, пгт Массандра, ул. Мухина, 17А." } },
            { "@type": "Question", "name": "Как далеко парк и море?", "acceptedAnswer": { "@type": "Answer", "text": "До Массандровского парка около 50 м, до Массандровского пляжа ~300 м." } },
            { "@type": "Question", "name": "Какая инфраструктура?", "acceptedAnswer": { "@type": "Answer", "text": "Открытый всесезонный бассейн, ресторан/лобби‑бар, детская комната, лаундж на крыше." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Подземный паркинг ориентировочно на 60 машиномест." } },
            { "@type": "Question", "name": "Какой формат покупки?", "acceptedAnswer": { "@type": "Answer", "text": "Апартаменты по ФЗ‑214, расчёты через эскроу." } },
            { "@type": "Question", "name": "Высота потолков и площади?", "acceptedAnswer": { "@type": "Answer", "text": "Потолки 3,6–4,5 м; площади ~26–244 м²." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#4C6A84' }}>
              Пришлём PDF с планировками и типами видов, актуальные предложения и условия покупки, а также статус строительства.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#BDD0E4', color: '#0F1B24' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#D8E2F0' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0F1B24' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#4C6A84' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0F1B24' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#4C6A84' }}>
                  Оставьте контакты — вышлем актуальные предложения по «Массандра Парк».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D8E2F0' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D8E2F0' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D8E2F0' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#D8E2F0' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#0E7490', color: '#F6FAFE' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#4C6A84' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#4C6A84' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#D8E2F0' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#4C6A84' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0F1B24' }}>
              <Home size={16} /> Массандра Парк
            </div>
            <p className="mt-2">Республика Крым, г.о. Ялта, пгт Массандра, ул. Мухина, 17А</p>
            <p className="mt-1">214‑ФЗ, эскроу. Девелопер: ООО СЗ «Массандра Парк» (ГК «Таврида Девелопмент»). Дом 9 этажей.</p>
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
        "name": "Клубный дом Массандра Парк",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Мухина, 17А",
          "addressLocality": "Массандра (Ялта)",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#0E7490", color: "#F6FAFE", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
