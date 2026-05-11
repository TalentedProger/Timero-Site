import image3 from "@assets/image_1778532720626.png";

export interface Background {
  id: string;
  name: string;
  url: string;
}

export const backgrounds: Background[] = [
  {
    id: "ocean",
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
  },
  {
    id: "forest",
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80",
  },
  {
    id: "aurora",
    name: "Aurora",
    url: "https://images.unsplash.com/photo-1579033461387-adb47197eb43?w=1920&q=80",
  },
  {
    id: "mountains",
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
  {
    id: "desert",
    name: "Desert",
    url: "https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?w=1920&q=80",
  },
  {
    id: "space",
    name: "Space",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80",
  },
  {
    id: "city",
    name: "City",
    url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=80",
  },
  {
    id: "lake",
    name: "Lake",
    url: "https://images.unsplash.com/photo-1439853949212-36089c8d9b97?w=1920&q=80",
  },
  {
    id: "glass",
    name: "Glass",
    url: image3,
  },
];
