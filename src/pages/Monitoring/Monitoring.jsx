import { useState } from "react";

export default function Monitoring() {
  // State untuk filter data
  const [filterTahun, setFilterTahun] = useState("2026");
  const [filterSkema, setFilterSkema] = useState("Semua");

  // Data Dummy untuk Kartu Ringkasan (KPI)
  const summaryData = {
    totalUsulan: 124,
    totalDana: "Rp 3.250.000.000",
    totalPublikasi: 45,
    totalHaki: 12,
  };

  // Data Dummy untuk Grafik Sederhana (Kinerja per Skema/Prodi)
  const chartData = [
    { label: "Penelitian Dasar", value: 80, color: "#3b82f6" },
    { label: "Penelitian Terapan", value: 65, color: "#10b981" },
    { label: "Pengabdian Internal", value: 45, color: "#f59e0b" },
    { label: "Hibah Eksternal", value: 30, color: "#8b5cf6" },
  ];

  // Data Dummy Tabel Detail Usulan
  const [usulanList] = useState([
    {
      id: "PRP-2026-001",
      judul:
        "Rancang Bangun Sistem Informasi Manajemen Penelitian dan Pengabdian Universitas Diponegoro Berbasis Microservice dengan Orkestrasi Layanan",
      ketua: "Carlos Abram Sirait",
      skema: "Penelitian Terapan",
      status: "Sedang Berjalan",
      luaran: "1 Jurnal Internasional (Draft)",
    },
    {
      id: "PRP-2026-002",
      judul: "Pemberdayaan UMKM Batik melalui Pelatihan Digital Marketing",
      ketua: "Siti Aminah, M.Kom",
      skema: "Pengabdian Internal",
      status: "Selesai",
      luaran: "1 HAKI, 1 Berita Massa",
    },
    {
      id: "PRP-2026-003",
      judul: "Analisis Sentimen Pengguna Media Sosial terhadap Layanan Publik",
      ketua: "Dr. Budi Santoso",
      skema: "Penelitian Dasar",
      status: "Monev (Perbaikan)",
      luaran: "-",
    },
  ]);

  const handleExport = (format) => {
    alert(
      `Rekap laporan sedang diproses dan akan diunduh dalam format ${format}.`,
    );
  };

  return (
    <div>
      {/* HEADER & EXPORT BUTTONS */}
      <div style={styles.headerContainer}>
        <div>
          <h2 style={{ margin: 0, color: "#1a1a2e" }}>
            Dashboard Monitoring Pimpinan
          </h2>
          <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "14px" }}>
            Pantau ringkasan kegiatan, kinerja luaran, dan status usulan secara
            real-time.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={styles.btnExportPdf}
            onClick={() => handleExport("PDF")}
          >
            📄 Unduh Rekap PDF
          </button>
          <button
            style={styles.btnExportExcel}
            onClick={() => handleExport("Excel")}
          >
            📊 Unduh Rekap Excel
          </button>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div style={styles.filterCard}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Tahun Akademik</label>
          <select
            style={styles.filterSelect}
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
          >
            <option value="2026">2026 / Genap</option>
            <option value="2025">2025 / Ganjil</option>
            <option value="2024">2024 / Genap</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Skema Hibah</label>
          <select
            style={styles.filterSelect}
            value={filterSkema}
            onChange={(e) => setFilterSkema(e.target.value)}
          >
            <option value="Semua">-- Semua Skema --</option>
            <option value="Penelitian Dasar">Penelitian Dasar</option>
            <option value="Penelitian Terapan">Penelitian Terapan</option>
            <option value="Pengabdian">Pengabdian Kepada Masyarakat</option>
          </select>
        </div>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div style={styles.kpiGrid}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiTitle}>Total Usulan Masuk</div>
          <div style={{ ...styles.kpiValue, color: "#3b82f6" }}>
            {summaryData.totalUsulan}
          </div>
          <div style={styles.kpiSub}>Proposal pada tahun {filterTahun}</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiTitle}>Estimasi Dana Disetujui</div>
          <div style={{ ...styles.kpiValue, color: "#10b981" }}>
            {summaryData.totalDana}
          </div>
          <div style={styles.kpiSub}>Telah dicairkan ke peneliti</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiTitle}>Publikasi Ilmiah</div>
          <div style={{ ...styles.kpiValue, color: "#f59e0b" }}>
            {summaryData.totalPublikasi}
          </div>
          <div style={styles.kpiSub}>Jurnal & Prosiding tervalidasi</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiTitle}>Kekayaan Intelektual</div>
          <div style={{ ...styles.kpiValue, color: "#8b5cf6" }}>
            {summaryData.totalHaki}
          </div>
          <div style={styles.kpiSub}>Paten, Hak Cipta, dll.</div>
        </div>
      </div>

      {/* CHART & DETAILS GRID */}
      <div style={styles.mainGrid}>
        {/* CHART SECTION */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Tren Distribusi Usulan per Skema</h4>
          <div style={styles.chartContainer}>
            {chartData.map((data, index) => (
              <div key={index} style={styles.chartBarWrapper}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {data.value}
                </div>
                {/* Visualisasi Bar Chart menggunakan CSS */}
                <div
                  style={{
                    ...styles.chartBar,
                    height: `${data.value}%`,
                    backgroundColor: data.color,
                  }}
                ></div>
                <div style={styles.chartLabel}>{data.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE SECTION */}
        <div style={{ ...styles.card, gridColumn: "span 2" }}>
          <h4 style={styles.cardTitle}>Detail Usulan Kegiatan</h4>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID Usulan</th>
                  <th style={styles.th}>Judul Usulan</th>
                  <th style={styles.th}>Ketua Pelaksana</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Capaian Luaran</th>
                </tr>
              </thead>
              <tbody>
                {usulanList.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{item.id}</strong>
                    </td>
                    <td style={styles.td}>{item.judul}</td>
                    <td style={styles.td}>{item.ketua}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          item.status === "Selesai"
                            ? styles.badgeSuccess
                            : item.status === "Sedang Berjalan"
                              ? styles.badgeInfo
                              : styles.badgeWarning
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>{item.luaran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// === STYLES ===
const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },

  // Filters
  filterCard: {
    backgroundColor: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    alignItems: "center",
  },
  filterGroup: { display: "flex", alignItems: "center", gap: "10px" },
  filterLabel: { fontSize: "13px", fontWeight: "bold", color: "#475569" },
  filterSelect: {
    padding: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
    minWidth: "150px",
  },

  // KPI Cards
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  kpiCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  kpiTitle: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  kpiValue: { fontSize: "28px", fontWeight: "900", marginBottom: "5px" },
  kpiSub: { fontSize: "11px", color: "#94a3b8" },

  // Main Layout
  mainGrid: { display: "grid", gridTemplateColumns: "1fr", gap: "20px" },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#1a1a2e",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },

  // CSS Bar Chart
  chartContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "200px",
    paddingBottom: "10px",
    borderBottom: "1px dashed #e2e8f0",
  },
  chartBarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    width: "60px",
  },
  chartBar: {
    width: "40px",
    borderRadius: "4px 4px 0 0",
    transition: "height 0.5s ease-in-out",
  },
  chartLabel: {
    fontSize: "10px",
    color: "#64748b",
    textAlign: "center",
    marginTop: "10px",
    fontWeight: "bold",
  },

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    borderBottom: "2px solid #1a1a2e",
    padding: "12px",
    textAlign: "left",
    color: "#1a1a2e",
    backgroundColor: "#f8fafc",
  },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "12px", verticalAlign: "top" },

  // Badges
  badgeInfo: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  badgeWarning: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  // Buttons
  btnExportPdf: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnExportExcel: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
