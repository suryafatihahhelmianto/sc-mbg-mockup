"use client";

interface NutritionInputProps {
  data: Record<string, number>;
  onChange: (data: Record<string, number>) => void;
}

const nutritionFields = [
  { key: "kalori", label: "Kalori", unit: "kcal" },
  { key: "protein", label: "Protein", unit: "g" },
  { key: "lemak", label: "Lemak", unit: "g" },
  { key: "karbo", label: "Karbohidrat", unit: "g" },
  { key: "serat", label: "Serat", unit: "g" },
  { key: "kalsium", label: "Kalsium", unit: "mg" },
  { key: "zatBesi", label: "Zat Besi", unit: "mg" },
  { key: "vitaminA", label: "Vitamin A", unit: "mcg" },
];

export default function NutritionInput({
  data,
  onChange,
}: NutritionInputProps) {
  const handleChange = (key: string, value: number) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-4">
      <p className="text-sm font-bold text-blue-900 mb-3">
        Masukkan Komposisi Gizi Harian
      </p>
      <div className="grid grid-cols-2 gap-4">
        {nutritionFields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              {field.label}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={data[field.key] || 0}
                onChange={(e) =>
                  handleChange(
                    field.key,
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
              <span className="flex items-center px-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-600 whitespace-nowrap">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-4 mt-4">
        <p className="text-xs font-bold text-gray-700 mb-2">
          Standar Gizi Harian (Rekomendasi)
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Kalori: 1600-2000 kcal</div>
          <div>Protein: 50-60 g</div>
          <div>Lemak: 50-65 g</div>
          <div>Karbo: 200-250 g</div>
          <div>Kalsium: 800 mg</div>
          <div>Zat Besi: 10-15 mg</div>
        </div>
      </div>
    </div>
  );
}
