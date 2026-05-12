import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface AccentSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  accent: string;
  className?: string;
}

export function AccentSlider({
  value, onValueChange, min = 0, max = 100, step = 1, accent, className,
}: AccentSliderProps) {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      min={min} max={max} step={step}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range
          className="absolute h-full rounded-full"
          style={{ background: accent }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full bg-white shadow-md transition-transform focus-visible:outline-none hover:scale-110 disabled:pointer-events-none disabled:opacity-50"
        style={{ boxShadow: `0 0 0 2px ${accent}55, 0 2px 6px rgba(0,0,0,0.4)` }}
      />
    </SliderPrimitive.Root>
  );
}
