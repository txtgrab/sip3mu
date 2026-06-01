import { useState } from "react";

export default function ValidasiLuaranNonHibah() {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const [luaranData] = useState([
    {
      id: "LRN-001",
      dosen: "Dr. Budi Santoso",
      jenis: "Publikasi Jurnal Internasional",
      judul: "Implementation of Deep Learning for...",
      tglSubmit: "10 Mei 2026",
      status: "Menunggu Validasi",
    },
    {
      id: "LRN-002",
      dosen: "Siti Aminah, M.Kom",
      jenis: "Kekayaan Intelektual (Hak Cipta)",
      judul: "Aplikasi E-Commerce UMKM",
      tglSubmit: "08 Mei 2026",
      status: "Diterima",
      catatan: "Dokumen sertifikat valid.",
    },
  ]);

  const handlePeriksaClick = (item) => {
    setSelectedItem(item);
    setView("form");
  };
  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setView("result");
  };
  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Status Luaran Non-Hibah berhasil diperbarui!");
    setView("list");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Validasi Luaran Non-Hibah
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            "Pemeriksaan klaim capaian luaran mandiri dosen yang diajukan di luar skema hibah."}
          {view === "form" && `Form Pemeriksaan Luaran: ${selectedItem?.id}`}
          {view === "result" && `Detail Validasi Luaran: ${selectedItem?.id}`}
        </p>
      </div>

      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Luaran</th>
                <th style={styles.th}>Nama Dosen</th>
                <th style={styles.th}>Jenis Luaran</th>
                <th style={styles.th}>Judul Capaian</th>
                <th style={styles.th}>Tanggal Input</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {luaranData.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={styles.td}>{item.dosen}</td>
                  <td style={styles.td}>{item.jenis}</td>
                  <td style={styles.td}>{item.judul}</td>
                  <td style={styles.td}>{item.tglSubmit}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Menunggu Validasi"
                          ? styles.badgeWarning
                          : item.status === "Diterima"
                            ? styles.badgeSuccess
                            : styles.badgeDanger
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={
                        item.status === "Menunggu Validasi"
                          ? styles.btnPrimary
                          : styles.btnSecondary
                      }
                      onClick={() =>
                        item.status === "Menunggu Validasi"
                          ? handlePeriksaClick(item)
                          : handleDetailClick(item)
                      }
                    >
                      {item.status === "Menunggu Validasi"
                        ? "Periksa Luaran"
                        : "Lihat Hasil"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(view === "form" || view === "result") && selectedItem && (
        <div>
          <button onClick={() => setView("list")} style={styles.btnOutline}>
            ← Kembali ke Daftar
          </button>
          <div style={styles.grid2}>
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
                  Informasi Capaian Luaran
                </h4>
                <div style={styles.infoRow}>
                  <strong>Dosen Pengusul:</strong>{" "}
                  <span>{selectedItem.dosen}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Jenis Luaran:</strong>{" "}
                  <span>{selectedItem.jenis}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Judul:</strong> <span>{selectedItem.judul}</span>
                </div>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#f8fafc" }}>
                <h4
                  style={{
                    marginTop: 0,
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "10px",
                  }}
                >
                  📂 Dokumen Bukti (URL/PDF)
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button style={styles.btnDoc}>
                    📄 Buka Sertifikat_Luaran.pdf
                  </button>
                  <button style={styles.btnDoc}>
                    🔗 Buka Tautan Eksternal (DOI/URL)
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h4
                style={{
                  marginTop: 0,
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                {view === "form"
                  ? "Form Validasi Data Luaran"
                  : "Hasil Validasi"}
              </h4>
              {view === "form" ? (
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
                      Kesesuaian Bukti dengan Klaim
                    </label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Penilaian --</option>
                      <option value="Sesuai">Sesuai (Bukti Valid)</option>
                      <option value="Tidak Sesuai">
                        Tidak Sesuai / Palsu / Tidak Terbaca
                      </option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Keputusan Validasi</label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Status --</option>
                      <option value="Diterima">
                        Diterima (Masuk Rekap Kinerja)
                      </option>
                      <option value="Perbaikan">Perbaikan Data / Tolak</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Catatan (Opsional)</label>
                    <textarea
                      style={{ ...styles.inputField, height: "100px" }}
                    ></textarea>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Submit Validasi Luaran
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>Status Luaran</label>
                    <span
                      style={
                        selectedItem.status === "Diterima"
                          ? styles.badgeSuccessLg
                          : styles.badgeDangerLg
                      }
                    >
                      {selectedItem.status}
                    </span>
                  </div>
                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>Catatan LPPM</label>
                    <p style={{ margin: 0, fontSize: "13px" }}>
                      {selectedItem.catatan || "-"}
                    </p>
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
  badgeWarning: {
    backgroundColor: "#fef08a",
    color: "#854d0e",
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
  badgeDanger: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
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
  badgeDangerLg: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "8px 15px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    display: "inline-block",
  },
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
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
