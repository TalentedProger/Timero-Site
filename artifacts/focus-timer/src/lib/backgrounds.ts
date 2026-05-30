export type BgCategory = "nature" | "space" | "architecture" | "abstract" | "dark";

export interface Background {
  id: string;
  name: string;
  url: string;
  category: BgCategory;
}

// Background name translations
export const bgNames: Record<string, Record<string, string>> = {
  ocean: { en: "Ocean", ru: "Океан", es: "Océano", fr: "Océan", de: "Ozean", zh: "海洋", ja: "海", pt: "Oceano", ko: "바다", ar: "محيط" },
  forest: { en: "Forest", ru: "Лес", es: "Bosque", fr: "Forêt", de: "Wald", zh: "森林", ja: "森", pt: "Floresta", ko: "숲", ar: "غابة" },
  mountains: { en: "Mountains", ru: "Горы", es: "Montañas", fr: "Montagnes", de: "Berge", zh: "山脉", ja: "山", pt: "Montanhas", ko: "산", ar: "جبال" },
  sea: { en: "Sea", ru: "Море", es: "Mar", fr: "Mer", de: "Meer", zh: "海", ja: "海", pt: "Mar", ko: "바다", ar: "بحر" },
  roadtrip: { en: "Road Trip", ru: "Дорога", es: "Viaje", fr: "Route", de: "Straße", zh: "公路", ja: "道路", pt: "Estrada", ko: "도로", ar: "طريق" },
  lake: { en: "Lake", ru: "Озеро", es: "Lago", fr: "Lac", de: "See", zh: "湖", ja: "湖", pt: "Lago", ko: "호수", ar: "بحيرة" },
  waterfall: { en: "Waterfall", ru: "Водопад", es: "Cascada", fr: "Cascade", de: "Wasserfall", zh: "瀑布", ja: "滝", pt: "Cachoeira", ko: "폭포", ar: "شلال" },
  beach: { en: "Beach", ru: "Пляж", es: "Playa", fr: "Plage", de: "Strand", zh: "海滩", ja: "ビーチ", pt: "Praia", ko: "해변", ar: "شاطئ" },
  meadow: { en: "Meadow", ru: "Луг", es: "Pradera", fr: "Prairie", de: "Wiese", zh: "草地", ja: "草原", pt: "Prado", ko: "초원", ar: "مرج" },
  jungle: { en: "Jungle", ru: "Джунгли", es: "Selva", fr: "Jungle", de: "Dschungel", zh: "丛林", ja: "ジャングル", pt: "Selva", ko: "정글", ar: "غابة" },
  autumn: { en: "Autumn", ru: "Осень", es: "Otoño", fr: "Automne", de: "Herbst", zh: "秋天", ja: "秋", pt: "Outono", ko: "가을", ar: "خريف" },
  space: { en: "Space", ru: "Космос", es: "Espacio", fr: "Espace", de: "Weltraum", zh: "太空", ja: "宇宙", pt: "Espaço", ko: "우주", ar: "فضاء" },
  focus: { en: "Focus", ru: "Фокус", es: "Enfoque", fr: "Focus", de: "Fokus", zh: "专注", ja: "集中", pt: "Foco", ko: "집중", ar: "تركيز" },
  galaxy: { en: "Galaxy", ru: "Галактика", es: "Galaxia", fr: "Galaxie", de: "Galaxie", zh: "星系", ja: "銀河", pt: "Galáxia", ko: "은하", ar: "مجرة" },
  stars: { en: "Stars", ru: "Звёзды", es: "Estrellas", fr: "Étoiles", de: "Sterne", zh: "星星", ja: "星", pt: "Estrelas", ko: "별", ar: "نجوم" },
  city: { en: "City", ru: "Город", es: "Ciudad", fr: "Ville", de: "Stadt", zh: "城市", ja: "都市", pt: "Cidade", ko: "도시", ar: "مدينة" },
  bridge: { en: "Bridge", ru: "Мост", es: "Puente", fr: "Pont", de: "Brücke", zh: "桥", ja: "橋", pt: "Ponte", ko: "다리", ar: "جسر" },
  interior: { en: "Interior", ru: "Интерьер", es: "Interior", fr: "Intérieur", de: "Interieur", zh: "室内", ja: "インテリア", pt: "Interior", ko: "인테리어", ar: "داخلي" },
  arches: { en: "Arches", ru: "Арки", es: "Arcos", fr: "Arches", de: "Bögen", zh: "拱门", ja: "アーチ", pt: "Arcos", ko: "아치", ar: "أقواس" },
  porsche: { en: "Porsche", ru: "Porsche", es: "Porsche", fr: "Porsche", de: "Porsche", zh: "保时捷", ja: "ポルシェ", pt: "Porsche", ko: "포르쉐", ar: "بورش" },
  minimal: { en: "Minimal", ru: "Минимализм", es: "Minimalista", fr: "Minimal", de: "Minimal", zh: "极简", ja: "ミニマル", pt: "Minimalista", ko: "미니멀", ar: "بسيط" },
  gradient: { en: "Gradient", ru: "Градиент", es: "Degradado", fr: "Dégradé", de: "Farbverlauf", zh: "渐变", ja: "グラデーション", pt: "Gradiente", ko: "그라데이션", ar: "تدرج" },
  wallpaper: { en: "Wallpaper", ru: "Обои", es: "Fondo", fr: "Papier peint", de: "Tapete", zh: "壁纸", ja: "壁紙", pt: "Papel de parede", ko: "배경화면", ar: "خلفية" },
  "night-city": { en: "Night City", ru: "Ночной город", es: "Ciudad nocturna", fr: "Ville de nuit", de: "Nachtstadt", zh: "夜城", ja: "夜の街", pt: "Cidade noturna", ko: "야경", ar: "مدينة ليلية" },
  storm: { en: "Storm", ru: "Шторм", es: "Tormenta", fr: "Tempête", de: "Sturm", zh: "风暴", ja: "嵐", pt: "Tempestade", ko: "폭풍", ar: "عاصفة" },
  "dark-forest": { en: "Dark Forest", ru: "Тёмный лес", es: "Bosque oscuro", fr: "Forêt sombre", de: "Dunkler Wald", zh: "黑森林", ja: "暗い森", pt: "Floresta escura", ko: "어두운 숲", ar: "غابة مظلمة" },
  cave: { en: "Cave", ru: "Пещера", es: "Cueva", fr: "Grotte", de: "Höhle", zh: "洞穴", ja: "洞窟", pt: "Caverna", ko: "동굴", ar: "كهف" },
};

