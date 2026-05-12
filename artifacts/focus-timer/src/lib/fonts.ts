export interface FontOption {
  id: string;
  name: string;
  css: string;
  preview: string;
}

export const FONTS: FontOption[] = [
  { id: "inter",     name: "Inter",            css: "'Inter', sans-serif",           preview: "Aa" },
  { id: "playfair",  name: "Playfair",          css: "'Playfair Display', serif",     preview: "Aa" },
  { id: "montserrat",name: "Montserrat",        css: "'Montserrat', sans-serif",      preview: "Aa" },
  { id: "lato",      name: "Lato",              css: "'Lato', sans-serif",            preview: "Aa" },
  { id: "raleway",   name: "Raleway",           css: "'Raleway', sans-serif",         preview: "Aa" },
  { id: "dm-sans",   name: "DM Sans",           css: "'DM Sans', sans-serif",         preview: "Aa" },
];

export function getFontCss(id: string): string {
  return FONTS.find((f) => f.id === id)?.css ?? FONTS[0].css;
}
