import { FOOD_DATABASE, NUTRITION_STANDARDS } from "./nutrition-data";

export interface DailyMenuNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface ValidationItem {
  status: "good" | "low" | "high";
  percentage: number;
}

export interface NutritionValidation {
  calories: ValidationItem;
  protein: ValidationItem;
  carbs: ValidationItem;
  fat: ValidationItem;
  fiber: ValidationItem;
}

export interface FoodItem {
  name: string;
  category: "makananPokok" | "protein" | "sayuran" | "buah" | "susu";
}

export function calculateNutritionFromFoods(
  foods: Partial<Record<FoodItem["category"], string>>
) {
  const nutrition: DailyMenuNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  const categories: FoodItem["category"][] = [
    "makananPokok",
    "protein",
    "sayuran",
    "buah",
    "susu",
  ];

  categories.forEach((category) => {
    const foodName = foods[category];
    if (foodName) {
      const foodList = FOOD_DATABASE[category] as any[];
      const food = foodList.find(
        (f) => f.name.toLowerCase() === foodName.toLowerCase()
      );
      if (food) {
        nutrition.calories += food.calories;
        nutrition.protein += food.protein;
        nutrition.carbs += food.carbs;
        nutrition.fat += food.fat;
        nutrition.fiber += food.fiber || 2;
      }
    }
  });

  return nutrition;
}

export function validateNutrition(
  nutrition: DailyMenuNutrition
): NutritionValidation {
  return {
    calories: getNutritionCheck(
      nutrition.calories,
      NUTRITION_STANDARDS.calories
    ),
    protein: getNutritionCheck(nutrition.protein, NUTRITION_STANDARDS.protein),
    carbs: getNutritionCheck(nutrition.carbs, NUTRITION_STANDARDS.carbs),
    fat: getNutritionCheck(nutrition.fat, NUTRITION_STANDARDS.fat),
    fiber: getNutritionCheck(nutrition.fiber, NUTRITION_STANDARDS.fiber),
  };
}
function getNutritionCheck(
  value: number,
  standard: { min: number; target: number; max: number }
): ValidationItem {
  const percentage = (value / standard.target) * 100;

  let status: ValidationItem["status"];

  if (percentage >= 80 && percentage <= 120) status = "good";
  else if (percentage < 80) status = "low";
  else status = "high";

  return { status, percentage };
}

export function isNutritionMet(
  validation: ReturnType<typeof validateNutrition>
) {
  return (
    validation.calories.status === "good" &&
    validation.protein.status === "good" &&
    validation.carbs.status === "good"
  );
}