export function getBgName(id: string, lang: string): string {
  return bgNames[id]?.[lang] || bgNames[id]?.en || id;
}

export const backgrounds: Background[] = [
  // Nature
  { id: "ocean",      name: "Ocean",      category: "nature",       url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80" },
  { id: "forest",     name: "Forest",     category: "nature",       url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { id: "mountains",  name: "Mountains",  category: "nature",       url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { id: "sea",        name: "Sea",        category: "nature",       url: "/sea.jpg" },
  { id: "roadtrip",   name: "Road Trip",  category: "nature",       url: "/road_trip.jpg" },
  { id: "lake",       name: "Lake",       category: "nature",       url: "/lake.jpg" },
  { id: "waterfall",  name: "Waterfall",  category: "nature",       url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80" },
  { id: "beach",      name: "Beach",      category: "nature",       url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" },
  { id: "meadow",     name: "Meadow",     category: "nature",       url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80" },
  { id: "jungle",     name: "Jungle",     category: "nature",       url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&q=80" },
  { id: "autumn",     name: "Autumn",     category: "nature",       url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=80" },
  // Space
  { id: "space",      name: "Space",      category: "space",        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80" },
  { id: "focus",      name: "Focus",      category: "space",        url: "/focus.jpg" },
  { id: "galaxy",     name: "Galaxy",     category: "space",        url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1920&q=80" },
  { id: "stars",      name: "Stars",      category: "space",        url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80" },
  // Architecture
  { id: "city",       name: "City",       category: "architecture", url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=80" },
  { id: "bridge",     name: "Bridge",     category: "architecture", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80" },
  { id: "interior",   name: "Interior",   category: "architecture", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" },
  { id: "arches",     name: "Arches",     category: "architecture", url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" },
  // Abstract
  { id: "porsche",    name: "Porsche",    category: "abstract",     url: "/porsche.jpg" },
  { id: "minimal",    name: "Minimal",    category: "abstract",     url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80" },
  { id: "gradient",   name: "Gradient",   category: "abstract",     url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1920&q=80" },
  { id: "wallpaper",  name: "Wallpaper",  category: "abstract",     url: "/wallpaper.jpg" },
  // Dark
  { id: "night-city", name: "Night City", category: "dark",         url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80" },
  { id: "storm",      name: "Storm",      category: "dark",         url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1920&q=80" },
  { id: "dark-forest",name: "Dark Forest",category: "dark",         url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { id: "cave",       name: "Cave",       category: "dark",         url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&q=80" },
];
