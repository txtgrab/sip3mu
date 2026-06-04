import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ValidasiLaporan() {
  const { role } = useOutletContext();
  const [activeTab, setActiveTab] = useState("kemajuan"); // Tab State
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [keputusan, setKeputusan] = useState("");
  const [catatan, setCatatan] = useState("");

  // ==========================================
  // DATA DUMMY: LAPORAN KEMAJUAN (Sesuai AD-05)
  // ==========================================
  const [laporanKemajuan, setLaporanKemajuan] = useState([
    {
      id: "PROG-UNIV-001",
      judul: "Pengembangan Material Maju untuk Baterai EV",
      ketua: "Prof. Dr. Heru Susanto",
      skema: "Penelitian Terapan Universitas",
      status: "Menunggu Validasi Fakultas",
    },
    {
      id: "PROG-UNIV-002",
      judul: "Pemberdayaan Desa Wisata Bahari di Jepara",
      ketua: "Dr. Agus Riyanto",
      skema: "Pengabdian Internal Universitas",
      status: "Diteruskan ke LPPM",
    },
  ]);

  // ==========================================
  // DATA DUMMY: LAPORAN AKHIR & LUARAN (Sesuai AD-05)
  // ==========================================
  const [laporanAkhir, setLaporanAkhir] = useState([
    {
      id: "FINAL-UNIV-003",
      judul: "Sistem Cerdas IoT Pertanian",
      ketua: "Ir. Ahmad Dahlan, M.T",
      skema: "Penelitian Terapan Universitas",
      status: "Menunggu Validasi Fakultas",
    },
    {
      id: "FINAL-UNIV-004",
      judul: "Optimasi Jaringan 5G",
      ketua: "Dr. Budi Santoso, M.Kom.",
      skema: "Penelitian Dasar Universitas",
      status: "Diteruskan ke LPPM",
    },
    {
      id: "FINAL-UNIV-005",
      judul: "Pelatihan Kewirausahaan Ibu PKK",
      ketua: "Siti Aminah, M.Kom",
      skema: "Pengabdian Internal Universitas",
      status: "Menunggu Approval Pimpinan",
    },
  ]);

  // Filter Data berdasarkan Tab dan Role
  const currentData = activeTab === "kemajuan" ? laporanKemajuan : laporanAkhir;

  const filteredData = currentData.filter((item) => {
    if (role === "OPERATOR FAKULTAS") {
      return item.status === "Menunggu Validasi Fakultas";
    } else if (role === "OPERATOR LPPM") {
      return (
        item.status === "Diteruskan ke LPPM" ||
        item.status === "Menunggu Validasi LPPM"
      );
    } else if (role === "PIMPINAN LPPM") {
      // Pimpinan LPPM tidak validasi laporan kemajuan, hanya laporan akhir
      if (activeTab === "kemajuan") return false;
      return item.status === "Menunggu Approval Pimpinan";
    }
    return false;
  });

  const getRoleLabel = () => {
    if (role === "OPERATOR FAKULTAS") return "Tingkat Fakultas";
    if (role === "OPERATOR LPPM") return "Tingkat LPPM";
    if (role === "PIMPINAN LPPM") return "Persetujuan Akhir (Approval)";
    return "";
  };

  const handlePeriksaClick = (item) => {
    setSelectedItem(item);
    setKeputusan("");
    setCatatan("");
    setView("form");
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!keputusan) {
      alert("Pilih keputusan terlebih dahulu!");
      return;
    }

    const processUpdate = (dataArray) => {
      return dataArray.map((item) => {
        if (item.id === selectedItem.id) {
          if (keputusan === "TERUSKAN_LPPM")
            return { ...item, status: "Diteruskan ke LPPM" };
          if (keputusan === "TERUSKAN_PIMPINAN")
            return { ...item, status: "Menunggu Approval Pimpinan" };
          if (keputusan === "SELESAI_LPPM")
            return { ...item, status: "Selesai (Disetujui LPPM)" };
          if (keputusan === "APPROVE")
            return { ...item, status: "Selesai (Disetujui Pimpinan)" };
          if (keputusan === "REVISI")
            return { ...item, status: "Revisi (Dikembalikan ke Dosen)" };
        }
        return item;
      });
    };

    if (activeTab === "kemajuan") {
      setLaporanKemajuan(processUpdate(laporanKemajuan));
    } else {
      setLaporanAkhir(processUpdate(laporanAkhir));
    }

    alert(`Validasi berhasil diproses dengan status: ${keputusan}`);
    setView("list");
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      {/* HEADER & TAB NAVIGATION */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Validasi Pelaporan ({getRoleLabel()})
        </h2>
        <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
          Pemeriksaan dokumen laporan kemajuan, laporan akhir, bukti luaran, dan
          SPTB.
        </p>

        {/* TOMBOL TAB */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "10px",
          }}
        >
          <button
            onClick={() => {
              setActiveTab("kemajuan");
              setView("list");
            }}
            style={
              activeTab === "kemajuan" ? styles.tabActive : styles.tabInactive
            }
          >
            📝 Laporan Kemajuan
          </button>
          <button
            onClick={() => {
              setActiveTab("akhir");
              setView("list");
            }}
            style={
              activeTab === "akhir" ? styles.tabActive : styles.tabInactive
            }
          >
            🎯 Laporan Akhir & Luaran
          </button>
        </div>
      </div>

      {/* --- TAMPILAN 1: TABEL --- */}
      {view === "list" && (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Dokumen</th>
                <th style={styles.th}>Judul Kegiatan</th>
                <th style={styles.th}>Ketua</th>
                <th style={styles.th}>Skema</th>
                <th style={styles.th}>Status Terkini</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={styles.td}>{item.judul}</td>
                  <td style={styles.td}>{item.ketua}</td>
                  <td style={styles.td}>{item.skema}</td>
                  <td style={styles.td}>
                    <span style={styles.badgeWarning}>{item.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handlePeriksaClick(item)}
                      style={styles.btnPrimary}
                    >
                      {role === "PIMPINAN LPPM"
                        ? "Review & Approve"
                        : "Periksa Berkas"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    Tidak ada antrean validasi/approval pada tab ini saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM VALIDASI / APPROVAL --- */}
      {view === "form" && selectedItem && (
        <div>
          <button onClick={() => setView("list")} style={styles.btnOutline}>
            ← Kembali ke Daftar
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {/* Kolom Kiri: Info Kegiatan & Lampiran */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Informasi Kegiatan</h4>
                <div style={styles.infoRow}>
                  <strong>ID Dokumen:</strong> {selectedItem.id}
                </div>
                <div style={styles.infoRow}>
                  <strong>Judul:</strong> {selectedItem.judul}
                </div>
                <div style={styles.infoRow}>
                  <strong>Skema:</strong> {selectedItem.skema}
                </div>
                <div style={styles.infoRow}>
                  <strong>Ketua:</strong> {selectedItem.ketua}
                </div>
              </div>

              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Lampiran Dosen</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {activeTab === "kemajuan" ? (
                    <>
                      <button style={styles.btnDoc}>
                        📄 Buka Laporan_Kemajuan.pdf
                      </button>
                      <button style={styles.btnDoc}>
                        📖 Buka Catatan_Harian_Logbook.pdf
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={styles.btnDoc}>
                        📄 Buka Laporan_Akhir_Lengkap.pdf
                      </button>
                      <button style={styles.btnDoc}>
                        🎯 Buka Bukti_Luaran_Tercapai.pdf
                      </button>
                      <button style={styles.btnDoc}>
                        💰 Buka SPTB_Keuangan.pdf
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Aksi */}
            <div style={styles.cardBox}>
              <h4 style={styles.cardTitle}>
                {role === "PIMPINAN LPPM"
                  ? "Form Persetujuan Akhir (Approval)"
                  : "Form Validasi Berkas"}
              </h4>

              <form
                onSubmit={handleSimpan}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {/* Checklist hanya untuk Operator */}
                {role !== "PIMPINAN LPPM" && (
                  <div style={styles.checklistContainer}>
                    <label
                      style={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                        display: "block",
                        fontSize: "13px",
                      }}
                    >
                      Pengecekan Komponen:
                    </label>
                    {activeTab === "kemajuan" ? (
                      <>
                        <label style={styles.checkboxLabel}>
                          <input type="checkbox" required /> Format Laporan
                          Kemajuan Sesuai
                        </label>
                        <label style={styles.checkboxLabel}>
                          <input type="checkbox" required /> Logbook / Catatan
                          Harian Terisi
                        </label>
                      </>
                    ) : (
                      <>
                        <label style={styles.checkboxLabel}>
                          <input type="checkbox" required /> Format Laporan
                          Akhir Sesuai
                        </label>
                        <label style={styles.checkboxLabel}>
                          <input type="checkbox" required /> Bukti Luaran Valid
                          & Dapat Diakses
                        </label>
                        <label style={styles.checkboxLabel}>
                          <input type="checkbox" required /> Laporan Keuangan
                          (SPTB) Lengkap
                        </label>
                      </>
                    )}
                  </div>
                )}

                <div>
                  <label style={styles.labelBlock}>Keputusan Akhir</label>
                  <select
                    value={keputusan}
                    onChange={(e) => setKeputusan(e.target.value)}
                    style={styles.inputField}
                    required
                  >
                    <option value="">-- Pilih Keputusan --</option>

                    {role === "OPERATOR FAKULTAS" && (
                      <>
                        <option value="TERUSKAN_LPPM">
                          Sesuai (Teruskan ke LPPM)
                        </option>
                        <option value="REVISI">
                          Perbaikan Laporan (Kembalikan ke Dosen)
                        </option>
                      </>
                    )}

                    {role === "OPERATOR LPPM" && (
                      <>
                        {activeTab === "kemajuan" ? (
                          <option value="SELESAI_LPPM">
                            Lolos Validasi (Selesai Laporan Kemajuan)
                          </option>
                        ) : (
                          <option value="TERUSKAN_PIMPINAN">
                            Lolos Validasi (Ajukan Approval Pimpinan)
                          </option>
                        )}
                        <option value="REVISI">
                          Perbaikan Laporan (Kembalikan ke Dosen)
                        </option>
                      </>
                    )}

                    {role === "PIMPINAN LPPM" && (
                      <>
                        <option value="APPROVE">
                          Setujui (Kegiatan Selesai & Ditutup)
                        </option>
                        <option value="REVISI">
                          Tolak / Minta Klarifikasi Ulang
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label style={styles.labelBlock}>
                    Catatan (Wajib jika Revisi)
                  </label>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    style={{ ...styles.inputField, height: "100px" }}
                    placeholder="Ketik catatan evaluasi di sini..."
                  ></textarea>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button type="submit" style={styles.btnPrimaryFull}>
                    {role === "PIMPINAN LPPM"
                      ? "Submit Approval"
                      : "Submit Validasi"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// === STYLES ===
const styles = {
  tabActive: {
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  tabInactive: {
    backgroundColor: "transparent",
    color: "#64748b",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    marginTop: "15px",
  },
  th: {
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    padding: "12px",
    textAlign: "left",
    color: "#334155",
  },
  tr: { borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px", verticalAlign: "middle", color: "#1e293b" },
  badgeWarning: {
    backgroundColor: "#fef3c7",
    color: "#b45309",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnPrimary: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    padding: "6px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  cardBox: {
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  cardTitle: {
    margin: "0 0 15px 0",
    color: "#1a1a2e",
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: "10px",
  },
  infoRow: { marginBottom: "8px", fontSize: "13px", color: "#334155" },
  labelBlock: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#1e293b",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #cbd5e1",
    fontSize: "13px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  checklistContainer: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    marginBottom: "15px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
    marginBottom: "8px",
    color: "#334155",
    cursor: "pointer",
  },
  btnDoc: {
    backgroundColor: "white",
    color: "#1e293b",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    textAlign: "left",
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
