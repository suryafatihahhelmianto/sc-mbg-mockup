"use client";

import { useState } from "react";
import { Card, CardContent } from "../../../components/dapur/card";
import { Button } from "../../../components/dapur/button";
import { Input } from "../../../components/dapur/input";
import MenuForm from "../../../components/dapur/menu-form";
import MenuWizard from "../../../components/dapur/menu-wizard";
import { Link } from "react-router-dom";
import {
  FaCalendarDays,
  FaCheck,
  FaClock,
  FaTrashCan,
  FaClipboard,
  FaBowlRice,
  FaUtensils,
  FaCarrot,
  FaAppleWhole,
  FaCow,
  FaWeightScale,
  FaPlus,
  FaPen,
  FaEye,
  FaFilter,
  FaCalendar,
} from "react-icons/fa6";

interface MenuItem {
  day: string;
  mainFood: string;
  protein: string;
  vegetables: string;
  fruits: string;
  dairy?: string;
  gramasi: {
    mainFood: number;
    protein: number;
    vegetables: number;
    fruits: number;
    dairy?: number;
  };
  nutrition?: {
    kalori: number;
    protein: number;
    lemak: number;
    karbohidrat: number;
  };
}

interface Menu {
  id: number;
  namaMenu: string;
  mingguKe: number;
  tahun: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: "draft" | "pending_approval" | "approved";
  items: MenuItem[];
  totalPenerima: number;
  penerimaKhusus: number;
}

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: 1,
      namaMenu: "Menu MBG Minggu 1 - 2025",
      mingguKe: 1,
      tahun: 2025,
      tanggalMulai: "2025-01-06",
      tanggalSelesai: "2025-01-10",
      status: "approved",
      items: [
        {
          day: "Senin",
          mainFood: "Nasi putih",
          protein: "Ikan goreng",
          vegetables: "Bayam",
          fruits: "Pisang",
          gramasi: {
            mainFood: 200,
            protein: 100,
            vegetables: 150,
            fruits: 100,
          },
          nutrition: {
            kalori: 450,
            protein: 25,
            lemak: 12,
            karbohidrat: 55,
          },
        },
        {
          day: "Selasa",
          mainFood: "Nasi kuning",
          protein: "Ayam rebus",
          vegetables: "Brokoli",
          fruits: "Jeruk",
          gramasi: {
            mainFood: 200,
            protein: 120,
            vegetables: 150,
            fruits: 100,
          },
          nutrition: {
            kalori: 480,
            protein: 28,
            lemak: 10,
            karbohidrat: 58,
          },
        },
      ],
      totalPenerima: 150,
      penerimaKhusus: 12,
    },
    {
      id: 2,
      namaMenu: "Menu MBG Minggu 2 - 2025",
      mingguKe: 2,
      tahun: 2025,
      tanggalMulai: "2025-01-13",
      tanggalSelesai: "2025-01-17",
      status: "draft",
      items: [
        {
          day: "Senin",
          mainFood: "Nasi merah",
          protein: "Tahu tempe",
          vegetables: "Kangkung",
          fruits: "Apel",
          gramasi: {
            mainFood: 180,
            protein: 150,
            vegetables: 150,
            fruits: 100,
          },
          nutrition: {
            kalori: 420,
            protein: 22,
            lemak: 8,
            karbohidrat: 52,
          },
        },
        {
          day: "Selasa",
          mainFood: "Bubur ayam",
          protein: "Ayam kampung",
          vegetables: "Wortel",
          fruits: "Melon",
          gramasi: {
            mainFood: 250,
            protein: 80,
            vegetables: 120,
            fruits: 120,
          },
        },
      ],
      totalPenerima: 145,
      penerimaKhusus: 10,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMenus = menus
    .filter((menu) =>
      menu.namaMenu.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((menu) =>
      filterStatus === "all" ? true : menu.status === filterStatus
    );

  const handleAddMenu = (data: any) => {
    setNewMenuName(data.namaMenu);
    setShowForm(false);
    setShowWizard(true);
  };

  const handleCompleteWizard = (items: Record<string, any>) => {
    const menuItems = Object.entries(items).map(([day, data]: any) => ({
      day,
      mainFood: data.makananPokok || "",
      protein: data.protein || "",
      vegetables: data.sayuran || "",
      fruits: data.buah || "",
      dairy: data.susu || "",
      gramasi: {
        mainFood: data.gramasi?.makananPokok || 200,
        protein: data.gramasi?.protein || 100,
        vegetables: data.gramasi?.sayuran || 150,
        fruits: data.gramasi?.buah || 100,
        dairy: data.gramasi?.susu || 0,
      },
    }));

    setMenus([
      ...menus,
      {
        id: Date.now(),
        namaMenu: newMenuName,
        mingguKe: Math.floor(Math.random() * 52) + 1,
        tahun: new Date().getFullYear(),
        tanggalMulai: new Date().toISOString().split("T")[0],
        tanggalSelesai: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "draft",
        items: menuItems,
        totalPenerima: 150,
        penerimaKhusus: 0,
      },
    ]);
    setShowWizard(false);
  };

  const handleDeleteMenu = (id: number) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string; icon: any }> =
      {
        approved: {
          color: "bg-green-100 text-green-700 border border-green-200",
          label: "Disetujui",
          icon: <FaCheck className="text-green-600" />,
        },
        pending_approval: {
          color: "bg-yellow-100 text-yellow-700 border border-yellow-200",
          label: "Menunggu",
          icon: <FaClock className="text-yellow-600" />,
        },
        draft: {
          color: "bg-gray-100 text-gray-700 border border-gray-200",
          label: "Draft",
          icon: <FaCalendarDays className="text-gray-600" />,
        },
      };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config[status]?.color}`}
      >
        {config[status]?.icon}
        {config[status]?.label || status}
      </span>
    );
  };

  const calculateTotalGramasi = (menu: Menu) => {
    return menu.items.reduce((total, item) => {
      return (
        total +
        item.gramasi.mainFood +
        item.gramasi.protein +
        item.gramasi.vegetables +
        item.gramasi.fruits +
        (item.gramasi.dairy || 0)
      );
    }, 0);
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/dapur"
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ←
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Master Menu MBG
              </h1>
            </div>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <FaClipboard className="text-blue-500" />
              Buat dan kelola menu mingguan dengan gramasi & validasi gizi
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2"
          >
            <FaPlus />
            Buat Menu Baru
          </Button>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Menu</p>
                <p className="text-2xl font-bold">{menus.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaClipboard className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Draft</p>
                <p className="text-2xl font-bold">
                  {menus.filter((m) => m.status === "draft").length}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <FaCalendarDays className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Disetujui</p>
                <p className="text-2xl font-bold">
                  {menus.filter((m) => m.status === "approved").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FaCheck className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Minggu Ini</p>
                <p className="text-2xl font-bold">Senin-Jumat</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <FaCalendar className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card p-4 rounded-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="🔍 Cari menu MBG..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filterStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterStatus("draft")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filterStatus === "draft"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setFilterStatus("approved")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filterStatus === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Disetujui
              </button>
            </div>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMenus.map((menu) => (
            <Card
              key={menu.id}
              className="glass-card hover:shadow-lg transition-all"
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {menu.namaMenu}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {menu.tanggalMulai} - {menu.tanggalSelesai}
                      </span>
                      <span>•</span>
                      <span>Minggu ke-{menu.mingguKe}</span>
                    </div>
                  </div>
                  {getStatusBadge(menu.status)}
                </div>

                {/* Penerima Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Total Penerima</p>
                    <p className="font-bold text-lg">{menu.totalPenerima}</p>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Penerima Khusus</p>
                    <p className="font-bold text-lg text-purple-600">
                      {menu.penerimaKhusus}
                    </p>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Total Gramasi</p>
                    <p className="font-bold text-lg text-blue-600 flex items-center gap-1">
                      <FaWeightScale />
                      {calculateTotalGramasi(menu).toLocaleString()}g
                    </p>
                  </div>
                </div>

                {/* Menu Items - Compact */}
                <div className="space-y-2 mb-4">
                  {menu.items.slice(0, 3).map((item) => (
                    <div
                      key={item.day}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 w-16">
                          {item.day}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.nutrition && (
                            <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                              {item.nutrition.kalori} kal
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FaBowlRice className="text-orange-500 text-xs" />
                          <span className="truncate">{item.mainFood}</span>
                          <span className="text-xs text-gray-500 font-mono ml-auto">
                            {item.gramasi.mainFood}g
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUtensils className="text-red-500 text-xs" />
                          <span className="truncate">{item.protein}</span>
                          <span className="text-xs text-gray-500 font-mono ml-auto">
                            {item.gramasi.protein}g
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCarrot className="text-green-500 text-xs" />
                          <span className="truncate">{item.vegetables}</span>
                          <span className="text-xs text-gray-500 font-mono ml-auto">
                            {item.gramasi.vegetables}g
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaAppleWhole className="text-pink-500 text-xs" />
                          <span className="truncate">{item.fruits}</span>
                          <span className="text-xs text-gray-500 font-mono ml-auto">
                            {item.gramasi.fruits}g
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {menu.items.length > 3 && (
                    <div className="text-center text-sm text-gray-500 pt-2">
                      + {menu.items.length - 3} hari lainnya
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FaEye />
                      Detail
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FaPen />
                      Edit
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteMenu(menu.id)}
                    className="flex items-center gap-2"
                  >
                    <FaTrashCan />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMenus.length === 0 && (
          <div className="glass-card p-8 rounded-xl text-center">
            <FaClipboard className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Tidak ada menu yang ditemukan
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? `Tidak ada menu dengan kata kunci "${searchTerm}"`
                : "Belum ada menu yang dibuat"}
            </p>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <FaPlus />
              Buat Menu Pertama
            </Button>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <FaClipboard className="text-blue-600" />
            Panduan Menu MBG
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <FaWeightScale className="text-emerald-500 mt-1 flex-shrink-0" />
              <span>Masukkan gramasi untuk setiap komponen makanan</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" />
              <span>Verifikasi nilai gizi sebelum submit menu</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCalendar className="text-emerald-500 mt-1 flex-shrink-0" />
              <span>
                Menu harus selesai sebelum hari Kamis untuk minggu depan
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaWeightScale className="text-emerald-500 mt-1 flex-shrink-0" />
              <span>
                Gramasi membantu perhitungan kebutuhan bahan yang akurat
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <Card className="max-w-md mx-4">
            <CardContent>
              <MenuForm
                onSubmit={handleAddMenu}
                onCancel={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Wizard Modal */}
      {showWizard && (
        <MenuWizard
          menuName={newMenuName}
          onComplete={handleCompleteWizard}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </div>
  );
}
