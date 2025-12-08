"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import NutritionInput from "./nutrition-input";

interface MenuItemFormProps {
  day: string;
  onSave: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export default function MenuItemForm({
  day,
  onSave,
  onCancel,
  initialData,
}: MenuItemFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      makananPokok: "",
      laukPauk: "",
      sayur: "",
      buah: "",
      susuMinuman: "",
    }
  );

  const [nutrition, setNutrition] = useState(
    initialData?.nutrition || {
      kalori: 0,
      protein: 0,
      lemak: 0,
      karbo: 0,
      serat: 0,
      kalsium: 0,
      zatBesi: 0,
      vitaminA: 0,
    }
  );

  const [showNutrition, setShowNutrition] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      nutrition,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Makanan Pokok (Karbo)"
          name="makananPokok"
          placeholder="Contoh: Nasi putih, Roti"
          value={formData.makananPokok}
          onChange={handleChange}
          required
        />

        <Input
          label="Lauk Pauk (Protein)"
          name="laukPauk"
          placeholder="Contoh: Ikan goreng, Tahu"
          value={formData.laukPauk}
          onChange={handleChange}
          required
        />

        <Input
          label="Sayur"
          name="sayur"
          placeholder="Contoh: Sayur asem, Kangkung"
          value={formData.sayur}
          onChange={handleChange}
          required
        />

        <Input
          label="Buah"
          name="buah"
          placeholder="Contoh: Pisang, Jeruk"
          value={formData.buah}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Susu / Minuman Sehat (Opsional)"
            name="susuMinuman"
            placeholder="Contoh: Susu UHT, Jus Buah"
            value={formData.susuMinuman}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowNutrition(!showNutrition)}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
      >
        {showNutrition ? "Sembunyikan" : "Tampilkan"} Komposisi Gizi
      </button>

      {showNutrition && (
        <NutritionInput data={nutrition} onChange={setNutrition} />
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" variant="primary" className="flex-1">
          Simpan {day}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="flex-1"
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
