import image3 from "@assets/image_1778532720626.png";

export type BgCategory = "nature" | "space" | "architecture" | "abstract" | "dark";

export interface Background {
  id: string;
  name: string;
  url: string;
  category: BgCategory;
}

export const backgrounds: Background[] = [
  // Nature
  { id: "ocean",      name: "Ocean",      category: "nature",       url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80" },
  { id: "forest",     name: "Forest",     category: "nature",       url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { id: "mountains",  name: "Mountains",  category: "nature",       url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { id: "lake",       name: "Lake",       category: "nature",       url: "https://images.unsplash.com/photo-1439853949212-36089c8d9b97?w=1920&q=80" },
  { id: "desert",     name: "Desert",     category: "nature",       url: "https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?w=1920&q=80" },
  { id: "waterfall",  name: "Waterfall",  category: "nature",       url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80" },
  { id: "beach",      name: "Beach",      category: "nature",       url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" },
  { id: "meadow",     name: "Meadow",     category: "nature",       url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80" },
  { id: "jungle",     name: "Jungle",     category: "nature",       url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&q=80" },
  { id: "autumn",     name: "Autumn",     category: "nature",       url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=80" },
  // Space
  { id: "space",      name: "Space",      category: "space",        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80" },
  { id: "aurora",     name: "Aurora",     category: "space",        url: "https://images.unsplash.com/photo-1579033461387-adb47197eb43?w=1920&q=80" },
  { id: "galaxy",     name: "Galaxy",     category: "space",        url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1920&q=80" },
  { id: "stars",      name: "Stars",      category: "space",        url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80" },
  // Architecture
  { id: "city",       name: "City",       category: "architecture", url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=80" },
  { id: "bridge",     name: "Bridge",     category: "architecture", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80" },
  { id: "interior",   name: "Interior",   category: "architecture", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" },
  { id: "arches",     name: "Arches",     category: "architecture", url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" },
  // Abstract
  { id: "glass",      name: "Glass",      category: "abstract",     url: image3 },
  { id: "minimal",    name: "Minimal",    category: "abstract",     url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80" },
  { id: "gradient",   name: "Gradient",   category: "abstract",     url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1920&q=80" },
  { id: "texture",    name: "Texture",    category: "abstract",     url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" },
  // Dark
  { id: "night-city", name: "Night City", category: "dark",         url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80" },
  { id: "storm",      name: "Storm",      category: "dark",         url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1920&q=80" },
  { id: "dark-forest",name: "Dark Forest",category: "dark",         url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { id: "cave",       name: "Cave",       category: "dark",         url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&q=80" },
];
