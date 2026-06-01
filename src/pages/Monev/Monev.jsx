import { useState } from "react";

export default function Monev() {
  // State untuk mengontrol tampilan: 'list', 'form' (input monev), atau 'result' (lihat catatan)
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // Data dummy kegiatan yang harus di-monev
  const [monevList] = useState([
    {
      id: "MNV-101",
      judul: "Implementasi Sistem Cerdas pada IoT Pertanian",
      ketua: "Ir. Ahmad Dahlan, M.T",
      progress: "70%",
      status: "Menunggu Kunjungan",
      jadwal: "15 Juni 2026",
      laporanDosen:
        "Modul IoT telah dirakit dan dipasang di lahan uji coba. Saat ini sedang proses pengambilan data awal dan kalibrasi sensor kelembaban tanah. Penyerapan anggaran telah mencapai 65%.",
      fileLaporan: "Laporan_Kemajuan_MNV101.pdf",
    },
    {
      id: "MNV-102",
      judul: "Pelatihan Literasi Digital di Desa Sukamaju",
      ketua: "Dra. Rini Wati",
      progress: "100%",
      status: "Selesai Monev",
      jadwal: "10 Mei 2026",
      laporanDosen:
        "Kegiatan pelatihan telah dilaksanakan sebanyak 4 kali pertemuan tatap muka. Diikuti oleh 50 peserta dari perangkat desa. Modul panduan digital telah dicetak dan didistribusikan.",
      fileLaporan: "Laporan_Kemajuan_MNV102.pdf",
      // Data hasil Monev dari Reviewer
      reviewerCatatan:
        "Berdasarkan kunjungan lapangan tanggal 10 Mei, pelatihan berjalan sangat kondusif. Bukti presensi peserta dan foto kegiatan valid. Target luaran modul tercetak sesuai dengan RAB.",
      reviewerKesesuaian: "Sesuai Target",
      reviewerRekomendasi: "Lanjutkan ke pelaporan akhir",
    },
  ]);

  const handleInputClick = (item) => {
    setSelectedItem(item);
    setView("form");
  };

  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setView("result");
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Catatan Monev berhasil disimpan!");
    setView("list");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Proses Monitoring & Evaluasi (Monev)
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            "Laporan kemajuan dan daftar kegiatan yang perlu Anda evaluasi."}
          {view === "form" && `Form Input Catatan Monev: ${selectedItem?.id}`}
          {view === "result" && `Detail Hasil Monev: ${selectedItem?.id}`}
        </p>
      </div>

      {/* --- TAMPILAN 1: TABEL DAFTAR MONEV --- */}
      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Kegiatan</th>
                <th style={styles.th}>Judul Pelaksanaan</th>
                <th style={styles.th}>Ketua Pelaksana</th>
                <th style={styles.th}>Kemajuan</th>
                <th style={styles.th}>Jadwal Monev</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {monevList.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={styles.td}>{item.judul}</td>
                  <td style={styles.td}>{item.ketua}</td>
                  <td style={styles.td}>
                    <div style={styles.progressBarBg}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: item.progress,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: "11px", color: "#666" }}>
                      {item.progress} Selesai
                    </span>
                  </td>
                  <td style={styles.td}>{item.jadwal}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Menunggu Kunjungan"
                          ? styles.badgeInfo
                          : styles.badgeSuccess
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={
                        item.status === "Menunggu Kunjungan"
                          ? styles.btnPrimary
                          : styles.btnSecondary
                      }
                      onClick={() =>
                        item.status === "Menunggu Kunjungan"
                          ? handleInputClick(item)
                          : handleDetailClick(item)
                      }
                    >
                      {item.status === "Menunggu Kunjungan"
                        ? "Input Monev"
                        : "Detail Catatan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM MONEV ATAU HASIL MONEV --- */}
      {(view === "form" || view === "result") && selectedItem && (
        <div>
          <button onClick={() => setView("list")} style={styles.btnOutline}>
            ← Kembali ke Daftar
          </button>

          <div style={styles.grid2}>
            {/* Kolom Kiri: Detail Kegiatan & Laporan Dosen */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={styles.card}>
                <h4
                  style={{
                    marginTop: 0,
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  Informasi Pelaksanaan
                </h4>
                <div style={styles.infoRow}>
                  <strong>ID Kegiatan:</strong> <span>{selectedItem.id}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Judul:</strong> <span>{selectedItem.judul}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Ketua Pelaksana:</strong>{" "}
                  <span>{selectedItem.ketua}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Jadwal Monev:</strong>{" "}
                  <span>{selectedItem.jadwal}</span>
                </div>
              </div>

              <div style={{ ...styles.card, backgroundColor: "#f8fafc" }}>
                <h4
                  style={{
                    marginTop: 0,
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "10px",
                    color: "#334155",
                  }}
                >
                  📑 Laporan Kemajuan (Dari Dosen)
                </h4>
                <div style={{ marginBottom: "15px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "bold",
                    }}
                  >
                    Klaim Progress: {selectedItem.progress}
                  </span>
                  <div
                    style={{
                      ...styles.progressBarBg,
                      width: "100%",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        ...styles.progressBarFill,
                        width: selectedItem.progress,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {selectedItem.laporanDosen}
                </div>
                <button
                  style={{
                    ...styles.btnSecondary,
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span>📎</span> Unduh {selectedItem.fileLaporan}
                </button>
              </div>
            </div>

            {/* Kolom Kanan: Form Input Monev ATAU Hasil Monev (Read Only) */}
            <div style={styles.card}>
              <h4
                style={{
                  marginTop: 0,
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  color: "#1a1a2e",
                }}
              >
                {view === "form"
                  ? "Input Hasil Kunjungan/Monev"
                  : "Catatan Monev Reviewer"}
              </h4>

              {view === "form" ? (
                // --- MODE INPUT MONEV (FORM) ---
                <form
                  onSubmit={handleSimpan}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <div>
                    <label style={styles.labelBlock}>
                      Kesesuaian dengan Target/Proposal
                    </label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Penilaian --</option>
                      <option value="Sangat Sesuai">
                        Sangat Sesuai Target
                      </option>
                      <option value="Sesuai">Sesuai Target</option>
                      <option value="Kurang Sesuai">
                        Kurang Sesuai Target
                      </option>
                      <option value="Tidak Sesuai">
                        Tidak Sesuai (Menyimpang)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>
                      Catatan Lapangan & Temuan
                    </label>
                    <textarea
                      style={{ ...styles.inputField, height: "120px" }}
                      placeholder="Ketik temuan saat kunjungan lapangan, validasi bukti fisik, dll..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>
                      Rekomendasi Tindak Lanjut
                    </label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Rekomendasi --</option>
                      <option value="Lanjut">
                        Lanjutkan ke pelaporan akhir
                      </option>
                      <option value="Revisi">
                        Perlu perbaikan/penyesuaian segera
                      </option>
                      <option value="Hentikan">
                        Rekomendasi pemberhentian kegiatan
                      </option>
                    </select>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      borderTop: "1px solid #eee",
                      paddingTop: "20px",
                    }}
                  >
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Simpan Hasil Monev
                    </button>
                  </div>
                </form>
              ) : (
                // --- MODE BACA (RESULT) ---
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>
                      Kesesuaian dengan Target
                    </label>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#1a1a2e",
                      }}
                    >
                      ✅ {selectedItem.reviewerKesesuaian}
                    </div>
                  </div>

                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>
                      Catatan Lapangan & Temuan
                    </label>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#334155",
                      }}
                    >
                      {selectedItem.reviewerCatatan}
                    </p>
                  </div>

                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>
                      Rekomendasi Tindak Lanjut
                    </label>
                    <span style={styles.badgeSuccessLg}>
                      {selectedItem.reviewerRekomendasi}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    🔒 Data Monev ini telah divalidasi dan tersimpan di sistem.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// === STYLES ===
const styles = {
  header: { marginBottom: "20px" },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    borderBottom: "2px solid #1a1a2e",
    padding: "12px",
    textAlign: "left",
    color: "#1a1a2e",
  },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "12px", verticalAlign: "middle" },

  // Progress Bar styling
  progressBarBg: {
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    height: "8px",
    width: "100px",
    marginBottom: "4px",
    overflow: "hidden",
  },
  progressBarFill: {
    backgroundColor: "#10b981",
    height: "100%",
    borderRadius: "4px",
  },

  // Badges
  badgeInfo: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeSuccessLg: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "8px 15px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    display: "inline-block",
  },

  // Grid layout
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "15px",
  },
  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    marginBottom: "10px",
    fontSize: "13px",
  },

  // Form & Result Styles
  labelBlock: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#64748b",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    boxSizing: "border-box",
    width: "100%",
    fontSize: "13px",
    fontFamily: "inherit",
  },
  resultBox: {
    padding: "15px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
  },

  // Buttons
  btnPrimary: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  btnSecondary: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnPrimaryFull: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "12px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
};
