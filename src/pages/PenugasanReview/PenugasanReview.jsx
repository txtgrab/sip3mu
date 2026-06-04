import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PenugasanReview() {
  const { role } = useOutletContext();
  const isFakultas = role === "OPERATOR FAKULTAS";

  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // State untuk form
  const [reviewer1, setReviewer1] = useState("");
  const [reviewer2, setReviewer2] = useState("");

  // Data Dummy terpisah antara Fakultas dan LPPM
  const [proposals, setProposals] = useState({
    fakultas: [
      {
        id: "PRP-FAK-001",
        judul: "Sistem Monitoring Kualitas Udara Kampus berbasis IoT",
        ketua: "Ir. Eko Purwanto, M.T.",
        fokus: "Teknologi Informasi & IoT",
        status: "Belum Ditugaskan",
        reviewer1: "",
        reviewer2: "",
        keywords: [
          "IoT",
          "Sensor",
          "Polusi Udara",
          "Smart Campus",
          "Embedded System",
        ],
      },
      {
        id: "PRP-FAK-005",
        judul: "Penyuluhan Gizi Balita di Tembalang",
        ketua: "Dr. Rina Astuti",
        fokus: "Kesehatan Masyarakat",
        status: "Sudah Ditugaskan",
        reviewer1: "Prof. Dr. Ir. Slamet Riyadi, M.T.",
        reviewer2: "",
        keywords: ["Gizi", "Balita", "Penyuluhan", "Kesehatan"],
      },
    ],
    lppm: [
      {
        id: "PRP-UNIV-010",
        judul: "Pengembangan Material Maju untuk Baterai EV",
        ketua: "Prof. Dr. Heru Susanto",
        fokus: "Material Maju",
        status: "Belum Ditugaskan",
        reviewer1: "",
        reviewer2: "",
        keywords: ["Baterai EV", "Material Maju", "Energi Terbarukan"],
      },
    ],
  });

  // Data yang dirender otomatis menyesuaikan Role (tanpa Tab)
  const currentData = isFakultas ? proposals.fakultas : proposals.lppm;

  const listReviewerTersedia = [
    "Prof. Dr. Ir. Slamet Riyadi, M.T.",
    "Dr. Budi Santoso, M.Kom.",
    "Dr. Siti Aminah, S.E., M.Si.",
    "Andi Susanto, S.Kom., M.Cs.",
  ];

  const handlePilihReviewerClick = (item) => {
    setSelectedItem(item);
    setReviewer1(item.reviewer1 || "");
    setReviewer2(item.reviewer2 || "");
    setView("form");
  };

  const handleSimpanPenugasan = (e) => {
    e.preventDefault();
    if (!reviewer1) {
      alert("Harap pilih minimal Reviewer 1 terlebih dahulu!");
      return;
    }

    const updatedCategory = currentData.map((p) =>
      p.id === selectedItem.id
        ? { ...p, status: "Sudah Ditugaskan", reviewer1, reviewer2 }
        : p,
    );

    setProposals({
      ...proposals,
      [isFakultas ? "fakultas" : "lppm"]: updatedCategory,
    });

    alert("Surat penugasan berhasil dikirim ke Reviewer!");
    setView("list");
  };

  return (
    <div>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Penugasan Reviewer
        </h2>
        <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
          {view === "list"
            ? "Penjadwalan dan alokasi reviewer secara manual untuk proposal yang telah lolos tahap administrasi."
            : `Form Penugasan Reviewer: ${selectedItem?.id}`}
        </p>
      </div>

      {/* --- TAMPILAN 1: DAFTAR TABEL --- */}
      {view === "list" && (
        <div style={styles.card}>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID Usulan</th>
                  <th style={styles.th}>Judul Usulan</th>
                  <th style={styles.th}>Ketua Pengusul</th>
                  <th style={styles.th}>Bidang Fokus</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((p) => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{p.id}</strong>
                    </td>
                    <td style={styles.td}>{p.judul}</td>
                    <td style={styles.td}>{p.ketua}</td>
                    <td style={styles.td}>{p.fokus}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          p.status === "Belum Ditugaskan"
                            ? styles.badgeDanger
                            : styles.badgeSuccess
                        }
                      >
                        {p.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handlePilihReviewerClick(p)}
                        style={
                          p.status === "Belum Ditugaskan"
                            ? styles.btnPrimary
                            : styles.btnOutline
                        }
                      >
                        {p.status === "Belum Ditugaskan"
                          ? "Pilih Reviewer"
                          : "Detail Penugasan"}
                      </button>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#64748b",
                      }}
                    >
                      Tidak ada proposal yang membutuhkan penugasan reviewer di
                      tingkat ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM PENUGASAN --- */}
      {view === "form" && selectedItem && (
        <div>
          <button
            onClick={() => setView("list")}
            style={{ ...styles.btnOutline, marginBottom: "20px" }}
          >
            ← Kembali ke Daftar
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Kiri: Informasi Proposal */}
            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Informasi Proposal</h4>

              <div style={styles.infoGroup}>
                <label style={styles.infoLabel}>ID Usulan:</label>
                <div style={styles.infoValue}>{selectedItem.id}</div>
              </div>

              <div style={styles.infoGroup}>
                <label style={styles.infoLabel}>Judul:</label>
                <div style={styles.infoValue}>{selectedItem.judul}</div>
              </div>

              <div style={styles.infoGroup}>
                <label style={styles.infoLabel}>Bidang Fokus:</label>
                <div style={styles.infoValue}>{selectedItem.fokus}</div>
              </div>

              <div style={styles.infoGroup}>
                <label
                  style={{
                    ...styles.infoLabel,
                    color: "#0369a1",
                    marginTop: "10px",
                  }}
                >
                  Kata Kunci (Keywords):
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "5px",
                  }}
                >
                  {selectedItem.keywords.map((kw, idx) => (
                    <span key={idx} style={styles.keywordBadge}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan: Form Reviewer */}
            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Penetapan Reviewer Manual</h4>

              <form
                onSubmit={handleSimpanPenugasan}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={styles.inputWrapper}>
                  <label style={styles.labelBlock}>Pilih Reviewer 1</label>
                  <select
                    required
                    value={reviewer1}
                    onChange={(e) => setReviewer1(e.target.value)}
                    style={styles.inputField}
                  >
                    <option value="">-- Cari & Pilih Dosen Reviewer --</option>
                    {listReviewerTersedia.map((rev, idx) => (
                      <option key={idx} value={rev}>
                        {rev}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputWrapper}>
                  <label style={styles.labelBlock}>
                    Pilih Reviewer 2 (Opsional)
                  </label>
                  <select
                    value={reviewer2}
                    onChange={(e) => setReviewer2(e.target.value)}
                    style={styles.inputField}
                  >
                    <option value="">-- Tidak ada (Hanya 1 Reviewer) --</option>
                    {listReviewerTersedia
                      .filter((r) => r !== reviewer1)
                      .map((rev, idx) => (
                        <option key={idx} value={rev}>
                          {rev}
                        </option>
                      ))}
                  </select>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#94a3b8",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    Kosongkan jika skema ini hanya mensyaratkan 1 reviewer.
                  </span>
                </div>

                <button type="submit" style={styles.btnPrimaryFull}>
                  Kirim Surat Penugasan ke Reviewer
                </button>
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
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    margin: "0 0 20px 0",
    color: "#1e293b",
    fontSize: "16px",
    borderBottom: "1px dashed #cbd5e1",
    paddingBottom: "15px",
  },

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    borderBottom: "2px solid #e2e8f0",
    padding: "12px 15px",
    textAlign: "left",
    color: "#1e293b",
    fontWeight: "bold",
  },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "15px", verticalAlign: "middle", color: "#334155" },

  // Badges
  badgeDanger: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  keywordBadge: {
    backgroundColor: "white",
    color: "#475569",
    border: "1px solid #cbd5e1",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#334155",
    border: "1px solid #cbd5e1",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnPrimaryFull: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "14px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "10px",
  },

  // Form & Info
  infoGroup: { marginBottom: "15px" },
  infoLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: "5px",
  },
  infoValue: { fontSize: "14px", color: "#334155" },
  inputWrapper: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "15px",
    borderRadius: "6px",
  },
  labelBlock: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "10px",
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
    backgroundColor: "white",
  },
};
