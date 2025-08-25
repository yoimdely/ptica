import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Stethoscope,
  Store, Trees, Dumbbell, Handshake, ArrowUp, Calendar, Route, Waves, Sun, KeyRound, Baby
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Птица» — Саки, первая линия у моря: апартаменты 5* формата";

  const meta = [
    { name: "description", content: "Апарт-комплекс «Птица» в Саках (Крым): первая береговая линия на ул. Морская, 2А; архитектура в образе птицы, 3–16 этажей, четыре корпуса, территория около 13 гектаров, собственный пляж примерно 3 гектара, wellness- и медкластер, СПА, бассейны, ресторан, фитнес. ФЗ‑214, эскроу. Этапы ввода: 2028." },
    { property: "og:title", content: "ЖК «Птица» — апартаменты у моря в Саках" },
    { property: "og:description", content: "Панорамы моря, SPA и медцентр, собственный пляж, паркинг и сервис 5*. Адрес: Саки, ул. Морская, 2А." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-ptitsa.jpg" },
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
    pl.href = "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop"; // море — заглушка
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
      style={{ borderColor: "#CFE3EE", backgroundColor: "#FFFFFF", color: "#0E1A24" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #0E7490 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#466A80" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#CFE3EE", backgroundColor: "#F0FAFD", color: "#0E1A24" }}>
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
    <div className="min-h-screen relative" style={{ backgroundColor: "#F5FBFE", color: "#0E1A24", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: волны и ветер */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E6F2FA 0%, #F5FBFE 45%, #F5FBFE 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#CFE3EE" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#DCEBF5" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: широкая grid-шапка */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(245,251,254,0.9)", borderColor: "#CFE3EE" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0E1A24", color: "#E6F2FA" }}>PT</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Птица»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#466A80" }}>
                <MapPin size={12} className="inline mr-1" /> Саки · ул. Морская, 2А — первая линия у моря
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О комплексе", "Планировки", "Wellness", "Пляж", "Локация", "Этапы", "FAQ"].map((t, i) => (
                <a key={i} href={["#about","#plans","#well","#beach","#location","#status","#faq"][i]} className="hover:text-cyan-800 whitespace-nowrap transition-colors" style={{ color: "#466A80" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#B8D2E2", color: "#0E1A24" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0E7490", color: "#F5FBFE" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#CFE3EE' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О комплексе','#about'],['Планировки','#plans'],['Wellness','#well'],['Пляж','#beach'],['Локация','#location'],['Этапы','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-cyan-50" style={{ color: '#466A80' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#B8D2E2', color: '#0E1A24' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#0E7490', color: '#F5FBFE' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0E1A24", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              Санаторно‑курортный апарт‑комплекс у моря — «Птица»
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#466A80", maxWidth: 720 }}>
              Первая береговая линия в Саках: архитектура, вдохновлённая силуэтом птицы, wellness‑кластер со SPA и медцентром, собственный песчаный пляж порядка 3 гектаров. Корпуса высотой от 3 до 16 этажей, панорамные виды на море.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["Первая линия у моря", <Waves size={18} key="w" />],["3–16 этажей, 4 корпуса", <Building2 size={18} key="b" />],["ФЗ‑214, эскроу", <ShieldCheck size={18} key="s" />],["Этапы ввода — 2028", <Calendar size={18} key="c" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#CFE3EE", color: "#0E1A24" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0E7490", color: "#F5FBFE" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#B8D2E2", color: "#0E1A24" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#CFE3EE" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(207,227,238,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop" alt="Море рядом с апарт-комплексом Птица" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="~13 Га" label="Территория" sub="по данным витрин" icon={<Trees size={18} />} /></div>
          <div className="h-full"><Stat value="3–16" label="Этажей" sub="по корпусам" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="около 3 Га" label="Собственный пляж" sub="закрытая зона отдыха" icon={<Sun size={18} />} /></div>
          <div className="h-full"><Stat value="до 2028" label="Сроки" sub="этапность по очередям" icon={<Calendar size={18} />} /></div>
        </div>
      </section>

      {/* О КОМПЛЕКСЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О комплексе</h2>
            <p className="mt-4" style={{ color: '#466A80' }}>
              «Птица» — курортный апарт‑кластер премиального уровня на первой линии: архитектура напоминает белую птицу, устремлённую к морю. Внутри — панорамные окна, виды на воду почти из каждого апартамента, дворы без машин и собственная сервисная инфраструктура.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировки', t: 'От компактных форматов до просторных апартаментов и пентхаусов; лоджии и террасы.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Системы доступа, видеонаблюдение, энергоэффективные решения и современные лифты.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой формат', t: 'ФЗ‑214, расчёты через эскроу‑счета; ипотечные программы доступны.', icon: <ShieldCheck size={18} /> },
                { h: 'Международный оператор', t: 'Управление отельной частью и программами размещения — оператор уровня 5*.', icon: <KeyRound size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#CFE3EE', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0E1A24' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#466A80' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#E6F2FA', borderColor: '#CFE3EE' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1A24' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#466A80' }}>
              <li><MapPin size={14} className="inline mr-2" /> Саки, ул. Морская, 2А</li>
              <li><Building2 size={14} className="inline mr-2" /> 4 корпуса, высотность от 3 до 16 этажей</li>
              <li><FileText size={14} className="inline mr-2" /> Формат: апартаменты; управление отельным оператором</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#0E7490', color: '#F5FBFE' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* WELLNESS И МЕДЦЕНТР */}
      <section id="well" className="py-14 md:py-20" style={{ backgroundColor: '#E6F2FA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Bath size={22} /> Wellness и медцентр</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#466A80' }}>
              {[
                { t: 'Крупная SPA‑зона: сауны, хаммамы, купели под открытым небом', icon: <Stethoscope size={16} /> },
                { t: 'Фитнес‑зал и студии активности', icon: <Dumbbell size={16} /> },
                { t: 'Кабинеты процедур и программы восстановления', icon: <FileText size={16} /> },
                { t: 'Кафе и ритейл на первых уровнях', icon: <Store size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#CFE3EE' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1A24' }}>
              <ParkingSquare size={18} /> Паркинг и сервис
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#466A80' }}>
              {["Подземные и наземные места для авто", "Пропускная система и охрана", "Консьерж‑сервис и лобби", "Программы аренды для собственников"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F5FBFE', borderColor: '#CFE3EE' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛЯЖ */}
      <section id="beach" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Waves size={22} /> Собственный пляж</h2>
          <p className="mt-3" style={{ color: '#466A80' }}>
            Для резидентов предусмотрен оборудованный песчаный пляж ориентировочной площадью около трёх гектаров с лаундж‑зонами, душами и кабинами переодевания. Зона отдыха находится в шаговой доступности от корпусов.
          </p>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20" style={{ backgroundColor: '#E6F2FA' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и виды</h2>
          <p className="mt-3" style={{ color: '#466A80' }}>
            Апартаменты от компактных до видовых угловых и пентхаусов с террасами. По запросу пришлём PDF‑каталог с планами, этажами и ориентацией вида.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Стартовые форматы", d: "Европланировки, кухни‑гостиные, балконы/лоджии", icon: <Home size={18} /> },
              { t: "1–2‑комнатные", d: "Панорамные окна, места хранения, варианты с видами на море", icon: <Home size={18} /> },
              { t: "Пентхаусы", d: "Террасы, увеличенные площади и потолки", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#CFE3EE' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0E1A24' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#466A80' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0E7490' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#466A80' }}>
              {[
                'Россия, Республика Крым, г. Саки, ул. Морская, 2А',
                'Первая береговая линия, выход к оборудованному пляжу',
                'Курортная инфраструктура, рестораны и прогулочные маршруты поблизости',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Route size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#CFE3EE' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%B0%D0%BA%D0%B8%2C%20%D1%83%D0%BB.%20%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2C%202%D0%90&z=16" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СТАТУС И ЭТАПЫ */}
      <section id="status" className="py-14 md:py-20" style={{ backgroundColor: '#E6F2FA' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Статус и этапы</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Сроки", d: "Ориентир сдачи по корпусам — 2028 год (II–III кварталы по витринам)", icon: <Calendar size={18} /> },
            { t: "Масштаб", d: "4 корпуса на участке около 13 гектаров", icon: <Trees size={18} /> },
            { t: "Высотность", d: "От 3 до 16 этажей по секциям", icon: <Building2 size={18} /> },
            { t: "Право", d: "Апартаменты по ФЗ‑214, расчёты через эскроу", icon: <ShieldCheck size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#CFE3EE' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#0E1A24' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#466A80' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где находится объект?", a: "Республика Крым, г. Саки, ул. Морская, 2А — первая береговая линия." },
              { q: "Какие сроки?", a: "По материалам витрин и ЕИСЖС — ввод очередей ожидается в течение 2028 года." },
              { q: "Есть ли собственный пляж?", a: "Да, ориентировочная площадь пляжной зоны около трёх гектаров." },
              { q: "Какой формат покупки?", a: "Апартаменты в рамках ФЗ‑214 с расчётами через эскроу‑счета; доступны ипотечные программы." },
              { q: "Что по wellness и медицине?", a: "SPA‑комплекс, фитнес, процедуры восстановления; медкластер на территории." },
              { q: "Кто управляет сервисом?", a: "Предусмотрено управление международным отельным оператором, действует программа аренды." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#CFE3EE' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0E1A24' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#466A80' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где находится объект?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г. Саки, ул. Морская, 2А — первая береговая линия." } },
            { "@type": "Question", "name": "Какие сроки?", "acceptedAnswer": { "@type": "Answer", "text": "Согласно материалам витрин и порталов, ввод очередей ожидается в 2028 году." } },
            { "@type": "Question", "name": "Есть ли собственный пляж?", "acceptedAnswer": { "@type": "Answer", "text": "Да, ориентировочная площадь пляжа около 3 гектаров." } },
            { "@type": "Question", "name": "Какой формат покупки?", "acceptedAnswer": { "@type": "Answer", "text": "Апартаменты по ФЗ‑214 с расчётами через эскроу." } },
            { "@type": "Question", "name": "Что по wellness и медицине?", "acceptedAnswer": { "@type": "Answer", "text": "SPA‑зона, фитнес, медцентр и процедуры восстановления." } },
            { "@type": "Question", "name": "Кто управляет сервисом?", "acceptedAnswer": { "@type": "Answer", "text": "Предусмотрено управление международным оператором и арендная программа." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20" style={{ backgroundColor: '#F5FBFE' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#466A80' }}>
              Пришлём PDF с планировками и типами видов, актуальные предложения, условия покупки и статус строительства.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#B8D2E2', color: '#0E1A24' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#CFE3EE' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0E1A24' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#466A80' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0E1A24' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#466A80' }}>
                  Оставьте контакты — вышлем актуальные предложения по ЖК «Птица».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CFE3EE' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CFE3EE' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CFE3EE' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#CFE3EE' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#0E7490', color: '#F5FBFE' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#4A6D84' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#4A6D84' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#CFE3EE' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#466A80' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1A24' }}>
              <Home size={16} /> ЖК «Птица»
            </div>
            <p className="mt-2">Россия, Республика Крым, г. Саки, ул. Морская, 2А</p>
            <p className="mt-1">ФЗ‑214, эскроу; международный отельный оператор. Курортный премиум‑формат.</p>
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
        "name": "ЖК Птица",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Морская, 2А",
          "addressLocality": "Саки",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#0E7490", color: "#F5FBFE", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
