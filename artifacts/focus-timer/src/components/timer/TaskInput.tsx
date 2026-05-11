import React from "react";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskInput({ value, onChange }: TaskInputProps) {
  return (
    <div className="w-full max-w-md mx-auto z-10 mt-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What are you focusing on?"
        className="w-full text-center bg-transparent border-none outline-none text-xl sm:text-2xl text-white/90 placeholder:text-white/30 focus:ring-0 font-light"
      />
      <div className="h-[1px] w-1/2 mx-auto mt-2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
