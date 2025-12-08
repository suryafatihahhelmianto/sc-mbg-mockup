"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface SpecialMenuFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export default function SpecialMenuForm({
  onSubmit,
  onCancel,
  initialData,
}: SpecialMenuFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      namaPaket: "",
      deskripsi: "",
      menuId: "",
      jumlahPenerima: 0,
      status: "active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "jumlahPenerima"
          ? Number.parseInt(value) || 0
          : name === "menuId"
          ? Number.parseInt(value) || ""
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nama Paket"
        name="namaPaket"
        placeholder="Contoh: Menu Khusus Ibu Hamil"
        value={formData.namaPaket}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Deskripsi (Opsional)
        </label>
        <textarea
          name="deskripsi"
          placeholder="Jelaskan jenis menu khusus dan alasannya"
          value={formData.deskripsi}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Pilih Menu"
          name="menuId"
          type="number"
          placeholder="ID menu"
          value={formData.menuId}
          onChange={handleChange}
          required
        />
        <Input
          label="Jumlah Penerima"
          name="jumlahPenerima"
          type="number"
          min="1"
          value={formData.jumlahPenerima}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          Simpan
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
