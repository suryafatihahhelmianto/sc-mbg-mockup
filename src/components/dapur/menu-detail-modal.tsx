"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent } from "./card";

interface MenuItem {
  day: string;
  mainFood: string;
  protein: string;
  vegetables: string;
  fruits: string;
  dairy?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MenuDetailModalProps {
  isOpen: boolean;
  menu: any;
  onClose: () => void;
  onSave: (items: MenuItem[]) => void;
}

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const NUTRISI_STANDAR = {
  calories: 200,
  protein: 10,
  carbs: 10,
  fat: 10,
};

export default function MenuDetailModal({
  isOpen,
  menu,
  onClose,
  onSave,
}: MenuDetailModalProps) {
  const [items, setItems] = useState<MenuItem[]>(
    menu?.items ||
      HARI.map((day) => ({
        day,
        mainFood: "",
        protein: "",
        vegetables: "",
        fruits: "",
        dairy: "",
      }))
  );

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editData, setEditData] = useState<MenuItem | null>(null);

  const handleEditDay = (day: string) => {
    const item = items.find((i) => i.day === day);
    if (item) {
      setEditData({ ...item });
      setEditingDay(day);
    }
  };

  const handleSaveDay = () => {
    if (editData && editingDay) {
      setItems(items.map((i) => (i.day === editingDay ? editData : i)));
      setEditingDay(null);
      setEditData(null);
    }
  };

  const handleSubmit = () => {
    onSave(items);
    onClose();
  };

  if (!isOpen || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">{menu.namaMenu}</h2>
          <p className="text-sm text-gray-600">
            Kelola menu mingguan dengan komposisi gizi
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Menu List */}
          <div className="space-y-3">
            {items.map((item) => (
              <Card
                key={item.day}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900">
                      {item.day}
                    </h3>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditDay(item.day)}
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Karbo:</span>
                      <p className="text-gray-600">{item.mainFood || "-"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Protein:
                      </span>
                      <p className="text-gray-600">{item.protein || "-"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Sayur:</span>
                      <p className="text-gray-600">{item.vegetables || "-"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Buah:</span>
                      <p className="text-gray-600">{item.fruits || "-"}</p>
                    </div>
                    {item.dairy && (
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">
                          Susu/Minuman:
                        </span>
                        <p className="text-gray-600">{item.dairy}</p>
                      </div>
                    )}
                  </div>

                  {/* Nutrition Info */}
                  {item.nutrition && (
                    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Kalori:</span>
                        <p className="font-bold">{item.nutrition.calories}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <p className="font-bold">{item.nutrition.protein}g</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Karbo:</span>
                        <p className="font-bold">{item.nutrition.carbs}g</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Lemak:</span>
                        <p className="font-bold">{item.nutrition.fat}g</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Modal */}
          {editingDay && editData && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Edit {editingDay}</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Makanan Pokok (Karbo)
                      </label>
                      <Input
                        placeholder="Nasi putih, roti, dll"
                        value={editData.mainFood}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            mainFood: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Lauk Pauk (Protein)
                      </label>
                      <Input
                        placeholder="Ikan, ayam, tahu, tempe, dll"
                        value={editData.protein}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            protein: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Sayuran
                      </label>
                      <Input
                        placeholder="Bayam, brokoli, wortel, dll"
                        value={editData.vegetables}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            vegetables: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Buah-buahan
                      </label>
                      <Input
                        placeholder="Pisang, jeruk, apel, dll"
                        value={editData.fruits}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            fruits: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Susu/Minuman Sehat (Opsional)
                      </label>
                      <Input
                        placeholder="Susu, yogurt, jus, dll"
                        value={editData.dairy || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            dairy: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end mt-6">
                    <Button variant="ghost" onClick={() => setEditingDay(null)}>
                      Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveDay}>
                      Simpan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
