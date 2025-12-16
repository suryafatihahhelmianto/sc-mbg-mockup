"use client";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUtensils,
  FaUsers,
  FaClipboardCheck,
  FaCalculator,
  FaEdit,
  FaBell,
  FaInfoCircle,
  FaClipboardList,
  FaLightbulb,
  FaBook,
  FaClock,
  FaShoppingCart,
  FaUserMd,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBoxOpen,
  FaRegCalendarCheck,
  FaShieldAlt,
  FaBalanceScale,
  FaPaperPlane,
  FaCalendarDay,
} from "react-icons/fa";
import { Card, CardContent } from "../../components/dapur/card";

export default function DapurPage() {
  const stats = {
    totalMenu: 4,
    menuSelesai: 2,
    menuProses: 1,
    menuTolak: 1,
    totalPenerima: 150,
    totalPenerimaKhusus: 12,
    bahanDiajukan: 2,
    deadline: "Jumat, 10 Jan 2025", // Deadline Jumat minggu depan
  };

  const menuHariIni = {
    name: "Nasi + Ayam Teriyaki + Sayur Bayam",
    totalRecipients: 150,
    specialRecipients: 12,
    nutritionComplete: true,
    bahanTerkirim: true,
  };

  const weekPreview = [
    { day: "Sen", menu: "Nasi Ayam + Sayur", status: "approved" },
    { day: "Sel", menu: "Bubur Sayur", status: "approved" },
    { day: "Rab", menu: "Nasi Goreng + Telur", status: "pending" },
    { day: "Kam", menu: "Sup Sayur + Daging", status: "draft" },
    { day: "Jum", menu: "Pasta Sayur", status: "draft" },
    { day: "Sab", menu: "Nasi + Ayam", status: "draft" },
    { day: "Min", menu: "Snack Buah", status: "draft" },
  ];

  const missionTasks = [
    {
      id: 1,
      title: "Buat Master Menu Minggu Depan",
      deadline: "Kamis, 9 Jan 2025",
      status: "pending",
      priority: "high",
      icon: <FaCalendarAlt className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Verifikasi Nilai Gizi Menu",
      deadline: "Kamis, 9 Jan 2025",
      status: "in-progress",
      priority: "high",
      icon: <FaCalculator className="text-purple-500" />,
    },
    {
      id: 3,
      title: "Ajukan Bahan untuk Menu Minggu Depan",
      deadline: "Jumat, 10 Jan 2025",
      status: "pending",
      priority: "high",
      icon: <FaPaperPlane className="text-green-500" />,
    },
    {
      id: 4,
      title: "Atur Menu Khusus untuk 12 Penerima",
      deadline: "Rabu, 8 Jan 2025",
      status: "completed",
      priority: "medium",
      icon: <FaUserMd className="text-amber-500" />,
    },
  ];

  const quickActions = [
    {
      icon: <FaCalendarAlt />,
      label: "Buat Master Menu",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      link: "/dapur/menu",
    },
    {
      icon: <FaCalculator />,
      label: "Analisis Gizi",
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      link: "/dapur/nutrition-calc",
    },
    {
      icon: <FaPaperPlane />,
      label: "Ajukan Bahan",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      link: "/dapur/ajukan-bahan",
    },
    {
      icon: <FaUserMd />,
      label: "Penerima Khusus",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      link: "/dapur/penerima-khusus",
    },
  ];

  const alerts = [
    {
      id: 1,
      message: "Master menu minggu depan harus selesai sebelum Kamis",
      type: "warning",
      time: "2 hari tersisa",
    },
    {
      id: 2,
      message: "Menu Rabu belum diverifikasi gizi",
      type: "error",
      time: "Perlu segera",
    },
    {
      id: 3,
      message: "Bahan untuk 12 penerima khusus perlu dipastikan",
      type: "info",
      time: "Sampai Rabu",
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard MBG Dapur
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2 text-sm">
              <FaBoxOpen className="text-blue-500" />
              Manajemen Makanan Bergizi Harian
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.link}
                className={`flex items-center gap-2 px-3 py-2 ${action.color} text-white rounded-lg shadow hover:shadow-md transition-all duration-200`}
              >
                {action.icon}
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mission Tasks - Compact Section */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaCalendarDay className="text-blue-500" />
                Tugas Aktif
              </h2>
              <div className="text-sm text-gray-500">
                Deadline:{" "}
                <span className="font-semibold text-red-600">
                  {stats.deadline}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {missionTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border ${
                    task.status === "completed"
                      ? "bg-emerald-50 border-emerald-200"
                      : task.status === "in-progress"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{task.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {task.title}
                          </span>
                          {task.priority === "high" && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              High
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <FaClock className="text-gray-400 text-xs" />
                          <span className="text-xs text-gray-500">
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status === "completed"
                        ? "Selesai"
                        : task.status === "in-progress"
                        ? "Proses"
                        : "Menunggu"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats & Menu Hari Ini - Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Stats Overview */}
          <div className="glass-card p-4 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaUsers className="text-blue-500" />
              Statistik
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Penerima</p>
                  <p className="text-xl font-bold">{stats.totalPenerima}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaUsers className="text-blue-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Penerima Khusus</p>
                  <p className="text-xl font-bold">
                    {stats.totalPenerimaKhusus}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUserMd className="text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Menu Aktif</p>
                  <p className="text-xl font-bold">{stats.totalMenu}</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaUtensils className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Menu Hari Ini */}
          <div className="glass-card p-4 rounded-xl lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaRegCalendarCheck className="text-emerald-500" />
                Menu MBG Hari Ini
              </h3>
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                {menuHariIni.name}
              </h4>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold">{menuHariIni.totalRecipients}</p>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Khusus</p>
                    <p className="font-bold text-purple-600">
                      {menuHariIni.specialRecipients}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {menuHariIni.nutritionComplete ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      <FaCheckCircle /> Gizi OK
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                      <FaExclamationTriangle /> Perlu Gizi
                    </span>
                  )}

                  {menuHariIni.bahanTerkirim ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      <FaCheckCircle /> Bahan OK
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      Menunggu
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/dapur/menu"
                  className="flex-1 text-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Menu
                </Link>
                <Link
                  to="/dapur/nutrition-calc"
                  className="flex-1 text-center px-3 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Lihat Gizi
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Preview & Alerts - Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weekly Preview */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Rencana Minggu Ini
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Duplikat Minggu Lalu
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                <div
                  key={idx}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
              {weekPreview.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                    day.status === "approved"
                      ? "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                      : day.status === "pending"
                      ? "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  title={day.menu}
                >
                  <p className="text-xs font-semibold">{day.day}</p>
                  <p className="text-[10px] text-gray-600 truncate">
                    {day.menu.split(" ")[0]}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Klik hari untuk edit menu dan atur penerima khusus
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaBell className="text-amber-500" />
                Peringatan & Alert
              </h3>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                {alerts.length} alerts
              </span>
            </div>

            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.type === "warning"
                      ? "bg-amber-50 border-amber-200"
                      : alert.type === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {alert.type === "warning" ? (
                      <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
                    ) : alert.type === "error" ? (
                      <FaShieldAlt className="text-red-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FaBook className="text-blue-500" />
                Akses Cepat
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/dapur/menu"
                  className="p-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center text-xs font-medium"
                >
                  Master Menu
                </Link>
                <Link
                  to="/dapur/nutrition-calc"
                  className="p-2 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center text-xs font-medium"
                >
                  Analisis Gizi
                </Link>
                <Link
                  to="/dapur/ajukan-bahan"
                  className="p-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center text-xs font-medium"
                >
                  Ajukan Bahan
                </Link>
                <Link
                  to="/dapur/penerima-khusus"
                  className="p-2 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-center text-xs font-medium"
                >
                  Penerima Khusus
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Compact */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FaClipboardList className="text-gray-600" />
            Aktivitas Terbaru
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Menu Senin disetujui</p>
                <p className="text-xs text-gray-500">2 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaShoppingCart className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Bahan untuk 12 penerima khusus diajukan
                </p>
                <p className="text-xs text-gray-500">5 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaUserMd className="text-purple-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Penerima khusus ditambahkan
                </p>
                <p className="text-xs text-gray-500">1 hari yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaExclamationTriangle className="text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Menu Rabu ditolak - perlu revisi gizi
                </p>
                <p className="text-xs text-gray-500">2 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section - Compact */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <FaLightbulb className="text-amber-500" />
            Tips MBG
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Master menu minggu depan harus selesai <strong>Kamis</strong>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Ajukan bahan menu paling lambat <strong>Jumat</strong>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Verifikasi gizi sebelum submit master menu
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Pastikan menu khusus sudah disiapkan untuk penerima khusus
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
