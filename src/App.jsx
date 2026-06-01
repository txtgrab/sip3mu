import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

// Halaman Dosen (Sudah Ada)
import Penelitian from "./pages/Penelitian/Penelitian";
import Pengabdian from "./pages/Pengabdian/Pengabdian";
import Publikasi from "./pages/Publikasi/Publikasi";
import PendanaanLain from "./pages/PendanaanLain/PendanaanLain";
import KekayaanIntelektual from "./pages/KekayaanIntelektual/KekayaanIntelektual";

// Halaman Aktor Baru
import EvaluasiProposal from "./pages/EvaluasiProposal/EvaluasiProposal";
import Monev from "./pages/Monev/Monev";
import PenugasanReview from "./pages/PenugasanReview/PenugasanReview";
import ValidasiAdministratif from "./pages/ValidasiAdministratif/ValidasiAdministratif";
import KelolaSistem from "./pages/KelolaSistem/KelolaSistem";
import Monitoring from "./pages/Monitoring/Monitoring"; // <-- IMPORT YANG BENAR

import ValidasiLaporanAkhir from "./pages/ValidasiLaporanAkhir/ValidasiLaporanAkhir";
import ValidasiLuaranNonHibah from "./pages/ValidasiLuaranNonHibah/ValidasiLuaranNonHibah";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Routes Dosen */}
          <Route path="/penelitian" element={<Penelitian />} />
          <Route path="/pengabdian" element={<Pengabdian />} />
          <Route path="/publikasi" element={<Publikasi />} />
          <Route path="/pendanaan-lain" element={<PendanaanLain />} />
          <Route
            path="/kekayaan-intelektual"
            element={<KekayaanIntelektual />}
          />

          {/* Routes Reviewer */}
          <Route path="/evaluasi-proposal" element={<EvaluasiProposal />} />
          <Route path="/monev" element={<Monev />} />

          {/* Routes Operator */}
          <Route
            path="/validasi-administratif"
            element={<ValidasiAdministratif />}
          />
          <Route path="/penugasan-review" element={<PenugasanReview />} />
          <Route
            path="/validasi-laporan-akhir"
            element={<ValidasiLaporanAkhir />}
          />
          <Route
            path="/validasi-luaran-non-hibah"
            element={<ValidasiLuaranNonHibah />}
          />

          {/* Routes Pimpinan */}
          <Route path="/monitoring" element={<Monitoring />} />

          {/* Routes Admin */}
          <Route path="/kelola-sistem" element={<KelolaSistem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
