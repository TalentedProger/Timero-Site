import image1 from "@assets/image_1778531690108.png";
import image2 from "@assets/image_1778532705426.png";
import image3 from "@assets/image_1778532720626.png";

export interface Background {
  id: string;
  name: string;
  url: string;
}

export const backgrounds: Background[] = [
  {
    id: "asset-1",
    name: "Mountains",
    url: image1,
  },
  {
    id: "asset-2",
    name: "Nature",
    url: image2,
  },
  {
    id: "asset-3",
    name: "Lake",
    url: image3,
  },
  {
    id: "forest",
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80",
  },
  {
    id: "ocean",
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
  },
  {
    id: "aurora",
    name: "Aurora",
    url: "https://images.unsplash.com/photo-1579033461387-adb47197eb43?w=1920&q=80",
  },
  {
    id: "city",
    name: "City",
    url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=80",
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
];
