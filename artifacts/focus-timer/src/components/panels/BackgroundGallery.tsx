import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Link, Check } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { backgrounds, type BgCategory } from "@/lib/backgrounds";
import { getT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BackgroundGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { key: "all" | BgCategory; label: keyof ReturnType<typeof getT> }[] = [
  { key: "all",          label: "catAll" },
  { key: "nature",       label: "catNature" },
  { key: "space",        label: "catSpace" },
  { key: "architecture", label: "catArchitecture" },
  { key: "abstract",     label: "catAbstract" },
  { key: "dark",         label: "catDark" },
];

export function BackgroundGallery({ isOpen, onClose }: BackgroundGalleryProps) {
  const { settings, setSettings } = useSettings();
  const accent = settings.accentColor;
  const t = getT(settings.language);

  const [selected, setSelected] = useState(settings.selectedBackground);
  const [category, setCategory] = useState<"all" | BgCategory>("all");
  const [search, setSearch] = useState("");
  const [customUrl, setCustomUrl] = useState(settings.customBackgroundUrl ?? "");
  const [customPreview, setCustomPreview] = useState<string | null>(
    settings.selectedBackground === "custom" ? settings.customBackgroundUrl : null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = backgrounds.filter((bg) => {
    const matchCat = category === "all" || bg.category === category;
    const matchSearch = bg.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleApplyUrl = () => {
    const url = customUrl.trim();
    if (!url) return;
    setCustomPreview(url);
    setSelected("custom");
  };

  const handleSave = () => {
    if (selected === "custom" && customPreview) {
      setSettings({
        selectedBackground: "custom",
        customBackgroundUrl: customPreview,
      });
    } else {
      setSettings({ selectedBackground: selected });
    }
    onClose();
  };

  const getUrl = (id: string) => {
    if (id === "custom") return customPreview ?? "";
    return backgrounds.find((b) => b.id === id)?.url ?? "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="bg-gallery"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 240 }}
          className="fixed inset-0 z-[60] flex flex-col"
          style={{
            background: "rgba(6,6,16,0.96)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
            <h2 className="text-base font-semibold text-white/90 tracking-wide">{t.allBackgrounds}</h2>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all"
                style={{
                  background: accent,
                  boxShadow: `0 0 20px ${accent}55`,
                }}
              >
                {t.save}
              </motion.button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 pt-5 pb-3 shrink-0">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <Search className="w-4 h-4 text-white/30 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchBg}
                className="flex-1 bg-transparent text-white/80 placeholder-white/25 text-sm outline-none"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="px-6 pb-4 flex gap-2 flex-wrap shrink-0">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={
                    isActive
                      ? { background: `${accent}28`, border: `1px solid ${accent}55`, color: "white" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid transparent", color: "rgba(255,255,255,0.45)" }
                  }
                >
                  {t[cat.label] as string}
                </button>
              );
            })}
          </div>

          {/* Grid — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {/* Custom preview card if set */}
              {customPreview && (
                <button
                  onClick={() => setSelected("custom")}
                  className="relative aspect-video rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    border: selected === "custom" ? `2px solid ${accent}` : "2px solid rgba(255,255,255,0.08)",
                    boxShadow: selected === "custom" ? `0 0 20px ${accent}44` : undefined,
                  }}
                >
                  <img src={customPreview} alt="Custom" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2 left-3 text-[11px] font-medium text-white/90">Custom</span>
                  {selected === "custom" && (
                    <div
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: accent }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              )}

              {filtered.map((bg) => {
                const isSelected = selected === bg.id;
                return (
                  <motion.button
                    key={bg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(bg.id)}
                    className="relative aspect-video rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      border: isSelected ? `2px solid ${accent}` : "2px solid rgba(255,255,255,0.06)",
                      boxShadow: isSelected ? `0 0 20px ${accent}44` : undefined,
                    }}
                  >
                    <img
                      src={bg.url}
                      alt={bg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-2 left-3 text-[11px] font-medium text-white/90">{bg.name}</span>
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: accent }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Custom URL section */}
          <div
            className="shrink-0 px-6 py-5 border-t border-white/8"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Link className="w-3 h-3" /> {t.customUrlLabel}
            </p>
            <div className="flex gap-2">
              <div
                className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <input
                  ref={inputRef}
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyUrl()}
                  placeholder={t.customUrlPlaceholder}
                  className="flex-1 bg-transparent text-white/75 placeholder-white/22 text-sm outline-none"
                  style={{ caretColor: accent }}
                />
              </div>
              <button
                onClick={handleApplyUrl}
                className="px-4 py-3 rounded-2xl text-sm font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {t.applyUrl}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
