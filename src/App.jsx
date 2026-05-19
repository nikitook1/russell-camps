import React, { useEffect, useMemo, useRef, useState } from "react";

function Icon({ name }) {
  const icons = {
    search: "🔎",
    pin: "📍",
    star: "⭐",
    shield: "🛡️",
    heart: "♡",
    heartFull: "♥",
    calendar: "📅",
    users: "👥",
    home: "🏠",
    chat: "💬",
    check: "✅",
    close: "✕",
    arrow: "→",
    school: "🏫",
    football: "⚽",
    crown: "👑",
    plane: "✈️",
    question: "❓",
  };
  return <span className="inline-flex items-center justify-center">{icons[name] || "•"}</span>;
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-rose-900 text-white hover:bg-rose-950",
    secondary: "bg-white text-rose-900 border border-rose-200 hover:bg-rose-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    dark: "bg-slate-950 text-white hover:bg-black",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, tone = "light" }) {
  const styles = {
    light: "bg-slate-100 text-slate-700",
    red: "bg-rose-50 text-rose-900",
    green: "bg-emerald-50 text-emerald-700",
    gold: "bg-amber-50 text-amber-700",
    dark: "bg-slate-950 text-white",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${styles[tone]}`}>{children}</span>;
}

function CountUp({ end, suffix = "", duration = 1800 }) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const hasAnimated = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setHasStarted(true);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const steps = 70;
    const increment = end / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.round(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const DEFAULT_SCHEDULE = ["Будние дни", "Завтрак", "Уроки английского языка", "Обед", "Экскурсия", "Ужин", "Вечерняя развлекательная программа", "Выходные дни", "Полный день экскурсии по Лондону"];

const PROGRAMS = [
  {
    id: 1,
    title: "Royal Leamington Spa",
    provider: "Warwick Trident College",
    type: "Английский + экскурсии",
    country: "Великобритания",
    city: "Royal Leamington Spa",
    age: "10–17",
    duration: "2 недели",
    dates: "28 июня – 2 июля / 28 июля – 11 августа",
    accommodation: "2–3 местное проживание в принимающих семьях",
    english: "30 часов",
    program: "Современный, хорошо оборудованный кампус в самом сердце Уорикшира. Warwick Trident College предлагает чистую, современную и профессиональную среду, идеально подходящую для летнего обучения. Кампус включает в себя специально построенные классы и учебные помещения, предназначенные для целенаправленного обучения и интерактивных занятий.",
    excursions: "Двухнедельная программа предлагает посетить следующие города и местности:",
    excursionsList: ["Royal Leamington Spa", "Stratford-upon-Avon", "Coventry", "Warwick", "Kenilworth", "London"],
    schedule: DEFAULT_SCHEDULE,
    price: 2200,
    currency: "£",
    rating: 4.7,
    reviews: 42,
    safety: 9.1,
    tag: "Кампус в Уорикшире",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Greenwich",
    provider: "Oxford International",
    type: "Английский + экскурсии",
    country: "Великобритания",
    city: "London",
    age: "12–17",
    duration: "2 недели",
    dates: "28 июня – 12 июля / 12 июля – 26 июля / 26 июля – 9 августа",
    accommodation: "2–3 местное проживание в принимающих семьях",
    english: "30 часов",
    program: "Старый Королевский военно-морской колледж в Гринвиче расположен на живописном участке реки Темзы, внесённом в список Всемирного наследия ЮНЕСКО. Среди местных достопримечательностей — Национальный морской музей, корабль «Катти Сарк», Королевская обсерватория и Гринвичский парк — всё это всего в 15 минутах от центра Лондона.",
    excursions: "Двухнедельная программа предлагает посетить следующие города и местности:",
    excursionsList: ["London", "Greenwich", "Cambridge", "Brighton"],
    schedule: DEFAULT_SCHEDULE,
    price: 2200,
    currency: "£",
    rating: 4.8,
    reviews: 65,
    safety: 9.2,
    tag: "Greenwich + Лондон",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Oxford",
    provider: "Oxford International",
    type: "Английский + экскурсии",
    country: "Великобритания",
    city: "Oxford",
    age: "12–17",
    duration: "2 недели",
    dates: "28 июня – 12 июля / 12 июля – 26 июля / 26 июля – 9 августа",
    accommodation: "2–3 местное проживание в принимающих семьях",
    english: "30 часов",
    program: "Оксфорд расположен на юго-востоке Англии, примерно в 90 километрах от Лондона. Город пропитан историей, уходящей корнями в XI век, и полон архитектурных шедевров. Больше всего он знаменит своим университетом, который является вторым по возрасту в мире.",
    excursions: "Двухнедельная программа предлагает посетить следующие города и местности:",
    excursionsList: ["Oxford", "London"],
    schedule: DEFAULT_SCHEDULE,
    price: 2200,
    currency: "£",
    rating: 4.8,
    reviews: 71,
    safety: 9.3,
    tag: "Оксфордская атмосфера",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Bath",
    provider: "Bath University",
    type: "Английский + экскурсии",
    country: "Великобритания",
    city: "Bath",
    age: "11–17",
    duration: "2 недели",
    dates: "1 июля – 15 июля / 15 июля – 29 июля / 29 июля – 12 августа",
    accommodation: "Резиденция: single, twin или triple rooms",
    english: "30 часов",
    program: "University of Bath — молодой вуз, основанный в 1966 году. Этот оживлённый кампус, расположенный прямо на окраине города Бат, предлагает богатый выбор спортивных, социальных и культурных возможностей. Он известен как один из самых безопасных университетских кампусов в Великобритании.",
    excursions: "Двухнедельная программа предлагает посетить следующие города и местности:",
    excursionsList: ["Bath", "London", "Bristol"],
    schedule: DEFAULT_SCHEDULE,
    price: 2600,
    currency: "£",
    rating: 4.7,
    reviews: 54,
    safety: 9.4,
    tag: "Кампус Bath University",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Leighton Park School",
    provider: "Leighton Park School",
    type: "Английский + экскурсии",
    country: "Великобритания",
    city: "Reading",
    age: "13–17",
    duration: "2 недели",
    dates: "7 июля – 21 июля / 21 июля – 4 августа / 4 августа – 18 августа",
    accommodation: "Резиденция: стандартные комнаты на 1–4 человека",
    english: "30 часов",
    program: "Leighton Park School находится в городе Reading, недалеко от Лондона. Это зелёный и просторный кампус с атмосферой классической британской школы-пансиона, где учебные корпуса, резиденции и зоны для активностей расположены на одной территории. Локация подходит для студентов, которым важны спокойная среда, безопасность и насыщенная программа на кампусе.",
    excursions: "В программу входят экскурсии на полдня и на полный день по ключевым направлениям Англии:",
    excursionsList: ["Oxford", "Bath", "Cambridge", "London"],
    schedule: DEFAULT_SCHEDULE,
    price: 3200,
    currency: "£",
    rating: 4.8,
    reviews: 49,
    safety: 9.5,
    tag: "Английский + навыки",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "London Explorer",
    provider: "Queen Mary University of London",
    type: "Премиум Локация",
    country: "Великобритания",
    city: "London",
    age: "11–18",
    duration: "2 недели",
    dates: "21 июня – 5 июля / 28 июня – 12 июля / 12 июля – 26 июля / 26 июля – 9 августа / 9 августа – 23 августа",
    accommodation: "Резиденция: single en-suite или single standard",
    english: "30 часов",
    program: "Queen Mary University of London входит в элитную группу британских университетов Russell. Здесь, на кампусе, расположены аудитории, зоны отдыха, столовая и общежития, а также множество зелёных зон, деревьев и скамеек.",
    excursions: "Двухнедельная программа предлагает насыщенное знакомство с Лондоном и его главными достопримечательностями:",
    excursionsList: ["Buckingham Palace", "Madame Tussauds", "Greenwich", "Tate Modern", "National Gallery", "British Museum", "Science Museum", "Natural History Museum", "Brighton"],
    schedule: DEFAULT_SCHEDULE,
    price: 3400,
    currency: "£",
    rating: 4.8,
    reviews: 88,
    safety: 9.3,
    tag: "Все экскурсии по Лондону",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "UCL",
    provider: "UCL Central, Bloomsbury",
    type: "Премиум Локация",
    country: "Великобритания",
    city: "London",
    age: "12–18",
    duration: "2 недели",
    dates: "1 июля – 15 июля / 16 июля – 30 июля / 31 июля – 14 августа",
    accommodation: "Резиденция: single en-suite",
    english: "30 часов",
    program: "Расположенный в академическом и культурном центре Лондона, University College London предлагает студентам уникальное сочетание вдохновения и возможностей. Британский музей находится совсем рядом, на каждой улице можно увидеть знаковые архитектурные сооружения, а неподалёку расположены тихие зелёные зоны, такие как Russell Square, что делает кампус идеально подходящим для обучения, открытий и общения — и всё это в самом сердце одного из самых динамичных городов мира.",
    excursions: "Двухнедельная программа предлагает знакомство с центральным Лондоном и его академической, культурной и исторической средой:",
    excursionsList: ["British Museum", "Russell Square", "Oxford", "Central London", "Museums and galleries", "London walking tours"],
    schedule: DEFAULT_SCHEDULE,
    price: 3400,
    currency: "£",
    rating: 4.9,
    reviews: 92,
    safety: 9.4,
    tag: "UCL в центре Лондона",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "English + Football with Tottenham Hotspur",
    provider: "Royal Holloway School / Tottenham Hotspur",
    type: "Английский + спорт",
    country: "Великобритания",
    city: "London",
    age: "10–17",
    duration: "2 недели",
    dates: "1 июля – 15 июля / 15 июля – 29 июля",
    accommodation: "Резиденция: traditional boarding houses, стандартные комнаты на 1–2 человека",
    english: "15 часов английского в неделю + 12 часов футбола в неделю",
    program: "Программа проходит на базе британского кампуса с полноценной инфраструктурой для обучения, проживания и спортивной подготовки. Студенты совмещают занятия английским языком с футбольными тренировками, а также участвуют в экскурсиях и мероприятиях, которые помогают познакомиться с футбольной культурой Великобритании.",
    excursions: "В программу входят футбольные и культурные выезды, связанные с Лондоном и спортом:",
    excursionsList: ["Wembley Stadium", "Tottenham Hotspur Stadium", "Brighton", "Thorpe Park"],
    schedule: DEFAULT_SCHEDULE,
    price: 3400,
    currency: "£",
    rating: 4.9,
    reviews: 77,
    safety: 9.4,
    tag: "Tottenham Hotspur",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "English + Arsenal FC Training",
    provider: "Oundle School / Seaford College / Forth School",
    type: "Английский + спорт",
    country: "Великобритания",
    city: "Oundle",
    age: "9–17",
    duration: "2 недели",
    dates: "28 июня – 12 июля / 5 июля – 19 июля / 12 июля – 26 июля / 19 июля – 2 августа",
    accommodation: "Студенческие резиденции в безопасных boarding houses на территории школы",
    english: "15 часов английского + 15 часов футбола в неделю",
    program: "Программа проходит на территории британских школ-пансионов с безопасной закрытой инфраструктурой для проживания, обучения и спортивных занятий. Основной фокус — английский язык и футбольные тренировки по методике Arsenal FC, поэтому программа подойдёт детям с футбольным опытом и интересом к профессиональной спортивной среде.",
    excursions: "В программу входят футбольные и культурные активности, связанные с Arsenal и городом:",
    excursionsList: ["Arsenal Emirates Stadium", "Культурная поездка по городу"],
    schedule: DEFAULT_SCHEDULE,
    price: 4200,
    currency: "£",
    rating: 4.9,
    reviews: 96,
    safety: 9.5,
    tag: "Arsenal FC",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Global Young Leaders",
    provider: "Winchester College",
    type: "Лидерство и STEM",
    country: "Великобритания",
    city: "Winchester",
    age: "13–16",
    duration: "2 недели",
    dates: "3 июля – 17 июля / 17 июля – 31 июля",
    accommodation: "Комфортные комнаты на 1–6 человек с общими ванными комнатами",
    english: "40 часов, уровень английского от B1",
    program: "Программа проходит в Winchester College — одной из самых известных и исторических школ Великобритании. Атмосфера старинного кампуса, академическая среда и формат проживания помогают студентам погрузиться в британскую образовательную культуру и развивать лидерские, презентационные и STEM-навыки.",
    excursions: "Каждую неделю предусмотрены экскурсии и выезды по культурным и развлекательным направлениям:",
    excursionsList: ["Thorpe Park", "Southampton", "London", "Oxford", "Portsmouth"],
    schedule: DEFAULT_SCHEDULE,
    price: 4500,
    currency: "£",
    rating: 4.9,
    reviews: 81,
    safety: 9.7,
    tag: "Лидерство и STEM",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },
];

const TYPES = ["Все", "Английский + экскурсии", "Английский + спорт", "Лидерство и STEM", "Премиум Локация"];
const CITIES = ["Все", "Royal Leamington Spa", "London", "Oxford", "Bath", "Reading", "Oundle", "Winchester"];

const TRUST_CARDS = [
  {
    icon: "school",
    title: "Не просто список лагерей",
    text: "Мы помогаем семье выбрать программу по возрасту, цели, бюджету, проживанию и уровню самостоятельности ребёнка.",
  },
  {
    icon: "shield",
    title: "Прозрачные условия до оплаты",
    text: "В карточках сразу видны даты, цена, город, формат проживания, часы английского, программа и экскурсии.",
  },
  {
    icon: "chat",
    title: "Менеджер Russell на связи",
    text: "После заявки мы уточним наличие мест, объясним дальнейшие шаги и поможем выбрать лучший вариант.",
  },
];

const HERO_BUBBLES = [
  {
    icon: "shield",
    title: "Спокойствие родителей",
    text: "Показываем даты, цену, проживание, часы английского и экскурсии до заявки.",
  },
  {
    icon: "plane",
    title: "Лето в Великобритании",
    text: "Лондон, Оксфорд, Bath, Winchester и кампусы с насыщенной программой.",
  },
  {
    icon: "chat",
    title: "Подбор с менеджером",
    text: "Поможем сравнить варианты и выбрать программу под возраст, цель и бюджет.",
  },
  {
    icon: "football",
    title: "Английский + интересы",
    text: "Футбол, лидерство, академические опции и живое погружение в среду.",
  },
];

const HERO_PHOTOS = [
  { title: "UK Campus Life", subtitle: "Атмосфера британского кампуса", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Happy Summer Camp", subtitle: "Новые друзья и летние впечатления", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop" },
  { title: "London Experience", subtitle: "Экскурсии и достопримечательности", url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop" },
  { title: "Oxford Atmosphere", subtitle: "Историческая академическая среда", url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1200&auto=format&fit=crop" },
  { title: "Football Training", subtitle: "Спорт, команда и английский", url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop" },
  { title: "Teenage Group", subtitle: "Международное общение", url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop" },
  { title: "UK Streets", subtitle: "Городская культура Великобритании", url: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop" },
  { title: "Student Community", subtitle: "Друзья со всего мира", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop" },
  { title: "Creative Activities", subtitle: "Занятия после уроков", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop" },
  { title: "London Landmark", subtitle: "Большой Бен и центр Лондона", url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format&fit=crop" },
  { title: "University Buildings", subtitle: "Учёба в красивой среде", url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop" },
  { title: "Summer Outdoors", subtitle: "Активности на свежем воздухе", url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Sports Field", subtitle: "Командная игра и тренировки", url: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1200&auto=format&fit=crop" },
  { title: "Classroom Moments", subtitle: "Английский в международной группе", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop" },
  { title: "Bath & Heritage", subtitle: "Исторические города Англии", url: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Brighton Trip", subtitle: "Море, прогулки и экскурсии", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
  { title: "Group Learning", subtitle: "Развитие и уверенность", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop" },
  { title: "Campus Residence", subtitle: "Проживание и безопасность", url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop" },
  { title: "Leadership Program", subtitle: "Навыки презентации и лидерства", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" },
  { title: "Unforgettable Summer", subtitle: "Эмоции, друзья и UK experience", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop" },
];

function ProgramCard({ program, onOpen, onBook, isFavorite, onFavorite, isCompared, onCompare }) {
  return (
    <div onClick={() => onOpen(program)} className="cursor-pointer overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge tone="red">{program.tag}</Badge>
          <Badge tone="green"><Icon name="shield" /> Проверено</Badge>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onFavorite(program.id); }} className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-2 text-lg shadow">
          {isFavorite ? <span className="text-rose-900">♥</span> : <Icon name="heart" />}
        </button>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black leading-tight text-slate-950">{program.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{program.provider}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xl font-black text-rose-900">{program.currency}{program.price.toLocaleString()}</div>
            <div className="text-xs text-slate-400">от</div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Icon name="pin" /> {program.city}</div>
          <div className="flex items-center gap-2"><Icon name="users" /> {program.age}</div>
          <div className="flex items-center gap-2"><Icon name="calendar" /> {program.duration}</div>
          <div className="flex items-center gap-2"><Icon name="home" /> Полный пансион</div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge>{program.type}</Badge>
          <Badge tone="green">Полный пансион</Badge>
          <Badge><Icon name="home" /> Проживание</Badge>
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{program.program}</p>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={(e) => { e.stopPropagation(); onOpen(program); }} className="w-full">Подробнее</Button>
          <Button variant={isCompared ? "dark" : "secondary"} onClick={(e) => { e.stopPropagation(); onCompare(program.id); }} className="w-full">{isCompared ? "В сравнении" : "Сравнить"}</Button>
        </div>
        <Button variant="ghost" onClick={(e) => { e.stopPropagation(); onBook(program); }} className="mt-2 w-full">Оставить заявку</Button>
      </div>
    </div>
  );
}

function DetailsModal({ program, onClose, onBook }) {
  const [activeDetailPhoto, setActiveDetailPhoto] = useState(0);

  useEffect(() => {
    if (!program) return;
    const timer = setInterval(() => {
      setActiveDetailPhoto((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(timer);
  }, [program]);

  if (!program) return null;

  const cityDistance = {
    "Royal Leamington Spa": "примерно 1.5 часа от Лондона",
    London: "Лондон",
    Oxford: "примерно 1 час от Лондона",
    Bath: "примерно 1.5–2 часа от Лондона",
    Reading: "примерно 30–40 минут от Лондона",
    Oundle: "примерно 1.5–2 часа от Лондона",
    Winchester: "примерно 1 час от Лондона",
  };

  const detailGalleryPhotos = HERO_PHOTOS.slice(0, 5);

  const sampleSchedule = program.schedule || [
    "08:00 — завтрак",
    "09:00 — занятия английским языком",
    "12:30 — обед",
    "14:00 — активности, спорт или экскурсии",
    "18:00 — ужин",
    "19:30 — вечерняя программа и общение в группе",
  ];
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[32px] bg-white shadow-2xl md:rounded-[32px]">
        <div className="relative h-72 overflow-hidden rounded-t-[32px]">
          <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button onClick={onClose} className="absolute right-5 top-5 rounded-full bg-white px-3 py-2 shadow"><Icon name="close" /></button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge tone="green"><Icon name="shield" /> Проверенная программа</Badge>
              <Badge tone="gold">{program.tag}</Badge>
            </div>
            <h2 className="max-w-3xl text-3xl font-black md:text-5xl">{program.title}</h2>
            <p className="mt-2 text-white/85">{program.provider} · {program.city}</p>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-6 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-rose-50 p-4"><b>Возраст</b><p className="mt-1 text-slate-600">{program.age}</p></div>
              <div className="rounded-2xl bg-rose-50 p-4"><b>Английский</b><p className="mt-1 text-slate-600">{program.english}</p></div>
              <div className="rounded-2xl bg-rose-50 p-4"><b>Проживание</b><p className="mt-1 text-slate-600">{program.accommodation.includes("сем") ? "Семья" : "Резиденция"}</p></div>
              <div className="rounded-2xl bg-rose-50 p-4"><b>Питание</b><p className="mt-1 text-slate-600">Полный пансион</p></div>
            </div>

            <section className="mb-7">
              <h3 className="mb-3 text-2xl font-black">Локация</h3>
              <p className="leading-7 text-slate-600">{program.program}</p>
            </section>

            <section className="mb-7">
              <h3 className="mb-3 text-2xl font-black">Экскурсии и мероприятия</h3>
              <div className="rounded-3xl bg-slate-50 p-5 leading-7 text-slate-700">
                <p>{program.excursions}</p>
                {program.excursionsList && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {program.excursionsList.map((place) => (
                      <div key={place} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-rose-900" />
                        <span className="font-semibold text-slate-800">{place}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="mb-7">
              <h3 className="mb-3 text-2xl font-black">Пример расписания дня</h3>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="grid gap-3">
                  {sampleSchedule.map((item) => {
                    const isSection = item === "Будние дни" || item === "Выходные дни";
                    return isSection ? (
                      <div key={item} className="mt-2 inline-flex w-fit rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-900 ring-1 ring-rose-100">
                        {item}
                      </div>
                    ) : (
                      <div key={item} className="text-slate-700">
                        <span className="leading-6">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-5">
                <h3 className="text-2xl font-black">Почему выбирают нас?</h3>
                <p className="mt-2 max-w-2xl text-slate-500">Чтобы родителям было спокойно, мы заранее объясняем все условия поездки: от договора и стоимости до трансфера, проживания и сопровождения ребёнка за рубежом.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["01", "Прозрачные условия", "Работаем по договору, заранее объясняем стоимость, даты, проживание, питание, трансфер, документы и все важные условия программы."],
                  ["02", "30 лет опыта", "Опираемся на опыт основателя и компании Brit Education & Travel в сфере международного образования и сопровождения студентов за рубежом."],
                  ["03", "Физическое присутствие", "У Russell ISC есть офис в Алматы, а также компания и партнёрская инфраструктура в Лондоне — это даёт семье больше уверенности и контроля."],
                  ["04", "Полное сопровождение", "Помогаем с трансфером, встречающей стороной, сопровождением 24/7, коммуникацией и понятными шагами до поездки и во время программы."],
                ].map((item) => (
                  <div key={item[0]} className="rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-100">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-900 text-sm font-black text-white">{item[0]}</div>
                    <b className="block text-lg text-slate-950">{item[1]}</b>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item[2]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[28px] bg-slate-50 p-5 ring-1 ring-slate-100 lg:sticky lg:top-6">
            <div className="mb-5">
              <p className="text-sm text-slate-500">Стоимость поездки</p>
              <div className="text-4xl font-black text-rose-900">{program.currency}{program.price.toLocaleString()}</div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <span className="mb-2 block text-slate-500">Даты</span>
                <div className="space-y-2">
                  {program.dates.split(" / ").map((date) => (
                    <div key={date} className="flex items-start gap-2 font-bold text-slate-800">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-900" />
                      <span className="leading-5">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between"><span>Длительность</span><b>{program.duration}</b></div>
              <div className="flex justify-between gap-4"><span>Город</span><b className="text-right">{program.city}<span className="block text-xs font-medium text-slate-500">({cityDistance[program.city] || "уточняется"})</span></b></div>
              <div className="flex justify-between"><span>Формат</span><b>{program.type}</b></div>
            </div>

            <div className="mt-6 space-y-3">
              <Button onClick={() => onBook(program)} className="w-full py-4">Забронировать место</Button>
              <a href="https://wa.me/77066018909" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="secondary" className="w-full py-4"><Icon name="chat" /> Написать в WhatsApp</Button>
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-[28px] bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <div className="relative h-64 overflow-hidden rounded-[22px] bg-slate-100">
                {detailGalleryPhotos.map((photo, index) => (
                  <div
                    key={photo.title}
                    className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform,filter] duration-[1200ms] ease-out ${activeDetailPhoto === index ? "scale-100 opacity-100 blur-0" : "scale-[1.04] opacity-0 blur-[1px]"}`}
                    style={{ backgroundImage: `url(${photo.url})` }}
                  />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {detailGalleryPhotos.map((photo, index) => (
                  <button
                    key={photo.title}
                    onClick={() => setActiveDetailPhoto(index)}
                    className={`h-12 rounded-xl bg-cover bg-center transition-all duration-500 hover:scale-105 hover:opacity-100 ${activeDetailPhoto === index ? "opacity-100 ring-2 ring-rose-900" : "opacity-55 ring-0"}`}
                    style={{ backgroundImage: `url(${photo.url})` }}
                    aria-label={photo.title}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ program, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [form, setForm] = useState({ studentName: "", age: "", city: "", parentName: "", phone: "", questions: "" });
  const [isSent, setIsSent] = useState(false);

  if (!program) return null;

  const dateOptions = program.dates.split(" / ");
  const isStepValid = step === 1
    ? selectedDates.length > 0
    : step === 2
      ? form.studentName.trim() && form.age.trim() && form.city.trim() && form.parentName.trim() && form.phone.trim()
      : true;

  const toggleDate = (date) => {
    setSelectedDates((prev) => prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]);
  };

  const closeModal = () => {
    setStep(1);
    setSelectedDates([]);
    setForm({ studentName: "", age: "", city: "", parentName: "", phone: "", questions: "" });
    setIsSent(false);
    onClose();
  };

  const nextStep = () => {
    if (!isStepValid) return;
    if (step === 4) {
      setIsSent(true);
      return;
    }
    setStep(step + 1);
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl rounded-t-[32px] bg-white p-6 shadow-2xl md:rounded-[32px]">
        {!isSent ? (
          <>
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black">Заявка на бронирование</h2>
                <p className="mt-1 text-slate-500">{program.title}</p>
              </div>
              <button onClick={closeModal} className="rounded-full bg-slate-100 px-3 py-2"><Icon name="close" /></button>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-2 text-xs font-bold">
              {["Даты", "Студент", "Вопросы", "Отправка"].map((item, index) => (
                <div key={item} className={`rounded-full px-3 py-2 text-center ${step >= index + 1 ? "bg-rose-900 text-white" : "bg-slate-100 text-slate-500"}`}>{item}</div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h3 className="mb-3 font-black">Выберите даты</h3>
                <p className="mb-4 text-sm text-slate-500">Можно выбрать одну или несколько дат — менеджер Russell уточнит наличие мест.</p>
                <div className="grid gap-3">
                  {dateOptions.map((date) => {
                    const active = selectedDates.includes(date);
                    return (
                      <button
                        key={date}
                        onClick={() => toggleDate(date)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${active ? "border-rose-900 bg-rose-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                      >
                        <span className="font-bold text-slate-950">{date}</span>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? "border-rose-900 bg-rose-900 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
                      </button>
                    );
                  })}
                </div>
                {!isStepValid && <p className="mt-3 text-sm text-rose-900">Выберите хотя бы одну дату.</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <h3 className="font-black">Данные студента и родителя</h3>
                <input required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="ФИО студента" />
                <div className="grid gap-3 md:grid-cols-2">
                  <input required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="Возраст ребёнка" />
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="Город проживания" />
                </div>
                <input required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="Имя родителя" />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="Телефон родителя" />
                {!isStepValid && <p className="text-sm text-rose-900">Заполните все поля, чтобы перейти дальше.</p>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <h3 className="font-black">Ваши вопросы</h3>
                <textarea value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} className="min-h-32 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-rose-900" placeholder="Например: есть ли трансфер, какие документы нужны, сколько мест осталось?" />
              </div>
            )}

            {step === 4 && (
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="mb-2 font-black">Проверьте заявку</h3>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div><b>Программа:</b> {program.title}</div>
                  <div><b>Выбранные даты:</b> {selectedDates.join(", ")}</div>
                  <div><b>Студент:</b> {form.studentName}, {form.age} лет</div>
                  <div><b>Город:</b> {form.city}</div>
                  <div><b>Родитель:</b> {form.parentName}</div>
                  <div><b>Телефон:</b> {form.phone}</div>
                </div>
                <p className="mt-4 rounded-2xl bg-white p-3 text-xs leading-5 text-slate-500">
                  Отправляя заявку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-between gap-3">
              <Button variant="secondary" onClick={() => step === 1 ? closeModal() : setStep(step - 1)}>{step === 1 ? "Отмена" : "Назад"}</Button>
              <Button onClick={nextStep} className={!isStepValid ? "opacity-50" : ""}>{step === 4 ? "Отправить заявку" : "Далее"} <Icon name="arrow" /></Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl">✅</div>
            <h2 className="text-2xl font-black text-slate-950">Ваша заявка отправлена</h2>
            <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">С вами свяжется наша команда в течение 5 минут.</p>
            <Button onClick={closeModal} className="mt-6 px-8">Хорошо</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsultationModal({ isOpen, onClose }) {
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({ parentName: "", phone: "", childName: "", childAge: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  const closeModal = () => {
    setIsSent(false);
    setForm({ parentName: "", phone: "", childName: "", childAge: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div className="w-full max-w-lg rounded-t-[32px] bg-white p-6 shadow-2xl md:rounded-[32px]">
        {!isSent ? (
          <>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Badge tone="red">Консультация Russell</Badge>
                <h2 className="mt-3 text-2xl font-black text-slate-950">Оставьте заявку</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Мы поможем подобрать лагерь, проверить свободные даты и объяснить следующие шаги.</p>
              </div>
              <button onClick={closeModal} className="rounded-full bg-slate-100 px-3 py-2"><Icon name="close" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-rose-900"
                placeholder="ФИО"
              />
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-rose-900"
                placeholder="Номер телефона"
              />
              <input
                required
                value={form.childName}
                onChange={(e) => setForm({ ...form, childName: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-rose-900"
                placeholder="Имя ребёнка"
              />
              <input
                required
                value={form.childAge}
                onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-rose-900"
                placeholder="Возраст ребёнка"
              />

              <p className="rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                Заполняя поля, вы соглашаетесь с политикой конфиденциальности.
              </p>

              <Button className="w-full py-4 text-base" type="submit">Отправить заявку</Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl">✅</div>
            <h2 className="text-2xl font-black text-slate-950">Ваша заявка отправлена</h2>
            <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">С вами свяжется наша команда в течение 5 минут.</p>
            <Button onClick={closeModal} className="mt-6 px-8">Хорошо</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function QA() {
  const questions = [
    ["Что входит в стоимость?", "В карточке каждой программы указаны занятия, размещение, активности и экскурсии. Авиабилеты, виза, страховка и трансфер могут считаться отдельно — это уточняется при заявке."],
    ["Можно ли забронировать место заранее?", "Да. Вы оставляете заявку, Russell проверяет наличие мест и помогает зафиксировать программу на нужные даты."],
    ["Как выбрать программу?", "Ориентируйтесь не только на цену, а на то, насколько программа подходит ребёнку: его возраст, уровень самостоятельности, интересы, формат проживания, локацию, расписание дня и атмосферу кампуса."],
    ["Есть ли поддержка родителей?", "Да. Мы помогаем родителям понять условия, документы, оплату, размещение и дальнейшие шаги до бронирования."],
  ];
  return (
    <section id="qa" className="mt-10 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <Badge tone="red"><Icon name="question" /> Q&A</Badge>
      <h2 className="mt-3 text-3xl font-black">Частые вопросы</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {questions.map(([q, a]) => <div key={q} className="rounded-3xl bg-slate-50 p-5"><b>{q}</b><p className="mt-2 text-sm leading-6 text-slate-600">{a}</p></div>)}
      </div>
    </section>
  );
}

export default function RussellCampsMVP() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Все");
  const [city, setCity] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [compareNotice, setCompareNotice] = useState("");
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeTrust, setActiveTrust] = useState(0);
  const [activeHeroBubble, setActiveHeroBubble] = useState(0);
  const [activeHeroGallery, setActiveHeroGallery] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTrust((prev) => (prev + 1) % TRUST_CARDS.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroBubble((prev) => (prev + 1) % HERO_BUBBLES.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroGallery((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => PROGRAMS.filter((p) => {
    const text = `${p.title} ${p.provider} ${p.city} ${p.type} ${p.tag}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (type === "Все" || p.type === type) && (city === "Все" || p.city === city) && p.price <= maxPrice;
  }), [query, type, city, maxPrice]);

  const compared = PROGRAMS.filter((p) => compareIds.includes(p.id));
  const toggleFavorite = (id) => setFavoriteIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        setCompareNotice("");
        return prev.filter((x) => x !== id);
      }

      if (prev.length >= 3) {
        setCompareNotice("Максимум можно выбрать 3 программы для сравнения");
        setTimeout(() => setCompareNotice(""), 3500);
        return prev;
      }

      setCompareNotice("");
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-900 text-white"><Icon name="crown" /></div>
            <div><div className="text-xl font-black">Russell ISC</div><div className="text-xs text-slate-500">Летние лагеря 2026</div></div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <button onClick={() => scrollToSection("programs")} className="transition hover:text-rose-900">Программы</button><button onClick={() => scrollToSection("about")} className="transition hover:text-rose-900">О нас</button><button onClick={() => scrollToSection("qa")} className="transition hover:text-rose-900">Q&A</button>
          </nav>
          <Button onClick={() => setIsConsultationOpen(true)}>Консультация</Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-red-950 to-stone-950">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 18% 20%, white 0, transparent 24%), radial-gradient(circle at 82% 30%, white 0, transparent 20%)" }} />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-rose-700/30 blur-3xl" />
        <div className="absolute -top-28 left-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.14fr_0.86fr] md:items-center md:py-24">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <Badge tone="gold"><Icon name="shield" /> Проверенные программы Великобритании</Badge>
              <Badge tone="dark">Лето 2026</Badge>
              <Badge tone="red">Для детей 9–18 лет</Badge>
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              Забронируй место в лагере мечты.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-rose-100 md:text-2xl">
              Лето 2026 будет незабываемым.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-rose-100/90 md:text-lg">
              Подберите летнюю программу в Великобритании под возраст, интересы и цели ребёнка: английский язык, спорт, лидерство, экскурсии и проживание в безопасной международной среде.
            </p>

            <div className="mt-14 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => scrollToSection("programs")} className="w-full px-7 py-4 text-base sm:w-auto">Смотреть программы</Button>
              <Button onClick={() => setIsConsultationOpen(true)} variant="secondary" className="w-full px-7 py-4 text-base sm:w-auto">Получить консультацию</Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-rose-100">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-200" /> Самые выгодные цены</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-200" /> Подбор под возраст и цель</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-200" /> Помощь с бронированием</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-200" /> Безопасность на первом месте</span>
            </div>
          </div>

          <div className="relative pb-14 md:pb-10">
            <style>{`
              @keyframes premiumFloat {
                0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
                50% { transform: translate3d(8px, -12px, 0) rotate(1deg); }
              }
              @keyframes softPulse {
                0%, 100% { transform: scale(1); opacity: 0.95; }
                50% { transform: scale(1.03); opacity: 1; }
              }
              .premium-float { animation: premiumFloat 7s ease-in-out infinite; }
              .soft-pulse { animation: softPulse 5s ease-in-out infinite; }
            `}</style>

            <div className="relative overflow-hidden rounded-[36px] bg-white/10 p-3 shadow-2xl ring-1 ring-white/20 backdrop-blur">
              <div className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-slate-950 p-6">
                <div className="absolute inset-0">
                  {HERO_PHOTOS.map((photo, index) => (
                    <div
                      key={photo.title}
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${activeHeroGallery === index ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                      style={{ backgroundImage: `url(${photo.url})` }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-transparent to-rose-950/20" />
                </div>

                <div className="relative z-10 flex min-h-[432px] flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-black text-rose-900 shadow-lg backdrop-blur">UK Camps Russell</div>
                    <div className="premium-float rounded-[24px] bg-white/95 px-5 py-4 shadow-2xl ring-1 ring-white/70 backdrop-blur">
                      <div className="text-xs text-slate-500">Стоимость от</div>
                      <div className="text-3xl font-black text-rose-900">£2,200</div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="inline-flex rounded-full bg-rose-900/95 px-4 py-2 text-sm font-black text-white shadow-lg">Russell Summer Camps 2026</div>

                    <div className="rounded-[24px] bg-white/95 p-5 shadow-xl backdrop-blur">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <b className="text-lg text-slate-950">{HERO_PHOTOS[activeHeroGallery].title}</b>
                          <p className="mt-1 text-sm text-slate-500">{HERO_PHOTOS[activeHeroGallery].subtitle}</p>
                        </div>
                        <div className="text-2xl font-black text-rose-900">{activeHeroGallery + 1}/20</div>
                      </div>
                      <div className="mt-4 flex gap-1.5">
                        {HERO_PHOTOS.slice(0, 10).map((photo, index) => (
                          <span key={photo.title} className={`h-1.5 rounded-full transition-all duration-300 ${activeHeroGallery === index ? "w-7 bg-rose-900" : "w-1.5 bg-slate-300"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <section className="-mt-16 mb-10 relative z-10 overflow-hidden py-2">
          <div className="relative mx-auto flex min-h-[270px] max-w-6xl items-center justify-center">
            {TRUST_CARDS.map((card, index) => {
              const diff = (index - activeTrust + TRUST_CARDS.length) % TRUST_CARDS.length;
              const position = diff === 0 ? "center" : diff === 1 ? "right" : "left";
              const styles = {
                center: "z-20 translate-x-0 scale-100 opacity-100 blur-0",
                left: "z-10 -translate-x-[44%] scale-[0.88] opacity-35 blur-[1px]",
                right: "z-10 translate-x-[44%] scale-[0.88] opacity-35 blur-[1px]",
              };

              return (
                <button
                  key={card.title}
                  onClick={() => setActiveTrust(index)}
                  className={`absolute w-[86%] max-w-2xl rounded-[32px] bg-white p-7 text-left shadow-2xl ring-1 ring-slate-100 transition-all duration-700 ease-in-out md:p-9 ${styles[position]}`}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl"><Icon name={card.icon} /></div>
                  <h3 className="text-2xl font-black text-slate-950 md:text-3xl">{card.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{card.text}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-center gap-2">
            {TRUST_CARDS.map((card, index) => (
              <button
                key={card.title}
                onClick={() => setActiveTrust(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeTrust === index ? "w-9 bg-rose-900" : "w-2.5 bg-slate-300"}`}
                aria-label={`Показать: ${card.title}`}
              />
            ))}
          </div>
        </section>
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {[["Английский", "30–40 часов обучения"], ["Футбол", "Liverpool, Tottenham, Arsenal, Chelsea"], ["Лондон, Оксфорд, Бат", "Красивейшие города Англии"], ["Лидерство", "Winchester College"]].map(([title, text], i) => (
            <div key={title} className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl">{["🎓", "⚽", "🇬🇧", "🚀"][i]}</div>
              <b>{title}</b><p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-24">
            <h2 className="mb-5 text-xl font-black">Фильтры</h2>
            <label className="mb-2 block text-sm font-bold">Тип программы</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="mb-5 w-full rounded-2xl border border-slate-200 p-3">{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            <label className="mb-2 block text-sm font-bold">Город</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="mb-5 w-full rounded-2xl border border-slate-200 p-3">{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
            <label className="mb-2 block text-sm font-bold">Максимальная цена: £{maxPrice.toLocaleString()}</label>
            <input type="range" min="2000" max="5000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mb-5 w-full" />
            <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-950"><b>Совет:</b> сравните 2–3 программы по возрасту, проживанию, датам, цене и экскурсиям.</div>
          </aside>

          <section id="programs" className="scroll-mt-28">
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div><h2 className="text-3xl font-black">Программы Russell</h2><p className="text-slate-500">Найдено программ: {filtered.length}</p></div>
              <Button variant="secondary" onClick={() => { setType("Все"); setCity("Все"); setMaxPrice(5000); setQuery(""); }}>Сбросить фильтры</Button>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((program) => <ProgramCard key={program.id} program={program} onOpen={setSelected} onBook={setBooking} isFavorite={favoriteIds.includes(program.id)} onFavorite={toggleFavorite} isCompared={compareIds.includes(program.id)} onCompare={toggleCompare} />)}
            </div>
          </section>
        </section>

        {compared.length > 0 && <section id="compare" className="mt-10 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100 scroll-mt-28">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h2 className="text-3xl font-black">Сравнение программ</h2>
              <p className="mt-1 text-slate-500">Можно добавить до 3 программ.</p>
            </div>
            <Button variant="ghost" onClick={() => setCompareIds([])}>Очистить</Button>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="w-[320px] px-5 py-4 font-black">Программа</th>
                  <th className="w-[120px] px-5 py-4 font-black">Цена</th>
                  <th className="w-[110px] px-5 py-4 font-black">Возраст</th>
                  <th className="w-[280px] px-5 py-4 font-black">Даты</th>
                  <th className="w-[280px] px-5 py-4 font-black">Проживание</th>
                  <th className="w-[110px] px-5 py-4 font-black">Рейтинг</th>
                </tr>
              </thead>
              <tbody>
                {compared.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100 align-top">
                    <td className="px-5 py-5">
                      <b className="block leading-6 text-slate-950">{p.title}</b>
                      <p className="mt-1 text-slate-500">{p.city}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 font-black text-rose-900">{p.currency}{p.price.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-5 py-5">{p.age}</td>
                    <td className="px-5 py-5 leading-6 text-slate-700">{p.dates}</td>
                    <td className="px-5 py-5 leading-6 text-slate-700">{p.accommodation}</td>
                    <td className="whitespace-nowrap px-5 py-5 font-bold">{p.rating}/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>}

        <QA />

        <section className="mt-10 rounded-[32px] bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 p-7 text-white shadow-xl">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Badge tone="gold">Семейная скидка</Badge>
              <h2 className="mt-3 text-3xl font-black">5% скидка для детей из одной семьи</h2>
              <p className="mt-3 max-w-2xl leading-7 text-rose-100">
                Если программу выбирают братья, сёстры или несколько детей из одной семьи, мы предоставляем семейную скидку 5%.
              </p>
              <p className="mt-2 text-sm text-rose-200">
                Скидка применяется при бронировании и уточняется менеджером Russell ISC по выбранной программе.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-6 text-center ring-1 ring-white/10 backdrop-blur">
              <div className="text-6xl font-black">5%</div>
              <div className="mt-2 text-sm font-bold text-rose-100">для семьи</div>
            </div>
          </div>
        </section>

        <section id="support" className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl">
                <span className="text-rose-900">✓</span>
              </div>
              <div>
                <b className="text-2xl font-black text-slate-950">В стоимость включено</b>
                <p className="mt-1 text-sm text-slate-500">Базовый пакет большинства программ</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Обучение от 15 часов в неделю",
                "Регистрационный сбор",
                "Проживание в резиденции или семье",
                "Питание — полный пансион, 3 раза в день",
                "Учебные материалы",
                "Сертификат об окончании обучения",
                "Экскурсии, указанные в программе",
                "Ежедневные культурные, развлекательные и спортивные мероприятия",
                "Сопровождение групп-лидером при групповой поездке",
                "Трансферы из аэропорта Лондона в школу и обратно",
                "Проездные для общественного транспорта"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-900 text-[10px] text-white">✓</span>
                  <span className="leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              Школа может вносить изменения в экскурсионную программу. Точные условия подтверждаются при бронировании конкретной программы.
            </p>
          </div>

          <div className="rounded-[32px] bg-slate-950 p-7 text-white">
            <Badge tone="gold">Russell Support</Badge>
            <h2 className="mt-4 text-3xl font-black">Поможем выбрать лагерь, а не просто отправим список</h2>
            <p className="mt-3 leading-7 text-slate-300">Мы смотрим на возраст ребёнка, цель поездки, бюджет, формат проживания, безопасность, даты и интересы семьи. После заявки менеджер Russell уточнит наличие мест и условия бронирования.</p>
            <div className="mt-6 grid gap-3">
              {["Подбор", "Сравнение", "Бронирование"].map((x) => <div key={x} className="rounded-2xl bg-white/10 p-4"><span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-rose-200" /> <b>{x}</b></div>)}
            </div>
          </div>
        </section>
      </main>

      <section id="about" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-950 via-rose-950 to-stone-950 p-7 text-white shadow-2xl md:p-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose-700/30 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <Badge tone="gold">О нас</Badge>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  Помогаем выбрать лагерь, за который родителям спокойно
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                  Russell ISC помогает родителям подобрать летнюю программу в Великобритании под возраст, характер и цели ребёнка. Мы объясняем условия, сравниваем варианты и заранее показываем, что входит в стоимость, где ребёнок будет жить и как будет проходить день.
                </p>
              </div>

              <div className="rounded-[32px] bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-rose-100">Сопровождение под ключ</p>
                <p className="mt-3 text-2xl font-black leading-snug">
                  Сравниваем программы, объясняем условия и помогаем семье выбрать безопасный и подходящий вариант.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[32px] bg-white p-7 text-slate-950 shadow-xl">
                <div className="text-5xl font-black text-rose-900"><CountUp end={1996} /></div>
                <h3 className="mt-4 text-xl font-black">Работаем с 1996 года</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Опыт основателя и компании Brit Education & Travel в сфере международного образования и сопровождения студентов за рубежом.</p>
              </div>

              <div className="rounded-[32px] bg-white/10 p-7 shadow-xl ring-1 ring-white/10 backdrop-blur">
                <div className="text-5xl font-black">London</div>
                <h3 className="mt-4 text-xl font-black">Офис и компания в Лондоне</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">В Лондоне есть встречающая сторона: встреча в аэропорту, поддержка по городу и максимальное внимание к безопасности ребёнка.</p>
              </div>

              <div className="rounded-[32px] bg-white/10 p-7 shadow-xl ring-1 ring-white/10 backdrop-blur">
                <div className="text-5xl font-black"><CountUp end={470} suffix="+" /></div>
                <h3 className="mt-4 text-xl font-black">Партнёров</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Партнёрская сеть Russell ISC включает университеты, школы, летние лагеря, языковые, спортивные, академические и лидерские программы.</p>
              </div>

              <div className="rounded-[32px] bg-rose-900 p-7 text-white shadow-xl">
                <div className="text-5xl font-black"><CountUp end={5} suffix="%" /></div>
                <h3 className="mt-4 text-xl font-black">Семейная скидка</h3>
                <p className="mt-2 text-sm leading-6 text-rose-100">Для братьев, сестёр или нескольких детей из одной семьи при выборе программы.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-rose-50 to-amber-50 p-7 text-slate-950 shadow-xl ring-1 ring-rose-100">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Badge tone="red">Связаться с Russell</Badge>
              <h2 className="mt-3 text-3xl font-black">Хотите подобрать лагерь под ребёнка?</h2>
              <p className="mt-2 max-w-2xl text-slate-600">Оставьте заявку, и мы поможем выбрать программу, проверить свободные даты и объясним дальнейшие шаги.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href="https://wa.me/77066018909" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full px-10 py-5 text-base shadow-lg">Написать в WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
          <div>
            <b>Russell ISC Camps 2026</b>
            <p className="mt-2 text-sm leading-6 text-slate-500">Подбор и бронирование летних программ в Великобритании.</p>
          </div>
          <div>
            <b>Навигация</b>
            <div className="mt-2 grid gap-2 text-sm text-slate-500">
              <button onClick={() => scrollToSection("programs")} className="text-left transition hover:text-rose-900">Программы</button>
              <button onClick={() => scrollToSection("qa")} className="text-left transition hover:text-rose-900">Q&A</button>
              <button onClick={() => scrollToSection("about")} className="text-left transition hover:text-rose-900">О нас</button>
            </div>
          </div>
          <div>
            <b>Контакты</b>
            <p className="mt-2 text-sm leading-6 text-slate-500">Instagram: @russell_isc<br />Проспект Достык 210Б, 6 этаж</p>
            <div className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400">
              <p>Все права защищены</p>
              <p>Russell ISC</p>
              <p>TOO "СDSI"</p>
              <p>БИН 140640004983</p>
            </div>
          </div>
        </div>
      </footer>

      {compareIds.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-40 w-[92%] max-w-xl -translate-x-1/2 rounded-[24px] bg-white p-4 shadow-2xl ring-1 ring-slate-100 md:left-auto md:right-6 md:w-auto md:min-w-[360px] md:translate-x-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <b className="text-slate-950">
                {compareNotice || (compareIds.length === 1 ? "Добавьте ещё 1–2 программы" : "Готово к сравнению")}
              </b>
              <p className="mt-1 text-sm text-slate-500">
                {compareNotice ? "Уберите одну из выбранных программ, чтобы добавить другую." : (compareIds.length === 1 ? "Так будет удобнее сравнить цену, даты и проживание." : `Вы выбрали ${compareIds.length} программы. Можно перейти в сравнение.`)}
              </p>
            </div>
            {compareIds.length >= 2 && (
              <Button onClick={() => scrollToSection("compare")} className="shrink-0">Перейти</Button>
            )}
          </div>
        </div>
      )}

      <DetailsModal program={selected} onClose={() => setSelected(null)} onBook={(p) => { setSelected(null); setBooking(p); }} />
      <BookingModal program={booking} onClose={() => setBooking(null)} />
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </div>
  );
}

