// Types for Kitchen Management System

export interface MenuItem {
  id?: number;
  menuId?: number;
  hari: string; // Senin, Selasa, Rabu, Kamis, Jumat, Sabtu
  makananPokok: string;
  laukPauk: string;
  sayur: string;
  buah: string;
  susuMinuman?: string;
}

export interface NutritionComposition {
  id?: number;
  menuItemId?: number;
  kalori: number;
  protein: number; // grams
  lemak: number; // grams
  karbo: number; // grams
  serat: number; // grams
  kalsium: number; // mg
  zatBesi: number; // mg
  vitaminA: number; // mcg
}

export interface Menu {
  id?: number;
  namaMenu: string;
  mingguKe: number;
  tahun: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: "draft" | "pending_approval" | "approved";
  items?: MenuItem[];
  dibuatPada?: string;
}

export interface SpecialMenu {
  id?: number;
  namaPaket: string;
  deskripsi?: string;
  menuId: number;
  jumlahPenerima: number;
  status: "active" | "inactive";
  items?: MenuItem[];
}

export interface POItem {
  id?: number;
  poId?: number;
  namaBarang: string;
  satuan: string; // kg, liter, pcs, dll
  jumlahDiusulkan: number;
  jumlahFinal?: number;
  hargaSatuan?: number;
  catatan?: string;
  sumberPerhitungan: "otomatis" | "manual";
}

export interface PurchaseOrder {
  id?: number;
  menuId: number;
  specialMenuIds?: number[];
  poNumber?: string;
  status: "draft" | "submitted" | "approved" | "completed";
  tanggalDibuat?: string;
  tanggalDiajukan?: string;
  catatan?: string;
  items?: POItem[];
  dibuatPada?: string;
}

export interface MenuWithNutrition extends MenuItem {
  nutrition?: NutritionComposition;
}
