"use client";
import { Link } from "react-router-dom";
import {
  FaWarehouse,
  FaEdit,
  FaCalendarAlt,
  FaTruck,
  FaUserCheck,
  FaClipboardList,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaClock,
  FaBoxOpen,
  FaRegCalendarCheck,
  FaShieldAlt,
  FaBalanceScale,
  FaPaperPlane,
  FaCalendarDay,
  FaArrowRight,
  FaShoppingBasket,
  FaHistory,
} from "react-icons/fa";
import { Card, CardContent } from "../../components/dapur/card";

export default function AslapPage() {
  const stats = {
    totalStock: 45,
    stockExpiredSoon: 3,
    pendingRequests: 5,
    completedDeliveries: 12,
    totalRecipients: 150,
  };

  const stockAlerts = [
    {
      id: 1,
      item: "Beras Premium",
      quantity: 50,
      unit: "kg",
      expiryDate: "2025-01-20",
      status: "expiring-soon",
      deadlineArrival: "Senin",
    },
    {
      id: 2,
      item: "Minyak Goreng",
      quantity: 25,
      unit: "liter",
      expiryDate: "2025-02-15",
      status: "good",
      deadlineArrival: null,
    },
    {
      id: 3,
      item: "Gula Pasir",
      quantity: 10,
      unit: "kg",
      expiryDate: "2025-01-25",
      status: "expiring-soon",
      deadlineArrival: "Rabu",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      type: "delivery",
      description: "Pengiriman menu siang ke Penerima Manfaat A",
      requester: "Dapur",
      time: "2 jam yang lalu",
      status: "pending",
    },
    {
      id: 2,
      type: "pickup",
      description: "Pengambilan ompreng oleh PJ Penerima B",
      requester: "PJ Penerima",
      time: "4 jam yang lalu",
      status: "pending",
    },
    {
      id: 3,
      type: "delivery",
      description: "Pengiriman menu malam ke Penerima Manfaat C",
      requester: "Dapur",
      time: "6 jam yang lalu",
      status: "completed",
    },
  ];

  const aslapFeatures = [
    {
      icon: <FaWarehouse className="text-white" />,
      title: "Periksa Stock",
      description: "Lihat ketersediaan bahan dan status stock",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      link: "/aslap/stock-check",
    },
    {
      icon: <FaEdit className="text-white" />,
      title: "Update Stock Masuk",
      description: "Update ketersediaan saat bahan baru masuk",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      link: "/aslap/stock-update",
    },
    {
      icon: <FaCalendarAlt className="text-white" />,
      title: "Set Tanggal Kadaluarsa",
      description: "Isi tanggal kadaluarsa sesuai kemasan",
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      link: "/aslap/expiry-set",
    },
    {
      icon: <FaTruck className="text-white" />,
      title: "Terima Request Pengiriman",
      description: "Proses pengiriman menu dari dapur ke penerima",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      link: "/aslap/delivery-request",
    },
    {
      icon: <FaUserCheck className="text-white" />,
      title: "Terima Request Pengambilan",
      description: "Proses pengambilan ompreng oleh PJ penerima",
      color: "bg-gradient-to-r from-teal-500 to-blue-500",
      link: "/aslap/pickup-request",
    },
  ];

  // Tugas Aktif yang lebih simpel tapi tetap hidup
  const dailyMissions = [
    {
      id: 1,
      title: "Kirim Menu Harian",
      description: "Kirim ke 150 penerima sebelum jam 08:00",
      deadline: "08:00",
      status: "ongoing",
      icon: <FaTruck className="text-white" />,
      iconBg: "bg-gradient-to-r from-orange-500 to-red-500",
      link: "/aslap/delivery-request",
      progress: 85,
      total: 150,
      done: 128,
    },
    {
      id: 2,
      title: "Siapkan Stock Besok",
      description: "Cek & siapkan bahan untuk menu Selasa",
      deadline: "Hari ini",
      status: "pending",
      icon: <FaWarehouse className="text-white" />,
      iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
      link: "/aslap/stock-check",
      progress: 40,
      total: 25,
      done: 10,
    },
    {
      id: 3,
      title: "Ambil Ompreng dari PJ",
      description: "Jadwal ambil ompreng kosong sore ini",
      deadline: "16:00",
      status: "pending",
      icon: <FaShoppingBasket className="text-white" />,
      iconBg: "bg-gradient-to-r from-teal-500 to-emerald-500",
      link: "/aslap/pickup-request",
      progress: 0,
      total: 12,
      done: 0,
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard Aslap
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2 text-sm">
              <FaBoxOpen className="text-blue-500" />
              Manajemen Bahan & Distribusi
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {aslapFeatures.slice(0, 3).map((feature, idx) => (
              <Link
                key={idx}
                to={feature.link}
                className={`flex items-center gap-2 px-3 py-2 ${feature.color} text-white rounded-lg shadow hover:shadow-md transition-all duration-200`}
              >
                {feature.icon}
                <span className="text-sm font-medium">{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tugas Aktif - SIMPLE tapi hidup */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />
              Tugas Aktif Hari Ini
            </h2>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <FaClock />
              <span>
                Update:{" "}
                {new Date().toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dailyMissions.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg border p-3 hover:shadow-md transition-shadow ${
                  task.status === "ongoing"
                    ? "border-l-4 border-l-orange-400"
                    : "border-l-4 border-l-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${task.iconBg}`}>
                    {task.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{task.title}</h3>
                        <p className="text-xs text-gray-600">
                          {task.description}
                        </p>
                      </div>

                      <div
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          task.status === "ongoing"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status === "ongoing" ? "Berjalan" : "Menunggu"}
                      </div>
                    </div>

                    {/* Simple Progress Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          {task.done}/{task.total} selesai
                        </span>
                        <span className="font-bold">{task.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            task.status === "ongoing"
                              ? "bg-gradient-to-r from-orange-400 to-red-400"
                              : "bg-gradient-to-r from-blue-400 to-cyan-400"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Deadline & Button */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs">
                        <FaClock className="text-gray-400" />
                        <span className="text-gray-700">
                          Deadline: {task.deadline}
                        </span>
                      </div>

                      <Link
                        to={task.link}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                          task.status === "ongoing"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow"
                            : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                        } transition-all`}
                      >
                        {task.status === "ongoing" ? "Lanjutkan" : "Kerjakan"}
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Selesai: 0</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Berjalan: 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Menunggu: 2</span>
                </div>
              </div>

              <Link
                to="/aslap/history"
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <FaHistory />
                <span>Lihat Riwayat</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {aslapFeatures.map((feature, idx) => (
            <Link key={idx} to={feature.link}>
              <Card className="glass-card hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-full ${feature.color} flex items-center justify-center text-white`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats & Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Stats Overview */}
          <div className="glass-card p-4 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />
              Ringkasan Aktivitas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Item Stock</p>
                  <p className="text-xl font-bold">{stats.totalStock}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaWarehouse className="text-blue-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Stock Kadaluarsa Segera
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {stats.stockExpiredSoon}
                  </p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <FaExclamationTriangle className="text-amber-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Request Pending</p>
                  <p className="text-xl font-bold">{stats.pendingRequests}</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaClock className="text-orange-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pengiriman Selesai</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.completedDeliveries}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="glass-card p-4 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaExclamationTriangle className="text-amber-500" />
              Alert Stock Kadaluarsa
            </h3>
            <div className="space-y-2">
              {stockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.status === "expiring-soon"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{alert.item}</p>
                      <p className="text-sm text-gray-600">
                        {alert.quantity} {alert.unit} • Kadaluarsa:{" "}
                        {new Date(alert.expiryDate).toLocaleDateString("id-ID")}
                      </p>
                      {alert.deadlineArrival && (
                        <p className="text-sm text-blue-600">
                          Deadline Kedatangan: {alert.deadlineArrival}
                        </p>
                      )}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        alert.status === "expiring-soon"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {alert.status === "expiring-soon" ? "Segera" : "Baik"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FaPaperPlane className="text-blue-500" />
            Request Pending
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className={`p-3 rounded-lg border ${
                  request.status === "pending"
                    ? "bg-orange-50 border-orange-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {request.type === "delivery" ? (
                    <FaTruck className="text-orange-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <FaUserCheck className="text-teal-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {request.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      Oleh: {request.requester}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      request.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {request.status === "pending" ? "Pending" : "Selesai"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FaClipboardList className="text-gray-600" />
            Aktivitas Terbaru
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Stock beras premium diperbarui
                </p>
                <p className="text-xs text-gray-500">1 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaTruck className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Pengiriman menu siang selesai
                </p>
                <p className="text-xs text-gray-500">3 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCalendarAlt className="text-purple-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Tanggal kadaluarsa minyak goreng diset
                </p>
                <p className="text-xs text-gray-500">5 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaUserCheck className="text-teal-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  Request pengambilan ompreng diproses
                </p>
                <p className="text-xs text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <FaLightbulb className="text-amber-500" />
            Tips Aslap
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Selalu periksa tanggal kadaluarsa sebelum distribusi
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Update stock secara real-time saat bahan masuk
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Prioritaskan request pengiriman dari dapur
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
              Verifikasi identitas PJ sebelum memberikan ompreng
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
