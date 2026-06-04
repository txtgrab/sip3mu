import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ValidasiLuaranNonHibah() {
  const { role } = useOutletContext();
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [keputusan, setKeputusan] = useState("");
  const [catatan, setCatatan] = useState("");

  // ==========================================
  // DATA DUMMY: Antrean Luaran Non-Hibah
  // Status menyesuaikan 3 tahap AD-07:
  // 1. Menunggu Validasi Fakultas
  // 2. Diteruskan ke LPPM
  // 3. Menunggu Approval Pimpinan
  // ==========================================
  const [luaranData, setLuaranData] = useState([
    {
      id: "LRN-PUB-001",
      jenis: "Publikasi Jurnal Internasional",
      judul: "Penerapan AI dalam Analisis Cuaca Ekstrem",
      dosen: "Dr. Rina Astuti",
      fakultas: "Fakultas Sains dan Matematika",
      status: "Menunggu Validasi Fakultas",
    },
    {
      id: "LRN-HKI-002",
      jenis: "Kekayaan Intelektual (Paten)",
      judul: "Alat Pengolah Limbah Cangkang Rajungan",
      dosen: "Prof. Dr. Heru Susanto",
      fakultas: "Fakultas Teknik",
      status: "Diteruskan ke LPPM",
    },
    {
      id: "LRN-BKU-003",
      jenis: "Buku Referensi ber-ISBN",
      judul: "Manajemen Jaringan Komputer Modern",
      dosen: "Dr. Budi Santoso, M.Kom.",
      fakultas: "Fakultas Teknik",
      status: "Menunggu Approval Pimpinan",
    },
  ]);

  // Filter Data berdasarkan Aktor yang sedang Login
  const filteredData = luaranData.filter((item) => {
    if (role === "OPERATOR FAKULTAS") {
      return item.status === "Menunggu Validasi Fakultas";
    } else if (role === "OPERATOR LPPM") {
      return item.status === "Diteruskan ke LPPM";
    } else if (role === "PIMPINAN LPPM") {
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

  const handleBukaForm = (item) => {
    setSelectedItem(item);
    setKeputusan("");
    setCatatan("");
    setView("form");
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!keputusan) {
      alert("Pilih keputusan validasi terlebih dahulu!");
      return;
    }

    const newData = luaranData.map((item) => {
      if (item.id === selectedItem.id) {
        if (keputusan === "TERUSKAN_LPPM")
          return { ...item, status: "Diteruskan ke LPPM" };
        if (keputusan === "TERUSKAN_PIMPINAN")
          return { ...item, status: "Menunggu Approval Pimpinan" };
        if (keputusan === "APPROVE")
          return { ...item, status: "Tervalidasi & Tersimpan (Selesai)" };
        if (keputusan === "REVISI")
          return { ...item, status: "Revisi (Dikembalikan ke Dosen)" };
      }
      return item;
    });

    setLuaranData(newData);
    alert(`Sukses! Data luaran berhasil diproses.`);
    setView("list");
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Validasi Luaran Non-Hibah ({getRoleLabel()})
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Siklus validasi berjenjang untuk memastikan keabsahan dokumen
          Publikasi, HAKI, dan Buku milik dosen.
        </p>
      </div>

      {/* --- TAMPILAN 1: TABEL --- */}
      {view === "list" && (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Luaran</th>
                <th style={styles.th}>Kategori & Judul</th>
                <th style={styles.th}>Dosen Pengusul</th>
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
                  <td style={styles.td}>
                    <div style={{ fontWeight: "bold", color: "#0369a1" }}>
                      {item.jenis}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#334155",
                        marginTop: "4px",
                      }}
                    >
                      {item.judul}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: "bold" }}>{item.dosen}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {item.fakultas}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badgeWarning}>{item.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleBukaForm(item)}
                      style={styles.btnPrimary}
                    >
                      {role === "PIMPINAN LPPM"
                        ? "Persetujuan Akhir"
                        : "Validasi Data"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    Tidak ada antrean validasi luaran saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM VALIDASI BERJENJANG --- */}
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
            {/* Kolom Kiri: Detail Luaran & Dokumen */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Informasi Luaran Non-Hibah</h4>
                <div style={styles.infoRow}>
                  <strong>ID Registrasi:</strong> {selectedItem.id}
                </div>
                <div style={styles.infoRow}>
                  <strong>Kategori:</strong> {selectedItem.jenis}
                </div>
                <div
                  style={{
                    ...styles.infoRow,
                    backgroundColor: "#f1f5f9",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <strong>Judul Karya / Artikel:</strong>
                  <br /> {selectedItem.judul}
                </div>
                <div style={styles.infoRow}>
                  <strong>Penulis / Inventor:</strong> {selectedItem.dosen}
                </div>
              </div>

              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Bukti Fisik & Tautan</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button style={styles.btnDoc}>
                    📄 Unduh Dokumen_Karya_Lengkap.pdf
                  </button>
                  <button style={styles.btnDoc}>
                    🔗 Buka Tautan Jurnal / Sertifikat Web
                  </button>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Aksi */}
            <div style={styles.cardBox}>
              <h4 style={styles.cardTitle}>
                {role === "PIMPINAN LPPM"
                  ? "Persetujuan Akhir (Approval)"
                  : "Validasi Dokumen"}
              </h4>

              <form
                onSubmit={handleSimpan}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {/* Checklist Operator */}
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
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Bukti Tautan (URL)
                      Valid dan Bisa Diakses
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Nama Dosen Tercantum
                      Sesuai Bukti
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Dokumen Fisik (PDF)
                      Dapat Dibaca
                    </label>
                  </div>
                )}

                <div>
                  <label style={styles.labelBlock}>Keputusan Pemeriksaan</label>
                  <select
                    value={keputusan}
                    onChange={(e) => setKeputusan(e.target.value)}
                    style={styles.inputField}
                    required
                  >
                    <option value="">-- Tetapkan Keputusan --</option>

                    {/* Alur 1: Operator Fakultas */}
                    {role === "OPERATOR FAKULTAS" && (
                      <>
                        <option value="TERUSKAN_LPPM">
                          ✅ Data Valid (Teruskan ke LPPM)
                        </option>
                        <option value="REVISI">
                          ❌ Tolak / Kembalikan ke Dosen
                        </option>
                      </>
                    )}

                    {/* Alur 2: Operator LPPM */}
                    {role === "OPERATOR LPPM" && (
                      <>
                        <option value="TERUSKAN_PIMPINAN">
                          ✅ Data Valid (Ajukan Approval Pimpinan)
                        </option>
                        <option value="REVISI">
                          ❌ Tolak / Kembalikan ke Dosen
                        </option>
                      </>
                    )}

                    {/* Alur 3: Pimpinan LPPM */}
                    {role === "PIMPINAN LPPM" && (
                      <>
                        <option value="APPROVE">
                          ✅ Sahkan! (Data Luaran Disetujui & Disimpan)
                        </option>
                        <option value="REVISI">
                          ❌ Tolak (Dokumen Kurang Meyakinkan)
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label style={styles.labelBlock}>
                    Catatan Perbaikan (Opsional)
                  </label>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    style={{ ...styles.inputField, height: "100px" }}
                    placeholder="Wajib diisi jika keputusan ditolak/dikembalikan..."
                  ></textarea>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button type="submit" style={styles.btnPrimaryFull}>
                    {role === "PIMPINAN LPPM"
                      ? "Sahkan Luaran"
                      : "Kirim Hasil Validasi"}
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
    padding: "8px 12px",
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
  infoRow: {
    marginBottom: "8px",
    fontSize: "13px",
    color: "#334155",
    lineHeight: "1.4",
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
  checklistContainer: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    marginBottom: "15px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "13px",
    marginBottom: "8px",
    color: "#334155",
    cursor: "pointer",
    lineHeight: "1.4",
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
