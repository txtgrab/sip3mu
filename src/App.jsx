import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Penelitian from "./pages/Penelitian/Penelitian";
import Pengabdian from "./pages/Pengabdian/Pengabdian";
import Publikasi from "./pages/Publikasi/Publikasi";
import PendanaanLain from "./pages/PendanaanLain/PendanaanLain";
import KekayaanIntelektual from "./pages/KekayaanIntelektual/KekayaanIntelektual";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login berdiri sendiri tanpa layout menu */}
        <Route path="/" element={<Login />} />

        {/* Halaman yang menggunakan Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penelitian" element={<Penelitian />} />
          <Route path="/pengabdian" element={<Pengabdian />} />
          <Route path="/publikasi" element={<Publikasi />} /> {/* <-- Ditambahkan */}
          <Route path="/pendanaan-lain" element={<PendanaanLain />} /> {/* <-- Ditambahkan */}
          <Route path="/kekayaan-intelektual" element={<KekayaanIntelektual />} /> {/* <-- Ditambahkan */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;