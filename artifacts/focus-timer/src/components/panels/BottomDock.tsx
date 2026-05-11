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
  { code: "en", label: "English", native: "English" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "ar", label: "Arabic", native: "العربية" },
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
        className="rounded-full px-4 py-3 flex items-center gap-5 border border-white/12"
        style={{
          background: "rgba(10,10,20,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Appearance */}
        <button
          onClick={onToggleLeft}
          data-testid="dock-appearance"
          className={cn(
            "p-2 rounded-full transition-all duration-200 hover:bg-white/10",
            isLeftOpen ? "text-white bg-white/15" : "text-white/55"
          )}
        >
          <Palette className="w-5 h-5" />
        </button>

        {/* Minimal mode */}
        <button
          onClick={onToggleMinimal}
          data-testid="dock-minimal"
          className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 text-white/55 hover:text-white"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Stats / History */}
        <button
          onClick={onToggleRight}
          data-testid="dock-stats"
          className={cn(
            "p-2 rounded-full transition-all duration-200 hover:bg-white/10",
            isRightOpen ? "text-white bg-white/15" : "text-white/55"
          )}
        >
          <BarChart2 className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10" />

        {/* Language selector */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            data-testid="dock-language"
            className={cn(
              "p-2 rounded-full transition-all duration-200 hover:bg-white/10 flex items-center gap-1.5",
              langOpen ? "text-white bg-white/15" : "text-white/55"
            )}
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs font-medium tracking-wide uppercase">
              {currentLang.code}
            </span>
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                key="lang-dropdown"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: "rgba(10,10,22,0.92)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                <div className="p-1.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = settings.language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSettings({ language: lang.code });
                          setLangOpen(false);
                        }}
                        data-testid={`lang-${lang.code}`}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all",
                          isSelected
                            ? "bg-white/10 text-white"
                            : "text-white/55 hover:bg-white/6 hover:text-white/80"
                        )}
                      >
                        <span>{lang.native}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-400" />}
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
