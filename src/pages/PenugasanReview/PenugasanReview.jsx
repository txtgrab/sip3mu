import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PenugasanReview() {
  const { role } = useOutletContext();
  const isFakultas = role === "OPERATOR_FAKULTAS";

  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const [usulanData] = useState({
    fakultas: [
      {
        id: "PRP-FAK-001",
        judul: "Sistem Monitoring Kualitas Udara Kampus berbasis IoT",
        ketua: "Ir. Eko Purwanto, M.T.",
        skema: "Penelitian Dasar Fakultas",
        bidang: "Teknologi Informasi & IoT",
        status: "Belum Ditugaskan",
      },
      {
        id: "PRP-FAK-005",
        judul: "Penyuluhan Gizi Balita di Tembalang",
        ketua: "Dr. Rina Astuti",
        skema: "Pengabdian Internal Fakultas",
        bidang: "Kesehatan Masyarakat",
        status: "Sudah Ditugaskan",
        reviewer1: "Dr. Siti Fatimah",
        reviewer2: "Prof. Ahmad Zaki",
      },
    ],
    lppm: [
      {
        id: "PRP-UNIV-011",
        judul: "Pengembangan Material Maju untuk Baterai Kendaraan Listrik",
        ketua: "Prof. Dr. Heru Susanto",
        skema: "Penelitian Terapan Universitas",
        bidang: "Teknik Kimia & Material",
        status: "Belum Ditugaskan",
      },
    ],
  });

  const aiRecommendations = [
    {
      nama: "Dr. Budi Santoso, M.T.",
      match: "95%",
      keahlian: "Internet of Things, Embedded System",
    },
    {
      nama: "Prof. Dr. Wahyu Setiawan",
      match: "88%",
      keahlian: "Jaringan Komputer, Sistem Cerdas",
    },
  ];

  const currentData = isFakultas ? usulanData.fakultas : usulanData.lppm;
  const labelTingkat = isFakultas
    ? "Tingkat Fakultas"
    : "Tingkat Universitas (LPPM)";

  const handleTugaskanClick = (item) => {
    setSelectedItem(item);
    setView("form");
  };
  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setView("result");
  };
  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Penugasan berhasil disimpan!");
    setView("list");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>
          Penugasan Reviewer ({labelTingkat})
        </h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            `Alokasi reviewer untuk proposal ruang lingkup ${labelTingkat}.`}
          {view === "form" && `Form Penugasan Reviewer: ${selectedItem?.id}`}
          {view === "result" &&
            `Detail Reviewer Ditugaskan: ${selectedItem?.id}`}
        </p>
      </div>

      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Usulan</th>
                <th style={styles.th}>Judul Usulan</th>
                <th style={styles.th}>Ketua</th>
                <th style={styles.th}>Bidang Fokus</th>
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
                  <td style={styles.td}>{item.bidang}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Belum Ditugaskan"
                          ? styles.badgeDanger
                          : styles.badgeSuccess
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={
                        item.status === "Belum Ditugaskan"
                          ? styles.btnPrimary
                          : styles.btnSecondary
                      }
                      onClick={() =>
                        item.status === "Belum Ditugaskan"
                          ? handleTugaskanClick(item)
                          : handleDetailClick(item)
                      }
                    >
                      {item.status === "Belum Ditugaskan"
                        ? "Pilih Reviewer"
                        : "Detail Penugasan"}
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
                  Informasi Proposal
                </h4>
                <div style={styles.infoRow}>
                  <strong>ID Usulan:</strong> <span>{selectedItem.id}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Judul:</strong> <span>{selectedItem.judul}</span>
                </div>
              </div>

              {/* Box AI Reviewer Matching */}
              <div style={styles.aiBox}>
                <div style={styles.aiHeader}>
                  <h4 style={{ margin: 0 }}>🤖 AI Reviewer Matching</h4>
                  <span style={styles.aiBadge}>Rekomendasi</span>
                </div>
                <p
                  style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}
                >
                  Rekomendasi berdasarkan kemiripan semantik:
                </p>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} style={styles.matchCard}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong style={{ fontSize: "13px" }}>{rec.nama}</strong>
                        <span style={styles.matchScore}>{rec.match} Match</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        Keahlian: {rec.keahlian}
                      </div>
                    </div>
                  ))}
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
                  ? "Penetapan Reviewer"
                  : "Reviewer yang Ditugaskan"}
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
                  <div style={styles.inputGroup}>
                    <label style={styles.labelBlock}>👤 Pilih Reviewer 1</label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih dari database --</option>
                      <option value="budi">
                        Dr. Budi Santoso, M.T. (Rekomendasi AI)
                      </option>
                    </select>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Kirim Surat Penugasan
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
                    <label style={styles.labelBlock}>Reviewer 1</label>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      ✅ {selectedItem.reviewer1}
                    </div>
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
  badgeDanger: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
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
  aiBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: "8px",
    padding: "20px",
    border: "1px solid #bbf7d0",
  },
  aiHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#166534",
  },
  aiBadge: {
    backgroundColor: "#166534",
    color: "white",
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  matchCard: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcfce7",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  matchScore: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  inputGroup: {
    padding: "15px",
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
  },
  labelBlock: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#1e293b",
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
};
