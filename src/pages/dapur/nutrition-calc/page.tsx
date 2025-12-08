"use client";

import NutritionAnalyzer from "../../../components/dapur/nutrition-analyzer";

export default function NutritionCalculatorPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Kalkulator Komposisi Gizi
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Analisis dan verifikasi komposisi gizi menu berdasarkan standar
            harian
          </p>
        </div>

        <div className="max-w-4xl">
          <NutritionAnalyzer />
        </div>
      </div>
    </div>
  );
}
