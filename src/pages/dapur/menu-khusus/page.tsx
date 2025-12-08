"use client";

import { useState } from "react";
import { Card, CardContent } from "../../../components/dapur/card";
import { Button } from "../../../components/dapur/button";
import { Input } from "../../../components/dapur/input";
import { Modal } from "../../../components/dapur/modal";
import { Badge } from "../../../components/dapur/badge";
import SpecialMenuForm from "../../../components/dapur/special-menu-form";
import { Link } from "react-router-dom";

export default function MenuKhususPage() {
  const [specialMenus, setSpecialMenus] = useState([
    {
      id: 1,
      namaPaket: "Menu Khusus Ibu Hamil",
      deskripsi: "Menu dengan nutrisi khusus untuk ibu hamil",
      menuId: 1,
      jumlahPenerima: 25,
      status: "active" as const,
      itemsCount: 6,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = specialMenus.filter(
    (menu) =>
      menu.namaPaket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMenu = (data: any) => {
    setSpecialMenus([
      ...specialMenus,
      {
        ...data,
        id: Date.now(),
        itemsCount: 6,
      },
    ]);
    setShowForm(false);
  };

  const handleDeleteMenu = (id: number) => {
    setSpecialMenus(specialMenus.filter((m) => m.id !== id));
  };

  const getTotalPenerima = () =>
    specialMenus.reduce((sum, m) => sum + m.jumlahPenerima, 0);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
              <h1 className="text-3xl font-bold text-gray-900">Menu Khusus</h1>
            </div>
            <p className="text-gray-600">
              Buat paket menu khusus untuk grup penerima tertentu
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            + Buat Paket Baru
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <p className="text-purple-900 font-bold mb-2">Info Menu Khusus</p>
          <ul className="space-y-1 text-sm text-purple-800">
            <li>• Menu khusus dapat dibuat berbeda dari menu reguler</li>
            <li>• Tentukan jumlah penerima untuk setiap paket</li>
            <li>• Setiap paket memiliki komposisi gizi sendiri</li>
            <li>• Paket akan dimasukkan ke dalam perhitungan PO</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Paket Aktif
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {specialMenus.filter((m) => m.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">
                Total Penerima
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {getTotalPenerima()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Cari menu khusus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Menu List */}
        <div className="space-y-4">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <Card key={menu.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {menu.namaPaket}
                        </h3>
                        <Badge
                          variant={
                            menu.status === "active" ? "success" : "default"
                          }
                        >
                          {menu.status === "active" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </div>
                      {menu.deskripsi && (
                        <p className="text-gray-600 text-sm mb-3">
                          {menu.deskripsi}
                        </p>
                      )}
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Penerima:</span>{" "}
                          {menu.jumlahPenerima} orang
                        </div>
                        <div>
                          <span className="font-medium">Item Menu:</span>{" "}
                          {menu.itemsCount} hari
                        </div>
                        <div>
                          <span className="font-medium">Dari Menu:</span> ID{" "}
                          {menu.menuId}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
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
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">Belum ada menu khusus</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Buat Menu Khusus Pertama
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        title="Buat Paket Menu Khusus"
        onClose={() => setShowForm(false)}
        onSave={() => {}}
      >
        <SpecialMenuForm
          onSubmit={handleAddMenu}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </div>
  );
}
