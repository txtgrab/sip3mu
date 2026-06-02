import { useState } from "react";

export default function EvaluasiProposal() {
  const [view, setView] = useState("list");
  const [selectedProposal, setSelectedProposal] = useState(null);

  // State untuk form input Reviewer
  const [formScores, setFormScores] = useState({ c1: "", c2: "", c3: "" });
  const [formCatatan, setFormCatatan] = useState("");
  const [formKeputusan, setFormKeputusan] = useState("");

  // Kalkulasi rata-rata nilai Reviewer secara otomatis
  const hitungRataRata = () => {
    const c1 = Number(formScores.c1) || 0;
    const c2 = Number(formScores.c2) || 0;
    const c3 = Number(formScores.c3) || 0;
    if (c1 === 0 && c2 === 0 && c3 === 0) return 0;
    return Math.round((c1 + c2 + c3) / 3);
  };

  // Data dummy proposal dengan detail skor kriteria (AI & Reviewer)
  const [proposals] = useState([
    {
      id: "PRP-001",
      judul: "Pengembangan Sistem Deteksi Dini Penyakit dengan AI",
      ketua: "Dr. Budi Santoso",
      skema: "Penelitian Terapan",
      status: "Menunggu Review",
      tglTugas: "02 Juni 2026",
      aiDetails: { c1: 85, c2: 80, c3: 90 }, // c1: Novelty, c2: Metodologi, c3: RAB
      aiScore: 85,
      aiNotes:
        "Proposal ini memiliki novelty yang kuat pada pemanfaatan model AI terkini. Namun, metodologi evaluasi performa model kurang dijelaskan secara rinci. RAB sudah sesuai standar.",
    },
    {
      id: "PRP-002",
      judul: "Pemberdayaan UMKM Batik melalui E-Commerce",
      ketua: "Siti Aminah, M.Kom",
      skema: "Pengabdian Masyarakat",
      status: "Selesai Direview",
      tglTugas: "28 Mei 2026",
      aiDetails: { c1: 90, c2: 88, c3: 92 },
      aiScore: 90,
      aiNotes:
        "Target luaran sangat relevan dengan kebutuhan mitra. Pendekatan pemecahan masalah praktis dan terukur.",
      reviewerDetails: { c1: 90, c2: 92, c3: 94 },
      reviewerScore: "92",
      reviewerNotes:
        "Proposal sangat bagus, luaran jelas, dan RAB rasional. Pendekatan e-commerce sangat tepat sasaran. Sangat direkomendasikan untuk segera didanai.",
      reviewerDecision: "Diterima / Didanai",
    },
  ]);

  const handleNilaiClick = (proposal) => {
    setSelectedProposal(proposal);
    // Reset form saat membuka proposal baru
    setFormScores({ c1: "", c2: "", c3: "" });
    setFormCatatan("");
    setFormKeputusan("");
    setView("form");
  };

  const handleLihatHasilClick = (proposal) => {
    setSelectedProposal(proposal);
    setView("result");
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Penilaian berhasil disimpan!");
    setView("list");
  };

  const handleScoreChange = (kriteria, value) => {
    setFormScores((prev) => ({ ...prev, [kriteria]: value }));
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>Evaluasi Proposal</h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          {view === "list" &&
            "Daftar proposal penelitian dan pengabdian yang perlu Anda nilai."}
          {view === "form" &&
            `Form penilaian proposal: ${selectedProposal?.id}`}
          {view === "result" &&
            `Hasil evaluasi proposal: ${selectedProposal?.id}`}
        </p>
      </div>

      {/* --- TAMPILAN 1: TABEL DAFTAR PROPOSAL --- */}
      {view === "list" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Proposal</th>
                <th style={styles.th}>Judul Usulan</th>
                <th style={styles.th}>Skema</th>
                <th style={styles.th}>Tanggal Penugasan</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={styles.td}>{item.judul}</td>
                  <td style={styles.td}>{item.skema}</td>
                  <td style={styles.td}>{item.tglTugas}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Menunggu Review"
                          ? styles.badgeWarning
                          : styles.badgeSuccess
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={
                        item.status === "Menunggu Review"
                          ? styles.btnPrimary
                          : styles.btnSecondary
                      }
                      onClick={() =>
                        item.status === "Menunggu Review"
                          ? handleNilaiClick(item)
                          : handleLihatHasilClick(item)
                      }
                    >
                      {item.status === "Menunggu Review"
                        ? "Nilai Proposal"
                        : "Lihat Hasil"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM PENILAIAN ATAU LIHAT HASIL --- */}
      {(view === "form" || view === "result") && selectedProposal && (
        <div>
          <button onClick={() => setView("list")} style={styles.btnOutline}>
            ← Kembali ke Daftar
          </button>

          {/* BAGIAN ATAS: INFO PROPOSAL FULL WIDTH */}
          <div
            style={{ ...styles.card, marginTop: "15px", marginBottom: "20px" }}
          >
            <h4 style={{ margin: "0 0 15px 0", color: "#1a1a2e" }}>
              Informasi Proposal
            </h4>
            <div style={styles.grid3}>
              <div style={styles.infoRow}>
                <strong>Judul Usulan:</strong>{" "}
                <span>{selectedProposal.judul}</span>
              </div>
              <div style={styles.infoRow}>
                <strong>Ketua Pengusul:</strong>{" "}
                <span>{selectedProposal.ketua}</span>
              </div>
              <div style={styles.infoRow}>
                <strong>Skema:</strong> <span>{selectedProposal.skema}</span>
              </div>
            </div>
            <button style={{ ...styles.btnSecondary, marginTop: "15px" }}>
              📄 Unduh / Lihat Dokumen PDF
            </button>
          </div>

          {/* BAGIAN BAWAH: GRID 2 KOLOM (SEJAJAR AI vs REVIEWER) */}
          <div style={styles.grid2}>
            {/* KOLOM KIRI: KOTAK AI ASSISTANT */}
            <div style={styles.aiBox}>
              <div style={styles.aiHeader}>
                <h4 style={{ margin: 0 }}>✨ AI Review Assistant</h4>
                <span style={styles.aiBadge}>Rekomendasi</span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b21a8",
                  marginTop: "5px",
                  marginBottom: "15px",
                }}
              >
                Analisis mendalam berdasarkan model bahasa lokal (Qwen 14B).
              </p>

              {/* Detail Kriteria AI */}
              <div style={styles.kriteriaBox}>
                <div style={styles.kriteriaRow}>
                  <span>1. Relevansi & Kebaruan (Novelty)</span>
                  <strong>{selectedProposal.aiDetails.c1}</strong>
                </div>
                <div style={styles.kriteriaRow}>
                  <span>2. Metodologi & Pelaksanaan</span>
                  <strong>{selectedProposal.aiDetails.c2}</strong>
                </div>
                <div style={styles.kriteriaRow}>
                  <span>3. Kelayakan RAB & Jadwal</span>
                  <strong>{selectedProposal.aiDetails.c3}</strong>
                </div>
                <div
                  style={{
                    ...styles.kriteriaRow,
                    borderBottom: "none",
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "2px solid #d8b4fe",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    Rata-Rata Skor AI
                  </span>
                  <strong style={{ fontSize: "18px", color: "#6b21a8" }}>
                    {selectedProposal.aiScore}
                  </strong>
                </div>
              </div>

              {/* Justifikasi AI */}
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: "6px",
                  border: "1px solid #e9d5ff",
                }}
              >
                <strong style={{ fontSize: "12px", color: "#6b21a8" }}>
                  Justifikasi Penilaian AI:
                </strong>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: "#4c1d95",
                  }}
                >
                  {selectedProposal.aiNotes}
                </p>
              </div>
            </div>

            {/* KOLOM KANAN: FORM ATAU HASIL REVIEWER */}
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
                  ? "Penilaian Mandiri (Reviewer)"
                  : "Hasil Penilaian Anda"}
              </h4>

              {view === "form" ? (
                // --- MODE INPUT (FORM) ---
                <form
                  onSubmit={handleSimpan}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  {/* Rincian Input Kriteria */}
                  <div style={styles.reviewerKriteriaBox}>
                    <div style={styles.reviewerKriteriaRow}>
                      <label>1. Relevansi & Kebaruan (Novelty)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        style={styles.inputKriteria}
                        value={formScores.c1}
                        onChange={(e) =>
                          handleScoreChange("c1", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div style={styles.reviewerKriteriaRow}>
                      <label>2. Metodologi & Pelaksanaan</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        style={styles.inputKriteria}
                        value={formScores.c2}
                        onChange={(e) =>
                          handleScoreChange("c2", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div style={styles.reviewerKriteriaRow}>
                      <label>3. Kelayakan RAB & Jadwal</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        style={styles.inputKriteria}
                        value={formScores.c3}
                        onChange={(e) =>
                          handleScoreChange("c3", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div
                      style={{
                        ...styles.reviewerKriteriaRow,
                        borderBottom: "none",
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: "2px solid #cbd5e1",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Rata-Rata Skor Akhir
                      </span>
                      <strong style={{ fontSize: "18px", color: "#1a1a2e" }}>
                        {hitungRataRata()}
                      </strong>
                    </div>
                  </div>

                  <div>
                    <label style={styles.labelBlock}>
                      Catatan Evaluasi / Saran Perbaikan
                    </label>
                    <textarea
                      style={{ ...styles.inputField, height: "120px" }}
                      placeholder="Ketik catatan evaluasi Anda di sini..."
                      value={formCatatan}
                      onChange={(e) => setFormCatatan(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>
                      Rekomendasi Keputusan
                    </label>
                    <select
                      style={styles.inputField}
                      value={formKeputusan}
                      onChange={(e) => setFormKeputusan(e.target.value)}
                      required
                    >
                      <option value="">-- Pilih Keputusan --</option>
                      <option value="Diterima">Diterima / Didanai</option>
                      <option value="Revisi">Diterima dengan Revisi</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      borderTop: "1px solid #eee",
                      paddingTop: "15px",
                    }}
                  >
                    <button type="submit" style={styles.btnPrimaryFull}>
                      Simpan Hasil Evaluasi
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
                  {/* Rincian Hasil Kriteria */}
                  <div style={styles.reviewerKriteriaBox}>
                    <div style={styles.kriteriaRow}>
                      <span>1. Relevansi & Kebaruan (Novelty)</span>
                      <strong>{selectedProposal.reviewerDetails?.c1}</strong>
                    </div>
                    <div style={styles.kriteriaRow}>
                      <span>2. Metodologi & Pelaksanaan</span>
                      <strong>{selectedProposal.reviewerDetails?.c2}</strong>
                    </div>
                    <div style={styles.kriteriaRow}>
                      <span>3. Kelayakan RAB & Jadwal</span>
                      <strong>{selectedProposal.reviewerDetails?.c3}</strong>
                    </div>
                    <div
                      style={{
                        ...styles.kriteriaRow,
                        borderBottom: "none",
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: "2px solid #cbd5e1",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Rata-Rata Skor Akhir
                      </span>
                      <strong style={{ fontSize: "18px", color: "#1a1a2e" }}>
                        {selectedProposal.reviewerScore}
                      </strong>
                    </div>
                  </div>

                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>
                      Catatan Evaluasi / Saran Perbaikan
                    </label>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#334155",
                      }}
                    >
                      {selectedProposal.reviewerNotes}
                    </p>
                  </div>

                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>
                      Rekomendasi Keputusan
                    </label>
                    <span style={styles.badgeSuccessLg}>
                      {selectedProposal.reviewerDecision}
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
                    🔒 Penilaian ini telah dikunci dan diserahkan kepada
                    Operator LPPM.
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
    backgroundColor: "#fff3cd",
    color: "#856404",
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

  // Layout
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    alignItems: "start",
  },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" },
  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    fontSize: "13px",
    color: "#334155",
  },

  // Gaya khusus AI Box & Kriteria
  aiBox: {
    backgroundColor: "#f3e8ff",
    borderRadius: "8px",
    padding: "20px",
    border: "1px solid #d8b4fe",
  },
  aiHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6b21a8",
  },
  aiBadge: {
    backgroundColor: "#6b21a8",
    color: "white",
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  kriteriaBox: {
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "15px",
    border: "1px solid #e9d5ff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  kriteriaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px dashed #eee",
    fontSize: "13px",
    color: "#334155",
  },

  // Gaya Kriteria Reviewer
  reviewerKriteriaBox: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    padding: "15px",
    border: "1px solid #cbd5e1",
  },
  reviewerKriteriaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: "1px dashed #e2e8f0",
    fontSize: "13px",
    color: "#334155",
  },
  inputKriteria: {
    width: "60px",
    padding: "6px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: "bold",
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
