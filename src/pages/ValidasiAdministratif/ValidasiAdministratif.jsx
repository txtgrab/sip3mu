import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ValidasiAdministratif() {
  const { role } = useOutletContext(); // Menangkap data role dari DashboardLayout
  const isFakultas = role === "OPERATOR_FAKULTAS";

  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // Data dummy (Semua data disimpan di sini, tapi yang tampil hanya sesuai akses)
  const [usulanData] = useState({
    fakultas: [
      {
        id: "PRP-FAK-001",
        judul: "Sistem Monitoring Kualitas Udara Kampus",
        ketua: "Ir. Eko Purwanto, M.T.",
        skema: "Penelitian Dasar Fakultas",
        tglKirim: "01 Juni 2026",
        status: "Menunggu Validasi",
      },
      {
        id: "PRP-FAK-002",
        judul: "Penyuluhan Gizi Balita di Tembalang",
        ketua: "Dr. Rina Astuti",
        skema: "Pengabdian Internal Fakultas",
        tglKirim: "28 Mei 2026",
        status: "Lolos Validasi",
        catatan: "Berkas lengkap.",
      },
    ],
    lppm: [
      {
        id: "PRP-UNIV-001",
        judul: "Pengembangan Material Maju untuk Baterai EV",
        ketua: "Prof. Dr. Heru Susanto",
        skema: "Penelitian Terapan Universitas",
        tglKirim: "02 Juni 2026",
        status: "Menunggu Validasi",
      },
      {
        id: "PRP-UNIV-002",
        judul: "Pemberdayaan Desa Wisata Bahari di Jepara",
        ketua: "Dr. Agus Riyanto",
        skema: "Pengabdian Internal Universitas",
        tglKirim: "29 Mei 2026",
        status: "Revisi",
        catatan: "RAB melebihi batas.",
      },
    ],
  });

  // Pilih data yang akan dirender berdasarkan role saat ini
  const currentData = isFakultas ? usulanData.fakultas : usulanData.lppm;
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
    alert("Hasil validasi administratif berhasil disimpan!");
    setView("list");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Validasi Administratif ({labelTingkat})
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            `Pemeriksaan kelengkapan berkas usulan proposal untuk ruang lingkup ${labelTingkat}.`}
          {view === "form" && `Form Pemeriksaan Berkas: ${selectedItem?.id}`}
          {view === "result" && `Detail Hasil Validasi: ${selectedItem?.id}`}
        </p>
      </div>

      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Usulan</th>
                <th style={styles.th}>Judul Usulan</th>
                <th style={styles.th}>Ketua Pengusul</th>
                <th style={styles.th}>Skema</th>
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
                  <td style={styles.td}>{item.skema}</td>
                  <td style={styles.td}>{item.tglKirim}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Menunggu Validasi"
                          ? styles.badgeWarning
                          : item.status === "Lolos Validasi"
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
                        ? "Periksa Berkas"
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
            {/* Kolom Kiri */}
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
                  Informasi Usulan
                </h4>
                <div style={styles.infoRow}>
                  <strong>ID Usulan:</strong> <span>{selectedItem.id}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Judul:</strong> <span>{selectedItem.judul}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Skema:</strong> <span>{selectedItem.skema}</span>
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
                  📂 Lampiran Dokumen
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button style={styles.btnDoc}>
                    📄 Buka Proposal_Lengkap.pdf
                  </button>
                  <button style={styles.btnDoc}>📄 Buka RAB_Usulan.pdf</button>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div style={styles.card}>
              <h4
                style={{
                  marginTop: 0,
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                {view === "form"
                  ? "Form Pemeriksaan Kelengkapan"
                  : "Hasil Validasi Operator"}
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
                      Pengecekan Komponen:
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Kelengkapan Biodata
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Format Penulisan
                      Proposal
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" required /> Lembar Pengesahan TTD &
                      Cap
                    </label>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Keputusan Validasi</label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Status --</option>
                      <option value="Lolos">Lolos Validasi</option>
                      <option value="Revisi">Revisi / Dikembalikan</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>Catatan</label>
                    <textarea
                      style={{ ...styles.inputField, height: "100px" }}
                    ></textarea>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      borderTop: "1px solid #eee",
                      paddingTop: "20px",
                    }}
                  >
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Submit Hasil Validasi
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
                    <label style={styles.labelBlock}>Status Akhir</label>
                    <span
                      style={
                        selectedItem.status === "Lolos Validasi"
                          ? styles.badgeSuccessLg
                          : styles.badgeDangerLg
                      }
                    >
                      {selectedItem.status}
                    </span>
                  </div>
                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>Catatan</label>
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
