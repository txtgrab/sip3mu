import { useState } from "react";

export default function ApprovalPimpinan() {
  const [activeTab, setActiveTab] = useState("laporanAkhir");
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [catatanPenolakan, setCatatanPenolakan] = useState("");

  // Data Dummy Approval Pimpinan LPPM (Diperkaya dengan variasi status)
  const [dataApproval, setDataApproval] = useState({
    laporanAkhir: [
      {
        id: "LAP-UNIV-011",
        judul: "Pengembangan Material Maju untuk Baterai EV",
        ketua: "Prof. Dr. Heru Susanto",
        resume:
          "Laporan ini menjabarkan hasil pengujian material baterai dengan peningkatan efisiensi sebesar 15%. Luaran wajib berupa draf publikasi internasional Q2 telah disubmit.",
        valFakultas: true,
        valLPPM: true,
        file: "Laporan_Akhir_Lengkap.pdf",
        status: "Menunggu Approval",
      },
      {
        id: "LAP-UNIV-009",
        judul: "Sistem Cerdas Pendeteksi Hama Tanaman",
        ketua: "Ir. Ahmad Dahlan, M.T.",
        resume:
          "Laporan akhir sudah melampirkan SPTB 100% dan bukti submit jurnal nasional Sinta 2. Dokumen keuangan telah divalidasi dan sesuai dengan RAB awal.",
        valFakultas: true,
        valLPPM: true,
        file: "Laporan_Akhir_Lengkap.pdf",
        status: "Disetujui",
      },
    ],
    luaranNonHibah: [
      {
        id: "LRN-002",
        judul: "Aplikasi E-Commerce UMKM",
        ketua: "Siti Aminah, M.Kom",
        resume:
          "Pencatatan Hak Cipta (HKI) untuk aplikasi E-Commerce UMKM Desa Binaan. Sertifikat HKI telah diterbitkan oleh DJKI.",
        valFakultas: true,
        valLPPM: true,
        file: "Sertifikat_HKI_Valid.pdf",
        status: "Menunggu Approval",
      },
      {
        id: "LRN-001",
        judul: "Publikasi Jurnal Internasional Q1",
        ketua: "Dr. Budi Santoso",
        resume:
          "Klaim luaran publikasi jurnal internasional terindeks Scopus Q1 di jurnal IEEE Access. Status jurnal published dan URL dapat diakses.",
        valFakultas: true,
        valLPPM: true,
        file: "Bukti_Publikasi_Jurnal.pdf",
        status: "Disetujui",
      },
      {
        id: "LRN-005",
        judul: "Buku Referensi: Pengantar AI",
        ketua: "Prof. Dr. Wahyu Setiawan",
        resume:
          "Klaim penerbitan buku referensi. ISBN belum terdaftar di perpusnas dan draf buku masih berupa *dummy* kasar.",
        valFakultas: true,
        valLPPM: true,
        file: "Draf_Buku_Referesi.pdf",
        status: "Ditolak",
      },
    ],
    usulanMandiri: [
      {
        id: "MDR-001",
        judul: "Analisis Algoritma XYZ (Mandiri)",
        ketua: "Dr. Budi Santoso",
        resume:
          "Proposal penelitian pendanaan mandiri untuk menganalisis kompleksitas waktu algoritma XYZ pada dataset medis.",
        valFakultas: false, // Sesuai AD-08, Mandiri tidak lewat Fakultas
        valLPPM: true,
        file: "Proposal_Mandiri.pdf",
        status: "Menunggu Approval",
      },
      {
        id: "MDR-004",
        judul: "Survei Kepuasan Layanan Akademik (Mandiri)",
        ketua: "Dra. Rini Wati",
        resume:
          "Proposal pengabdian mandiri untuk melakukan survei komprehensif kepuasan mahasiswa di lingkungan kampus. Format sesuai pedoman LPPM.",
        valFakultas: false,
        valLPPM: true,
        file: "Proposal_Mandiri_Survei.pdf",
        status: "Disetujui",
      },
    ],
  });

  const currentData = dataApproval[activeTab];

  const handleLihatDetail = (item) => {
    setSelectedItem(item);
    setCatatanPenolakan("");
    setView("detail");
  };

  const handleAction = (aksi) => {
    if (aksi === "Tolak" && catatanPenolakan.trim() === "") {
      alert("Catatan penolakan wajib diisi jika Anda menolak dokumen ini!");
      return;
    }

    const updatedData = { ...dataApproval };
    updatedData[activeTab] = updatedData[activeTab].map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          status: aksi === "Setujui" ? "Disetujui" : "Ditolak",
        };
      }
      return item;
    });

    setDataApproval(updatedData);
    alert(`Dokumen berhasil ${aksi === "Setujui" ? "Disetujui" : "Ditolak"}.`);
    setView("list");
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Persetujuan Akhir (Approval Pimpinan LPPM)
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list"
            ? "Otorisasi final dokumen yang telah divalidasi oleh Operator Fakultas dan Operator LPPM."
            : `Detail Dokumen: ${selectedItem?.id}`}
        </p>
      </div>

      {/* --- TAMPILAN 1: LIST / DAFTAR --- */}
      {view === "list" && (
        <>
          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tabBtn,
                ...(activeTab === "laporanAkhir" ? styles.tabBtnActive : {}),
              }}
              onClick={() => setActiveTab("laporanAkhir")}
            >
              Laporan Akhir
            </button>
            <button
              style={{
                ...styles.tabBtn,
                ...(activeTab === "luaranNonHibah" ? styles.tabBtnActive : {}),
              }}
              onClick={() => setActiveTab("luaranNonHibah")}
            >
              Luaran Non-Hibah
            </button>
            <button
              style={{
                ...styles.tabBtn,
                ...(activeTab === "usulanMandiri" ? styles.tabBtnActive : {}),
              }}
              onClick={() => setActiveTab("usulanMandiri")}
            >
              Usulan Mandiri
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID Dokumen</th>
                  <th style={styles.th}>Judul / Keterangan</th>
                  <th style={styles.th}>Ketua / Pengusul</th>
                  <th style={styles.th}>Status Approval</th>
                  <th style={styles.th}>Aksi Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{item.id}</strong>
                    </td>
                    <td style={styles.td}>{item.judul}</td>
                    <td style={styles.td}>{item.ketua}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          item.status === "Disetujui"
                            ? styles.badgeSuccess
                            : item.status === "Ditolak"
                              ? styles.badgeDanger
                              : styles.badgeWarning
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.btnPrimary}
                        onClick={() => handleLihatDetail(item)}
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      Tidak ada data untuk disetujui.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* --- TAMPILAN 2: DETAIL & AKSI PERSETUJUAN --- */}
      {view === "detail" && selectedItem && (
        <div>
          <button onClick={() => setView("list")} style={styles.btnOutline}>
            ← Kembali ke Daftar
          </button>

          <div style={styles.grid2}>
            {/* Kolom Kiri: Info Resume & Dokumen */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Informasi Dokumen</h4>
                <div style={styles.infoRow}>
                  <strong>ID Dokumen:</strong> {selectedItem.id}
                </div>
                <div style={styles.infoRow}>
                  <strong>Ketua Pengusul:</strong> {selectedItem.ketua}
                </div>
                <div style={{ ...styles.infoRow, marginTop: "10px" }}>
                  <strong>Judul/Keterangan:</strong>
                  <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
                    {selectedItem.judul}
                  </p>
                </div>
                <div
                  style={{
                    ...styles.infoRow,
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#f1f5f9",
                    borderRadius: "6px",
                  }}
                >
                  <strong>Resume / Ringkasan:</strong>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "12px",
                      lineHeight: "1.5",
                      color: "#334155",
                    }}
                  >
                    {selectedItem.resume}
                  </p>
                </div>
              </div>

              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Akses Dokumen Berkas</h4>
                <button style={styles.btnDoc}>
                  📄 Buka / Unduh {selectedItem.file}
                </button>
              </div>
            </div>

            {/* Kolom Kanan: Status Validasi & Form Keputusan */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Box Track Record Validasi */}
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Jejak Validasi Berjenjang</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {/* Tampilkan validasi Fakultas KECUALI untuk Usulan Mandiri */}
                  {activeTab !== "usulanMandiri" && (
                    <div style={styles.valTrackBox}>
                      <span style={{ fontSize: "18px" }}>
                        {selectedItem.valFakultas ? "✅" : "⏳"}
                      </span>
                      <div>
                        <strong style={{ fontSize: "13px", color: "#166534" }}>
                          Tervalidasi Operator Fakultas
                        </strong>
                        <div style={{ fontSize: "11px", color: "#666" }}>
                          Syarat kelengkapan administrasi awal terpenuhi.
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={styles.valTrackBox}>
                    <span style={{ fontSize: "18px" }}>
                      {selectedItem.valLPPM ? "✅" : "⏳"}
                    </span>
                    <div>
                      <strong style={{ fontSize: "13px", color: "#166534" }}>
                        Tervalidasi Operator LPPM
                      </strong>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        Syarat kelengkapan tingkat institusi terpenuhi.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Aksi Keputusan */}
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Aksi Persetujuan Pimpinan</h4>

                {selectedItem.status !== "Menunggu Approval" ? (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <h3
                      style={{
                        margin: "0 0 10px 0",
                        color:
                          selectedItem.status === "Disetujui"
                            ? "#166534"
                            : "#991b1b",
                      }}
                    >
                      Dokumen Telah {selectedItem.status}
                    </h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                      Aksi untuk dokumen ini telah dikunci dan riwayatnya
                      disimpan pada pangkalan data institusi.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <label style={styles.labelBlock}>
                        Catatan Penolakan (Hanya diisi jika menolak):
                      </label>
                      <textarea
                        value={catatanPenolakan}
                        onChange={(e) => setCatatanPenolakan(e.target.value)}
                        placeholder="Tuliskan alasan penolakan di sini..."
                        style={{ ...styles.inputField, height: "80px" }}
                      ></textarea>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        style={{
                          ...styles.btnPrimaryFull,
                          backgroundColor: "#10b981",
                        }}
                        onClick={() => handleAction("Setujui")}
                      >
                        ✓ Setujui Dokumen
                      </button>
                      <button
                        style={{
                          ...styles.btnPrimaryFull,
                          backgroundColor: "#ef4444",
                        }}
                        onClick={() => handleAction("Tolak")}
                      >
                        ✕ Tolak Dokumen
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
  },
  tabBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#64748b",
    transition: "all 0.2s",
  },
  tabBtnActive: { color: "#1a1a2e", borderBottom: "3px solid #1a1a2e" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
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
  badgeSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  badgeDanger: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnPrimary: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "6px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
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
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
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
    width: "100%",
  },
  valTrackBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    backgroundColor: "#dcfce7",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #bbf7d0",
  },
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
  btnPrimaryFull: {
    flex: 1,
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
};
