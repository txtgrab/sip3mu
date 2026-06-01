import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ValidasiLaporanAkhir() {
  const { role } = useOutletContext();
  const isFakultas = role === "OPERATOR_FAKULTAS";

  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const [laporanData] = useState({
    fakultas: [
      {
        id: "LAP-FAK-001",
        judul: "Sistem Monitoring Kualitas Udara Kampus",
        ketua: "Ir. Eko Purwanto, M.T.",
        tipe: "Laporan Akhir Penelitian",
        tglKirim: "15 November 2026",
        status: "Menunggu Validasi",
      },
    ],
    lppm: [
      {
        id: "LAP-UNIV-011",
        judul: "Pengembangan Material Maju untuk Baterai EV",
        ketua: "Prof. Dr. Heru Susanto",
        tipe: "Laporan Akhir Penelitian",
        tglKirim: "20 November 2026",
        status: "Perbaikan",
        catatan: "Bukti submit jurnal belum dilampirkan.",
      },
    ],
  });

  const currentData = isFakultas ? laporanData.fakultas : laporanData.lppm;
  const labelTingkat = isFakultas
    ? "Tingkat Fakultas"
    : "Tingkat Universitas (LPPM)";

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
    alert("Hasil validasi laporan akhir berhasil disimpan!");
    setView("list");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Validasi Laporan Akhir ({labelTingkat})
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            "Pemeriksaan dokumen laporan akhir dan kesesuaian target luaran yang diunggah Dosen."}
          {view === "form" && `Form Pemeriksaan Laporan: ${selectedItem?.id}`}
          {view === "result" && `Detail Validasi Laporan: ${selectedItem?.id}`}
        </p>
      </div>

      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Laporan</th>
                <th style={styles.th}>Judul Kegiatan</th>
                <th style={styles.th}>Ketua</th>
                <th style={styles.th}>Jenis Laporan</th>
                <th style={styles.th}>Tanggal Submit</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
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
                  <td style={styles.td}>{item.tipe}</td>
                  <td style={styles.td}>{item.tglKirim}</td>
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
                        ? "Periksa Laporan"
                        : "Lihat Hasil"}
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              )}
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
                  Informasi Kegiatan
                </h4>
                <div style={styles.infoRow}>
                  <strong>ID Laporan:</strong> <span>{selectedItem.id}</span>
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
                  📂 Lampiran Dosen
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button style={styles.btnDoc}>
                    📄 Buka Laporan_Akhir_Lengkap.pdf
                  </button>
                  <button style={styles.btnDoc}>
                    📄 Buka SPTB_Keuangan.pdf
                  </button>
                  <button style={styles.btnDoc}>
                    📄 Buka Draft_Publikasi_Luaran.pdf
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
                {view === "form" ? "Form Validasi Laporan" : "Hasil Validasi"}
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
                  <div style={styles.checklistContainer}>
                    <label
                      style={{ ...styles.labelBlock, marginBottom: "10px" }}
                    >
                      Pengecekan Komponen Akhir:
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Kesesuaian Format
                      Laporan Akhir
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Bukti Luaran
                      (Jurnal/HAKI/dll) Valid
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Kelengkapan Laporan
                      Keuangan (SPTB)
                    </label>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Keputusan Akhir</label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Status --</option>
                      <option value="Diterima">
                        Diterima (Kegiatan Selesai)
                      </option>
                      <option value="Perbaikan">Perbaikan Laporan</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Catatan Validasi</label>
                    <textarea
                      style={{ ...styles.inputField, height: "100px" }}
                      placeholder="Tuliskan catatan perbaikan..."
                    ></textarea>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Submit Validasi Laporan
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
                    <label style={styles.labelBlock}>Status Laporan</label>
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
                    <label style={styles.labelBlock}>Catatan Operator</label>
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
  checklistContainer: {
    backgroundColor: "#f1f5f9",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
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
