"use client";

type SliderProps = {
  label: string;
  value: number;
  setValue: (v: number) => void;
};

export default function AttributeSlider({ label, value, setValue }: SliderProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>

      <input
        type="range"
        min="1"
        max="99"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />

      <p className="text-sm text-gray-600 mt-1">{value}</p>
    </div>
  );
}
