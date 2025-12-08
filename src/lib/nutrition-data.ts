export const FOOD_DATABASE = {
  makananPokok: [
    { name: "Nasi putih", calories: 130, carbs: 28, protein: 2.7, fat: 0.3 },
    { name: "Nasi kuning", calories: 150, carbs: 30, protein: 3, fat: 1.5 },
    { name: "Nasi merah", calories: 111, carbs: 23, protein: 2.6, fat: 0.9 },
    { name: "Roti gandum", calories: 100, carbs: 18, protein: 4, fat: 1.5 },
    { name: "Roti putih", calories: 79, carbs: 14.7, protein: 2.7, fat: 0.9 },
    { name: "Mie kuning", calories: 138, carbs: 26, protein: 4.5, fat: 1 },
    { name: "Bubur ayam", calories: 180, carbs: 32, protein: 8, fat: 2 },
    { name: "Kentang rebus", calories: 77, carbs: 17, protein: 2, fat: 0.1 },
    { name: "Jagung rebus", calories: 86, carbs: 19, protein: 3.2, fat: 1.2 },
  ],
  protein: [
    { name: "Ikan goreng", calories: 206, carbs: 0, protein: 22, fat: 12 },
    { name: "Ikan tuna", calories: 144, carbs: 0, protein: 29.9, fat: 1.3 },
    { name: "Ayam rebus", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
    { name: "Ayam goreng", calories: 320, carbs: 0, protein: 30, fat: 17 },
    { name: "Ayam bakar", calories: 211, carbs: 0, protein: 27, fat: 11 },
    { name: "Telur rebus", calories: 155, carbs: 1.1, protein: 13, fat: 11 },
    { name: "Tahu goreng", calories: 183, carbs: 2.7, protein: 15.8, fat: 13 },
    { name: "Tempe goreng", calories: 170, carbs: 5, protein: 19, fat: 9 },
    { name: "Daging sapi", calories: 271, carbs: 0, protein: 26, fat: 17.5 },
    { name: "Udang rebus", calories: 99, carbs: 0, protein: 21, fat: 0.3 },
  ],
  sayuran: [
    { name: "Bayam", calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
    { name: "Brokoli", calories: 34, carbs: 7, protein: 2.8, fat: 0.4 },
    { name: "Wortel", calories: 41, carbs: 10, protein: 0.9, fat: 0.2 },
    { name: "Spinach", calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
    { name: "Kacang hijau", calories: 31, carbs: 5.6, protein: 3, fat: 0.2 },
    { name: "Labu", calories: 26, carbs: 5, protein: 1, fat: 0.1 },
    { name: "Sawi", calories: 13, carbs: 2.3, protein: 1.5, fat: 0.1 },
    { name: "Kol", calories: 25, carbs: 5.8, protein: 1.3, fat: 0.1 },
    { name: "Kangkung", calories: 29, carbs: 5.5, protein: 3, fat: 0.3 },
    { name: "Buncis", calories: 31, carbs: 7, protein: 2.1, fat: 0.2 },
  ],
  buah: [
    { name: "Pisang", calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
    { name: "Jeruk", calories: 47, carbs: 12, protein: 0.7, fat: 0.3 },
    { name: "Apel", calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
    { name: "Melon", calories: 34, carbs: 8, protein: 0.8, fat: 0.2 },
    { name: "Mangga", calories: 60, carbs: 15, protein: 0.8, fat: 0.4 },
    { name: "Papaya", calories: 43, carbs: 11, protein: 0.6, fat: 0.3 },
    { name: "Pir", calories: 57, carbs: 15, protein: 0.4, fat: 0.1 },
    { name: "Nanas", calories: 50, carbs: 13, protein: 0.5, fat: 0.1 },
    { name: "Buah naga", calories: 60, carbs: 13, protein: 1.2, fat: 0.4 },
    { name: "Leci", calories: 66, carbs: 17, protein: 0.8, fat: 0.4 },
  ],
  susu: [
    { name: "Susu putih", calories: 61, carbs: 4.8, protein: 3.2, fat: 3.3 },
    { name: "Yogurt", calories: 59, carbs: 3.6, protein: 10, fat: 0.4 },
    { name: "Jus jeruk", calories: 45, carbs: 10, protein: 0.7, fat: 0.2 },
    { name: "Jus mangga", calories: 60, carbs: 14, protein: 0.5, fat: 0.3 },
  ],
};

export const NUTRITION_STANDARDS = {
  calories: { min: 100, target: 200, max: 300 },
  protein: { min: 10, target: 10, max: 50 },
  carbs: { min: 10, target: 10, max: 60 },
  fat: { min: 10, target: 10, max: 60 },
  fiber: { min: 10, target: 10, max: 60 },
};

export function getNutritionStatus(
  value: number,
  min: number,
  target: number,
  max: number
) {
  if (value >= min && value <= max)
    return { status: "good", color: "text-green-600" };
  if (value < min) return { status: "low", color: "text-red-600" };
  return { status: "high", color: "text-orange-600" };
}

export function filterFoodSuggestions(
  query: string,
  category: keyof typeof FOOD_DATABASE
) {
  if (!query) return FOOD_DATABASE[category];
  return FOOD_DATABASE[category].filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );
}
