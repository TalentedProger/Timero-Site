import { useState, useRef, useEffect } from "react";
import { Palette, Maximize2, BarChart2, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { AnimatePresence, motion } from "framer-motion";

interface BottomDockProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onToggleMinimal: () => void;
  isLeftOpen: boolean;
  isRightOpen: boolean;
}

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "ru", native: "Русский" },
  { code: "es", native: "Español" },
  { code: "fr", native: "Français" },
  { code: "de", native: "Deutsch" },
  { code: "zh", native: "中文" },
  { code: "ja", native: "日本語" },
  { code: "pt", native: "Português" },
  { code: "ko", native: "한국어" },
  { code: "ar", native: "العربية" },
];

export function BottomDock({
  onToggleLeft,
  onToggleRight,
  onToggleMinimal,
  isLeftOpen,
  isRightOpen,
}: BottomDockProps) {
  const { settings, setSettings } = useSettings();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === settings.language) ?? LANGUAGES[0];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div
        className="rounded-full px-4 py-3 flex items-center gap-5 border border-white/10"
        style={{
          background: "rgba(10,10,20,0.58)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Appearance */}
        <button
          onClick={onToggleLeft}
          className={cn(
            "p-2 rounded-full transition-all duration-200 hover:bg-white/10",
            isLeftOpen ? "text-white bg-white/15" : "text-white/55"
          )}
        >
          <Palette className="w-5 h-5" />
        </button>

        {/* Minimal */}
        <button
          onClick={onToggleMinimal}
          className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 text-white/55 hover:text-white"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Stats */}
        <button
          onClick={onToggleRight}
          className={cn(
            "p-2 rounded-full transition-all duration-200 hover:bg-white/10",
            isRightOpen ? "text-white bg-white/15" : "text-white/55"
          )}
        >
          <BarChart2 className="w-5 h-5" />
        </button>

        <div className="w-px h-5 bg-white/10" />

        {/* Language */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className={cn(
              "px-2.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10 flex items-center gap-1.5",
              langOpen ? "text-white bg-white/15" : "text-white/55"
            )}
          >
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-semibold tracking-widest uppercase">
              {currentLang.code}
            </span>
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                key="lang-menu"
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.94 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 w-44 rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: "rgba(10,10,22,0.94)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                <div className="p-1.5 space-y-0.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = settings.language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSettings({ language: lang.code });
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150",
                          isSelected
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:bg-white/6 hover:text-white/80"
                        )}
                      >
                        <span>{lang.native}</span>
                        {isSelected && (
                          <Check
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: settings.accentColor }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
