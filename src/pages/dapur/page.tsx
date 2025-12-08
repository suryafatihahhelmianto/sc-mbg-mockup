"use client";
import { Link } from "react-router-dom";

import { Card, CardContent } from "../../components/dapur/card";

export default function DapurPage() {
  const stats = {
    totalMenu: 4,
    menuSelesai: 2,
    menuProses: 1,
    menuTolak: 1,
    totalPenerima: 150,
    totalMenuKhusus: 3,
    poActive: 2,
    deadline: "2025-01-10",
  };
  const features = [
    {
      id: "menu",
      title: "Menu Mingguan",
      description: "Buat dan kelola menu mingguan dengan standar gizi",
      icon: "📅",
      href: "/dapur/menu",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      textColor: "text-blue-900",
      accentColor: "bg-blue-500",
    },
    {
      id: "khusus",
      title: "Menu Khusus",
      description: "Buat paket menu khusus dengan penerima tertentu",
      icon: "🎁",
      href: "/dapur/menu-khusus",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      textColor: "text-purple-900",
      accentColor: "bg-purple-500",
    },
    {
      id: "po",
      title: "Purchase Order",
      description: "Generate PO stock dari menu yang sudah dibuat",
      icon: "🛒",
      href: "/dapur/po",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      textColor: "text-green-900",
      accentColor: "bg-green-500",
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Dapur & Gizi</h1>
          <p className="text-gray-600">
            Kelola menu mingguan, menu khusus, dan purchase order
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.id} to={feature.href}>
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${feature.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${feature.accentColor}`}
                  ></div>
                </div>
                <h3 className={`text-lg font-bold ${feature.textColor} mb-2`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${feature.textColor} opacity-75 mb-4`}>
                  {feature.description}
                </p>
                <button
                  className={`w-full py-2 px-4 rounded-lg ${feature.accentColor} text-white font-medium text-sm hover:opacity-90 transition-opacity`}
                >
                  Mulai
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    📅 Total Menu
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalMenu}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">minggu ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    ✓ Selesai
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.menuSelesai}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">disetujui</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    👥 Total Penerima
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalPenerima}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">semua paket</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    📦 PO Aktif
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.poActive}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">dalam proses</p>
                </CardContent>
              </Card>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Menu Status */}
              <Card>
                <div className="border-b border-gray-200 p-6 pb-4 mb-4">
                  <h2 className="font-bold text-gray-900">Status Menu</h2>
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div>
                      <p className="font-medium text-green-900">Disetujui</p>
                      <p className="text-xs text-green-800">
                        {stats.menuSelesai} menu
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.menuSelesai}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div>
                      <p className="font-medium text-blue-900">Dalam Proses</p>
                      <p className="text-xs text-blue-800">
                        {stats.menuProses} menu
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.menuProses}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <div>
                      <p className="font-medium text-red-900">Ditolak</p>
                      <p className="text-xs text-red-800">
                        {stats.menuTolak} menu
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.menuTolak}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <div className="border-b border-gray-200 p-6 pb-4 mb-4">
                  <h2 className="font-bold text-gray-900">
                    Menu Khusus & Deadline
                  </h2>
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <p className="font-medium text-purple-900">
                      Menu Khusus Aktif
                    </p>
                    <p className="text-2xl font-bold text-purple-600 mt-2">
                      {stats.totalMenuKhusus}
                    </p>
                    <p className="text-xs text-purple-800 mt-1">
                      paket untuk kebutuhan khusus
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <p className="font-medium text-yellow-900">
                      Deadline Menu Minggu Depan
                    </p>
                    <p className="text-lg font-bold text-yellow-600 mt-2">
                      {new Date(stats.deadline).toLocaleDateString("id-ID")}
                    </p>
                    <p className="text-xs text-yellow-800 mt-1">
                      Persiapan menu harus selesai
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="border-b border-gray-200 p-6 pb-4 mb-4">
                <h2 className="font-bold text-gray-900">Aktivitas Terbaru</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                {[
                  {
                    label: "Menu Minggu 1 disetujui",
                    time: "2 jam yang lalu",
                    status: "success",
                  },
                  {
                    label: "PO-20250106-5432 dibuat",
                    time: "5 jam yang lalu",
                    status: "info",
                  },
                  {
                    label: "Menu Khusus Ibu Hamil ditambahkan",
                    time: "1 hari yang lalu",
                    status: "success",
                  },
                  {
                    label: "Menu Minggu 2 ditolak",
                    time: "2 hari yang lalu",
                    status: "warning",
                  },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        activity.status === "success"
                          ? "bg-green-600"
                          : activity.status === "warning"
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.label}
                      </p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-blue-900 font-bold mb-3">
                Tips Pengelolaan Menu
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>
                  • Selalu lengkapi verifikasi menu sebelum mengajukan
                  persetujuan
                </li>
                <li>
                  • Gunakan Kalkulator Gizi untuk memastikan menu memenuhi
                  standar
                </li>
                <li>
                  • Tambahkan menu khusus untuk kebutuhan nutrisi spesifik
                  penerima
                </li>
                <li>
                  • Generate PO setelah menu disetujui untuk meminimalkan
                  perubahan
                </li>
                <li>
                  • Simpan catatan untuk setiap persetujuan atau penolakan menu
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-blue-900 font-bold mb-3">Panduan Sistem</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Menu mingguan harus selesai di hari Kamis-Jumat</li>
            <li>• Setiap menu item harus memiliki komposisi gizi lengkap</li>
            <li>• Menu khusus dapat dibuat dengan penerima berbeda</li>
            <li>• PO dapat di-generate otomatis atau disesuaikan manual</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
