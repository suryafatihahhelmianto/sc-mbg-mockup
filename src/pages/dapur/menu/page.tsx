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
} from "react-icons/fa6";

interface MenuItem {
  day: string;
  mainFood: string;
  protein: string;
  vegetables: string;
  fruits: string;
  dairy?: string;
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
}

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: 1,
      namaMenu: "Menu Minggu 1 - 2025",
      mingguKe: 1,
      tahun: 2025,
      tanggalMulai: "2025-01-06",
      tanggalSelesai: "2025-01-12",
      status: "draft",
      items: [
        {
          day: "Senin",
          mainFood: "Nasi putih",
          protein: "Ikan goreng",
          vegetables: "Bayam",
          fruits: "Pisang",
        },
        {
          day: "Selasa",
          mainFood: "Nasi kuning",
          protein: "Ayam rebus",
          vegetables: "Brokoli",
          fruits: "Jeruk",
        },
        {
          day: "Rabu",
          mainFood: "Roti gandum",
          protein: "Tahu goreng",
          vegetables: "Wortel",
          fruits: "Apel",
        },
        {
          day: "Kamis",
          mainFood: "Nasi merah",
          protein: "Telur rebus",
          vegetables: "Spinach",
          fruits: "Melon",
        },
        {
          day: "Jumat",
          mainFood: "Nasi putih",
          protein: "Daging sapi",
          vegetables: "Kacang hijau",
          fruits: "Mangga",
        },
        {
          day: "Sabtu",
          mainFood: "Bubur ayam",
          protein: "Ayam kampung",
          vegetables: "Labu",
          fruits: "Papaya",
        },
      ],
    },
    {
      id: 2,
      namaMenu: "Menu Minggu 2 - 2025",
      mingguKe: 2,
      tahun: 2025,
      tanggalMulai: "2025-01-13",
      tanggalSelesai: "2025-01-19",
      status: "approved",
      items: [
        {
          day: "Senin",
          mainFood: "Nasi putih",
          protein: "Ikan tuna",
          vegetables: "Sawi",
          fruits: "Pir",
        },
        {
          day: "Selasa",
          mainFood: "Mie kuning",
          protein: "Ayam goreng",
          vegetables: "Kol",
          fruits: "Nanas",
        },
        {
          day: "Rabu",
          mainFood: "Roti putih",
          protein: "Tempe goreng",
          vegetables: "Kangkung",
          fruits: "Buah naga",
        },
        {
          day: "Kamis",
          mainFood: "Nasi putih",
          protein: "Udang rebus",
          vegetables: "Buncis",
          fruits: "Leci",
        },
        {
          day: "Jumat",
          mainFood: "Nasi goreng",
          protein: "Ikan bakar",
          vegetables: "Jagung",
          fruits: "Rambutan",
        },
        {
          day: "Sabtu",
          mainFood: "Nasi putih",
          protein: "Ayam bakar",
          vegetables: "Tomat",
          fruits: "Semangka",
        },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = menus.filter((menu) =>
    menu.namaMenu.toLowerCase().includes(searchTerm.toLowerCase())
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
    }));

    setMenus([
      ...menus,
      {
        id: Date.now(),
        namaMenu: newMenuName,
        mingguKe: Math.floor(Math.random() * 52) + 1,
        tahun: new Date().getFullYear(),
        tanggalMulai: new Date().toISOString().split("T")[0],
        tanggalSelesai: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "draft",
        items: menuItems,
      },
    ]);
    setShowWizard(false);
  };

  const handleDeleteMenu = (id: number) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FaCheck className="text-green-600" />;
      case "pending_approval":
        return <FaClock className="text-yellow-600" />;
      default:
        return <FaCalendarDays className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      approved: { color: "bg-green-100 text-green-700", label: "Disetujui" },
      pending_approval: {
        color: "bg-yellow-100 text-yellow-700",
        label: "Pending",
      },
      draft: { color: "bg-gray-100 text-gray-700", label: "Draft" },
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config[status]?.color}`}
      >
        {config[status]?.label || status}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/dapur"
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ←
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Menu Mingguan
              </h1>
            </div>
            <p className="text-gray-600">
              Buat dan kelola menu mingguan dengan validasi gizi otomatis
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            + Buat Menu Baru
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-white border border-blue-200 rounded-xl p-4 flex gap-3 shadow-sm">
          <FaClipboard className="text-blue-500 text-xl" />
          <div>
            <p className="font-semibold text-blue-900">
              Deadline Penyusunan Menu
            </p>
            <p className="text-blue-700 text-sm">
              Penyusunan menu wajib selesai paling lambat hari Jumat untuk
              minggu berikutnya.
            </p>
          </div>
        </div>

        <Input
          placeholder="🔍 Cari menu berdasarkan nama atau minggu..."
          className="mt-4"
        />

        {/* Menu List */}
        <div className="space-y-4">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl">
                <CardContent className="p-6">
                  {/* TITLE + STATUS */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {menu.namaMenu}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Minggu ke {menu.mingguKe} •{" "}
                        {new Date(menu.tanggalMulai).toLocaleDateString(
                          "id-ID"
                        )}{" "}
                        -
                        {new Date(menu.tanggalSelesai).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>

                    {getStatusBadge(menu.status)}
                  </div>

                  {/* NUTRITION SUMMARY */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-600 mb-1">
                      Status Gizi
                    </p>
                    <div className="w-full bg-slate-200 h-2 rounded-full">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(menu.items.length * 15, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* MENU PER HARI */}
                  <div className="space-y-2">
                    {menu.items.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                      >
                        <p className="font-medium text-slate-800 w-20">
                          {item.day}
                        </p>

                        <div className="text-slate-700 flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <FaBowlRice className="text-orange-500" />{" "}
                            {item.mainFood}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaUtensils className="text-red-500" />{" "}
                            {item.protein}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCarrot className="text-green-500" />{" "}
                            {item.vegetables}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaAppleWhole className="text-pink-500" />{" "}
                            {item.fruits}
                          </span>
                          {item.dairy && (
                            <span className="flex items-center gap-1">
                              <FaCow className="text-blue-500" /> {item.dairy}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button variant="secondary" size="sm">
                      Lihat Detail
                    </Button>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteMenu(menu.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Menu Mingguan
                </h1>
                <p className="text-slate-500 mt-1">
                  Kelola menu dan validasi gizi terstandarisasi SPPG
                </p>
              </div>

              <Button
                variant="primary"
                className="px-4 py-2"
                onClick={() => setShowForm(true)}
              >
                + Buat Menu Baru
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <Card>
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
