"use client";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaPhone,
  FaCheckCircle,
  FaClock,
  FaSchool,
  FaUsers,
  FaArrowRight,
  FaListAlt,
  FaExclamationCircle,
} from "react-icons/fa";

export default function PenerimaManfaatPage() {
  // STATUS OMPRENG SEKOLAH (SATU SEKOLAH)
  const omprengStatus = {
    status: "pending", // pending, on-process, completed
    lastPickup: "Kemarin, 14:30",
    nextSchedule: "Hari ini, 15:00",
    notes: "Ditunggu di dekat post satpam",
    urgency: "medium",
  };

  // DATA PER KELAS HANYA UNTUK FEEDBACK
  const kelasData = [
    {
      id: 1,
      className: "Kelas 1A",
      waliKelas: "Ibu Siti",
      totalSiswa: 25,
      feedbackCollected: 15,
      deadline: "Besok, 10:00",
      priority: "high",
    },
    {
      id: 2,
      className: "Kelas 2B",
      waliKelas: "Pak Budi",
      totalSiswa: 28,
      feedbackCollected: 5,
      deadline: "Jumat ini",
      priority: "high",
    },
    {
      id: 3,
      className: "Kelas 3C",
      waliKelas: "Ibu Dewi",
      totalSiswa: 27,
      feedbackCollected: 20,
      deadline: "Hari ini",
      priority: "medium",
    },
    {
      id: 4,
      className: "Kelas 4-6",
      waliKelas: "Tim Guru",
      totalSiswa: 70,
      feedbackCollected: 0,
      deadline: "Minggu depan",
      priority: "low",
    },
  ];

  // STATISTIK
  const stats = {
    totalSiswa: 150,
    feedbackTerkumpul: 40,
    feedbackPending: 110,
    omprengStatus: omprengStatus.status,
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* HEADER DENGAN 2 TOMBOL */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              SD Negeri 09 Bogor
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2 text-sm">
              <FaSchool className="text-blue-500" />
              Manajemen Feedback & Ompreng Sekolah
            </p>
          </div>

          {/* TOMBOL AKSI UTAMA */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Link
              to="/penerima-manfaat/feedback"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow hover:shadow-md transition-all flex-1 sm:flex-none"
            >
              <FaComments />
              <span className="font-medium">Kumpulkan Feedback</span>
            </Link>

            <Link
              to="/penerima-manfaat/call-sppg"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow hover:shadow-md transition-all flex-1 sm:flex-none"
            >
              <FaPhone />
              <span className="font-medium">Panggil SPPG</span>
            </Link>
          </div>
        </div>

        {/* STATS & OMPRENG STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* STATS */}
          <div className="md:col-span-2 grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold mt-1">{stats.totalSiswa}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Feedback</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.feedbackTerkumpul}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.feedbackPending} pending
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Status Ompreng</p>
              <div
                className={`text-lg font-bold mt-1 ${
                  stats.omprengStatus === "completed"
                    ? "text-green-600"
                    : stats.omprengStatus === "on-process"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {stats.omprengStatus === "completed"
                  ? "Diambil"
                  : stats.omprengStatus === "on-process"
                  ? "Proses"
                  : "Menunggu"}
              </div>
            </div>
          </div>

          {/* CARD OMPRENG SEKOLAH */}
          <div
            className={`p-4 rounded-xl border ${
              omprengStatus.urgency === "high"
                ? "bg-red-50 border-red-200"
                : omprengStatus.urgency === "medium"
                ? "bg-orange-50 border-orange-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaPhone
                className={
                  omprengStatus.urgency === "high"
                    ? "text-red-500"
                    : omprengStatus.urgency === "medium"
                    ? "text-orange-500"
                    : "text-green-500"
                }
              />
              <h3 className="font-bold">Jadwal Pengambilan Ompreng</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Terakhir:</span>
                <span className="font-medium">{omprengStatus.lastPickup}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Jadwal:</span>
                <span
                  className={`font-medium ${
                    omprengStatus.urgency === "high"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {omprengStatus.nextSchedule}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {omprengStatus.notes}
              </p>
            </div>
          </div>
        </div>

        {/* TASK FEEDBACK PER KELAS */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaListAlt className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Feedback per Kelas</h2>
                  <p className="text-sm text-gray-600">
                    Kumpulkan feedback dari wali kelas
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                Deadline utama: Besok, 10:00
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {kelasData.map((kelas) => {
              const progress = Math.round(
                (kelas.feedbackCollected / kelas.totalSiswa) * 100
              );

              return (
                <div key={kelas.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* INFO KELAS */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 p-2 rounded-full ${
                            kelas.priority === "high"
                              ? "bg-red-100"
                              : kelas.priority === "medium"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <FaUsers
                            className={
                              kelas.priority === "high"
                                ? "text-red-600"
                                : kelas.priority === "medium"
                                ? "text-yellow-600"
                                : "text-gray-600"
                            }
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">
                              {kelas.className}
                            </h3>
                            {kelas.priority === "high" && (
                              <FaExclamationCircle className="text-red-500 text-sm" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {kelas.waliKelas} • {kelas.totalSiswa} siswa
                          </p>

                          {/* PROGRESS BAR */}
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <div className="flex items-center gap-2">
                                <FaComments className="text-green-500 text-sm" />
                                <span>
                                  {kelas.feedbackCollected}/{kelas.totalSiswa}{" "}
                                  feedback
                                </span>
                              </div>
                              <span className="font-semibold">{progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  progress > 70
                                    ? "bg-gradient-to-r from-green-400 to-green-500"
                                    : progress > 30
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                    : "bg-gradient-to-r from-red-400 to-red-500"
                                }`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTION SECTION */}
                    <div className="flex flex-col items-end gap-3 min-w-[160px]">
                      {/* DEADLINE */}
                      <div className="flex items-center gap-1 text-sm">
                        <FaClock className="text-gray-400" />
                        <span className="text-gray-700">{kelas.deadline}</span>
                      </div>

                      {/* ACTION BUTTON */}
                      <Link
                        to={`/penerima-manfaat/feedback/${kelas.id}`}
                        className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 ${
                          kelas.priority === "high"
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        <FaArrowRight className="text-xs" />
                        <span>Kumpulkan Feedback</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PANGGIL SPPG */}
          <div
            className={`p-4 rounded-xl border ${
              omprengStatus.urgency === "high"
                ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <FaPhone
                  className={
                    omprengStatus.urgency === "high"
                      ? "text-red-500"
                      : "text-blue-500"
                  }
                />
                Aksi Ompreng Sekolah
              </h3>
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  omprengStatus.urgency === "high"
                    ? "bg-red-100 text-red-700"
                    : omprengStatus.urgency === "medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {omprengStatus.urgency === "high"
                  ? "Urgent"
                  : omprengStatus.urgency === "medium"
                  ? "Hari ini"
                  : "Terkendali"}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status saat ini:</span>
                <span className="font-medium">
                  {omprengStatus.status === "pending"
                    ? "Menunggu"
                    : omprengStatus.status === "on-process"
                    ? "Dijemput"
                    : "Diambil"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Jadwal pengambilan:</span>
                <span className="font-medium text-blue-600">
                  {omprengStatus.nextSchedule}
                </span>
              </div>

              <Link
                to="/penerima-manfaat/call-sppg"
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  omprengStatus.urgency === "high"
                    ? "bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg text-white"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg text-white"
                }`}
              >
                <FaPhone />
                <span>
                  {omprengStatus.urgency === "high"
                    ? "Panggil SPPG Sekarang"
                    : "Jadwalkan Pengambilan"}
                </span>
              </Link>
            </div>
          </div>

          {/* QUICK TIPS */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Panduan Cepat
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <div className="mt-0.5">•</div>
                <span>
                  Ompreng diambil langsung untuk semua kelas sekaligus
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5">•</div>
                <span>Panggil SPPG minimal 1 jam sebelum jadwal</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5">•</div>
                <span>Feedback dikumpulkan per kelas via wali kelas</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5">•</div>
                <span>Konfirmasi ke bendahara sekolah setelah pickup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
