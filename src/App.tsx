"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MainContent from "./components/MainContent";
import BahanBakuPage from "./pages/BahanBakuPage";
import ProduksiPage from "./pages/ProduksiPage";
import DistribusiPage from "./pages/DistribusiPage";
import PenggunaPage from "./pages/PenggunaPage";
import LaporanPage from "./pages/LaporanPage";
import PengaturanPage from "./pages/PengaturanPage";
// Dapur
import DapurPage from "./pages/dapur/page";
import DapurMenu from "./pages/dapur/menu/page";
import DapurMenuKhusus from "./pages/dapur/menu-khusus/page";
import DapurNutritionCalc from "./pages/dapur/nutrition-calc/page";
import DapurPO from "./pages/dapur/po/page";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <Routes>
            {/* DAPUR */}
            <Route path="/dapur" element={<DapurPage />} />
            <Route path="/dapur/menu" element={<DapurMenu />} />
            <Route path="/dapur/menu-khusus" element={<DapurMenuKhusus />} />
            <Route
              path="/dapur/nutrition-calc"
              element={<DapurNutritionCalc />}
            />
            <Route path="/dapur/po" element={<DapurPO />} />
            <Route path="/" element={<MainContent />} />
            <Route path="/bahan-baku" element={<BahanBakuPage />} />
            <Route path="/produksi" element={<ProduksiPage />} />
            <Route path="/distribusi" element={<DistribusiPage />} />
            <Route path="/pengguna" element={<PenggunaPage />} />
            <Route path="/laporan" element={<LaporanPage />} />
            <Route path="/pengaturan" element={<PengaturanPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
