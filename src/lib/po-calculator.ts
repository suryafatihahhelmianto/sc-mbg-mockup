export type MenuItem = {
  id: string;
  ingredientId: string;
  name: string;
  gramPerServing: number; // grams per recipient
  unit?: string;
};

export type Menu = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type RecipientGroup = {
  id: string;
  name: string;
  count: number;
};

export type RequirementLine = {
  ingredientId: string;
  ingredientName: string;
  totalGram: number;
  totalKg: number;
};

export function calcRequirements(
  menu: Menu,
  recipients: RecipientGroup[]
): RequirementLine[] {
  const totalRecipients = recipients.reduce(
    (s, r) => s + Math.max(0, Math.floor(r.count)),
    0
  );

  const byIngredient: Record<string, RequirementLine> = {};

  for (const item of menu.items) {
    const totalGram = (item.gramPerServing || 0) * totalRecipients;
    if (!byIngredient[item.ingredientId]) {
      byIngredient[item.ingredientId] = {
        ingredientId: item.ingredientId,
        ingredientName: item.name,
        totalGram: 0,
        totalKg: 0,
      };
    }
    byIngredient[item.ingredientId].totalGram += totalGram;
  }

  return Object.values(byIngredient).map((r) => ({
    ...r,
    totalKg: Math.round((r.totalGram / 1000) * 100) / 100,
  }));
}
// Purchase Order Calculator Library

export interface POCalculationResult {
  barang: string;
  satuan: string;
  jumlahOtomatis: number;
  jumlahFinal: number;
  sumberPerhitungan: "otomatis" | "manual";
  catatan?: string;
}

// Recipe database - ingredient requirements per serving
export const RECIPE_DB: Record<string, Record<string, number>> = {
  // Makanan Pokok
  "nasi putih": {
    beras: 0.075, // kg per serving
  },
  "nasi kuning": {
    beras: 0.075,
    rempah: 0.01,
  },
  roti: {
    roti: 1, // pcs
  },

  // Lauk - Ikan
  "ikan goreng": {
    ikan_segar: 0.15,
    minyak_goreng: 0.03,
    tepung_terigu: 0.02,
    garam: 0.001,
  },
  "ikan bakar": {
    ikan_segar: 0.15,
    rempah: 0.01,
    minyak: 0.01,
  },

  // Lauk - Ayam
  "ayam goreng": {
    ayam_segar: 0.2,
    minyak_goreng: 0.04,
    tepung_terigu: 0.03,
    garam: 0.001,
  },
  "ayam bakar": {
    ayam_segar: 0.2,
    rempah: 0.015,
    minyak: 0.015,
  },

  // Lauk - Protein Nabati
  tahu: {
    tahu: 0.15,
    minyak_goreng: 0.02,
  },
  tempe: {
    tempe: 0.15,
    minyak_goreng: 0.02,
  },

  // Sayuran
  "bayam segar": {
    bayam: 0.1,
    minyak: 0.01,
    bawang: 0.01,
  },
  kangkung: {
    kangkung: 0.1,
    minyak: 0.01,
    bawang: 0.01,
  },
  "sayur asem": {
    sayuran_segar: 0.15,
    rempah: 0.01,
    minyak: 0.01,
  },

  // Buah
  pisang: {
    pisang: 1, // pcs
  },
  jeruk: {
    jeruk: 1,
  },

  // Susu
  "susu sapi": {
    susu_segar: 0.25, // liter
  },
  "susu kental manis": {
    susu_kental: 0.03, // kg
  },
};

/**
 * Calculate PO items from menu
 */
export function calculatePOItems(
  menuItems: string[],
  servings: number,
  multiplier = 1.1 // 10% buffer for waste
): POCalculationResult[] {
  const ingredients: Record<string, { quantity: number; satuan: string }> = {};

  // Calculate total ingredients needed
  menuItems.forEach((item) => {
    const lowerItem = item.toLowerCase().trim();
    const recipe = RECIPE_DB[lowerItem];

    if (recipe) {
      Object.entries(recipe).forEach(([ingredient, quantityPerServing]) => {
        const totalQuantity = quantityPerServing * servings * multiplier;

        if (!ingredients[ingredient]) {
          ingredients[ingredient] = {
            quantity: 0,
            satuan: getSatuan(ingredient),
          };
        }
        ingredients[ingredient].quantity += totalQuantity;
      });
    }
  });

  // Convert to PO items
  return Object.entries(ingredients).map(
    ([ingredient, { quantity, satuan }]) => ({
      barang: formatNamaBarang(ingredient),
      satuan,
      jumlahOtomatis: Math.ceil(quantity * 10) / 10, // Round up to 1 decimal
      jumlahFinal: Math.ceil(quantity * 10) / 10,
      sumberPerhitungan: "otomatis",
    })
  );
}

/**
 * Get satuan for ingredient
 */
function getSatuan(ingredient: string): string {
  const byWeight = ["beras", "tepung", "garam", "rempah", "susu", "minyak"];
  const byCount = ["roti", "pisang", "jeruk", "telur", "tahu", "tempe"];
  const byLiter = ["minyak_goreng", "susu_segar", "air"];

  const lower = ingredient.toLowerCase();

  if (byLiter.some((b) => lower.includes(b))) return "liter";
  if (byCount.some((b) => lower.includes(b))) return "pcs";
  if (byWeight.some((b) => lower.includes(b))) return "kg";

  return "kg"; // default
}

/**
 * Format ingredient name
 */
function formatNamaBarang(ingredient: string): string {
  return ingredient
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Adjust PO item quantity
 */
export function adjustPOItem(
  item: POCalculationResult,
  newQuantity: number
): POCalculationResult {
  return {
    ...item,
    jumlahFinal: newQuantity,
    sumberPerhitungan: "manual",
    catatan: "Disesuaikan manual",
  };
}

/**
 * Generate PO number
 */
export function generatePONumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 9000) + 1000;

  return `PO-${year}${month}${day}-${random}`;
}

/**
 * Calculate total cost
 */
export function calculateTotalCost(items: POCalculationResult[]): number {
  return items.reduce((total, item) => {
    const harga = (item as any).hargaSatuan || 0;
    return total + item.jumlahFinal * harga;
  }, 0);
}
