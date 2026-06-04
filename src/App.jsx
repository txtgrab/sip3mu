import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

// --- Import Komponen Asli ---
import PersetujuanAnggota from "./components/PersetujuanAnggota";

// --- Halaman Dosen ---
import Penelitian from "./pages/Penelitian/Penelitian";
import Pengabdian from "./pages/Pengabdian/Pengabdian";
import Publikasi from "./pages/Publikasi/Publikasi";
import PendanaanLain from "./pages/PendanaanLain/PendanaanLain";
import KekayaanIntelektual from "./pages/KekayaanIntelektual/KekayaanIntelektual";

// --- Halaman Reviewer ---
import EvaluasiProposal from "./pages/EvaluasiProposal/EvaluasiProposal";
import PenilaianPemaparan from "./pages/PenilaianPemaparan/PenilaianPemaparan";
import Monev from "./pages/Monev/Monev";

// --- Halaman Operator ---
import ValidasiAdministratif from "./pages/ValidasiAdministratif/ValidasiAdministratif";
import PenugasanReview from "./pages/PenugasanReview/PenugasanReview";
import PenetapanUsulan from "./pages/PenetapanUsulan/PenetapanUsulan";
import ValidasiLaporanAkhir from "./pages/ValidasiLaporanAkhir/ValidasiLaporanAkhir";
import ValidasiLuaranNonHibah from "./pages/ValidasiLuaranNonHibah/ValidasiLuaranNonHibah";
import ManajemenPeriode from "./pages/ManajemenPeriode/ManajemenPeriode";

// --- Halaman Pimpinan ---
import Monitoring from "./pages/Monitoring/Monitoring";
import ApprovalPimpinan from "./pages/ApprovalPimpinan/ApprovalPimpinan";

// --- Halaman Admin ---
import KelolaSistem from "./pages/KelolaSistem/KelolaSistem";

// ==========================================
// DUMMY COMPONENTS SEMENTARA
// ==========================================
const IsiBiodata = () => (
  <div
    style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px" }}
  >
    <h2 style={{ color: "#1a1a2e" }}>Isi Biodata Penelitian</h2>
    <p>Halaman ini sedang dalam tahap pengembangan...</p>
  </div>
);
// ==========================================

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

          {/* Routes Dosen Tambahan */}
          <Route path="/isi-biodata" element={<IsiBiodata />} />

          {/* Ini rute yang diupdate, sekarang mengarah ke komponen asli dari file PersetujuanAnggota.jsx */}
          <Route path="/persetujuan-anggota" element={<PersetujuanAnggota />} />

          {/* Routes Reviewer */}
          <Route path="/evaluasi-proposal" element={<EvaluasiProposal />} />
          <Route path="/penilaian-pemaparan" element={<PenilaianPemaparan />} />
          <Route path="/monev" element={<Monev />} />

          {/* Routes Operator */}
          <Route
            path="/validasi-administratif"
            element={<ValidasiAdministratif />}
          />
          <Route path="/penugasan-review" element={<PenugasanReview />} />
          <Route path="/penetapan-usulan" element={<PenetapanUsulan />} />
          <Route
            path="/validasi-laporan-akhir"
            element={<ValidasiLaporanAkhir />}
          />
          <Route
            path="/validasi-luaran-non-hibah"
            element={<ValidasiLuaranNonHibah />}
          />
          {/* Routes Operator */}
          <Route path="/manajemen-periode" element={<ManajemenPeriode />} />
          <Route
            path="/validasi-administratif"
            element={<ValidasiAdministratif />}
          />
          {/* Routes Pimpinan */}
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/approval-pimpinan" element={<ApprovalPimpinan />} />

          {/* Routes Admin */}
          <Route path="/kelola-sistem" element={<KelolaSistem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
