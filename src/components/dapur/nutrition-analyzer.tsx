"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import {
  calculateNutritionFromFoods,
  validateNutrition,
  type NutritionValidation,
  type DailyMenuNutrition,
} from "../../lib/nutrition-calculator";
import { FOOD_DATABASE } from "../../lib/nutrition-data";

/* --- Mapping food names into required category structure --- */
function mapFoodsToCategories(foods: string[]) {
  return {
    makananPokok: foods[0] || undefined,
    protein: foods[1] || undefined,
    sayuran: foods[2] || undefined,
    buah: foods[3] || undefined,
    susu: foods[4] || undefined,
  };
}

export default function NutritionAnalyzer({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [foods, setFoods] = useState(["", "", "", "", ""]);
  const [analysis, setAnalysis] = useState<{
    nutrition: DailyMenuNutrition;
    validation: NutritionValidation;
  } | null>(null);

  const availableFoods = Object.values(FOOD_DATABASE)
    .flat()
    .map((f) => f.name);

  const handleAnalyze = () => {
    const mapped = mapFoodsToCategories(foods);
    const nutrition = calculateNutritionFromFoods(mapped);
    const validation = validateNutrition(nutrition);
    setAnalysis({ nutrition, validation });
  };

  const getStatusColor = (status: "good" | "low" | "high") => {
    return {
      good: "text-green-600 bg-green-50",
      low: "text-orange-600 bg-orange-50",
      high: "text-red-600 bg-red-50",
    }[status];
  };

  return (
    <div className="space-y-6">
      {/* FOOD INPUT */}
      <Card>
        <CardHeader>
          <CardTitle>Input Menu Harian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {foods.map((food, index) => (
            <input
              key={index}
              type="text"
              list="foods-list"
              value={food}
              onChange={(e) => {
                const updated = [...foods];
                updated[index] = e.target.value;
                setFoods(updated);
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              placeholder={`Makanan ${index + 1}`}
            />
          ))}

          <datalist id="foods-list">
            {availableFoods.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Analisis Gizi
          </Button>
        </CardContent>
      </Card>

      {/* RESULTS */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hasil Analisis Gizi</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: "calories", label: "Kalori", unit: "kcal" },
                { key: "protein", label: "Protein", unit: "g" },
                { key: "carbs", label: "Karbohidrat", unit: "g" },
                { key: "fat", label: "Lemak", unit: "g" },
                { key: "fiber", label: "Serat", unit: "g" },
              ].map((item) => {
                const v =
                  analysis.validation[item.key as keyof NutritionValidation];

                const val =
                  analysis.nutrition[item.key as keyof DailyMenuNutrition];

                return (
                  <div
                    key={item.key}
                    className={`p-3 rounded-lg border ${getStatusColor(
                      v.status
                    )}`}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-lg font-bold">
                      {Math.round(val)} {item.unit}
                    </div>
                    <div className="text-xs">({Math.round(v.percentage)}%)</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {onClose && (
        <Button variant="ghost" onClick={onClose} className="w-full">
          Tutup
        </Button>
      )}
    </div>
  );
}
