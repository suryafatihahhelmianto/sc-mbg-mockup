import { Menu } from "./po-calculator";

export const sampleMenus: Menu[] = [
  {
    id: "m1",
    name: "Nasi + Ayam",
    items: [
      { id: "i1", ingredientId: "beras", name: "Beras", gramPerServing: 150 },
      {
        id: "i2",
        ingredientId: "ayam",
        name: "Ayam Fillet",
        gramPerServing: 75,
      },
      { id: "i3", ingredientId: "garam", name: "Garam", gramPerServing: 2 },
    ],
  },
  {
    id: "m2",
    name: "Bubur Sayur",
    items: [
      { id: "i4", ingredientId: "beras", name: "Beras", gramPerServing: 80 },
      {
        id: "i5",
        ingredientId: "sayur",
        name: "Campuran Sayur",
        gramPerServing: 100,
      },
    ],
  },
];
