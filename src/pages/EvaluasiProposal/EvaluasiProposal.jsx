import { useState } from "react";

export default function EvaluasiProposal() {
  // State untuk mengontrol tampilan: 'list', 'form' (isi nilai), atau 'result' (lihat hasil)
  const [view, setView] = useState("list");
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Data dummy proposal yang ditugaskan ke Reviewer
  const [proposals] = useState([
    {
      id: "PRP-001",
      judul: "Pengembangan Sistem Deteksi Dini Penyakit dengan AI",
      ketua: "Dr. Budi Santoso",
      skema: "Penelitian Terapan",
      status: "Menunggu Review",
      tglTugas: "02 Juni 2026",
      aiScore: "85",
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
      aiScore: "90",
      aiNotes:
        "Target luaran sangat relevan dengan kebutuhan mitra. Pendekatan pemecahan masalah praktis dan terukur.",
      // Data tambahan untuk hasil yang sudah dinilai
      reviewerScore: "92",
      reviewerNotes:
        "Proposal sangat bagus, luaran jelas, dan RAB rasional. Pendekatan e-commerce sangat tepat sasaran. Sangat direkomendasikan untuk segera didanai.",
      reviewerDecision: "Diterima / Didanai",
    },
  ]);

  const handleNilaiClick = (proposal) => {
    setSelectedProposal(proposal);
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
                    {/* Logika Tombol Berdasarkan Status */}
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

          <div style={styles.grid2}>
            {/* Kolom Kiri: Detail Usulan & AI Assistant */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Info Proposal */}
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
                  <strong>Judul:</strong> <span>{selectedProposal.judul}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Ketua Pengusul:</strong>{" "}
                  <span>{selectedProposal.ketua}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Skema:</strong> <span>{selectedProposal.skema}</span>
                </div>
                <button
                  style={{
                    ...styles.btnSecondary,
                    marginTop: "15px",
                    width: "100%",
                  }}
                >
                  📄 Unduh / Lihat Dokumen PDF
                </button>
              </div>

              {/* Kotak AI Review Assistant */}
              <div style={styles.aiBox}>
                <div style={styles.aiHeader}>
                  <h4 style={{ margin: 0 }}>✨ AI Review Assistant</h4>
                  <span style={styles.aiBadge}>Rekomendasi</span>
                </div>
                <p
                  style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}
                >
                  Berdasarkan pemrosesan LLM lokal (Qwen 14B) terhadap dokumen
                  PDF proposal:
                </p>
                <div style={{ marginTop: "15px" }}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#6b21a8",
                    }}
                  >
                    Skor Draf: {selectedProposal.aiScore}/100
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "rgba(255,255,255,0.6)",
                      borderRadius: "6px",
                    }}
                  >
                    <strong>Justifikasi AI:</strong>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "13px",
                        lineHeight: "1.5",
                      }}
                    >
                      {selectedProposal.aiNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Penilaian (Edit) ATAU Hasil Penilaian (Read Only) */}
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
                  <div>
                    <label style={styles.labelBlock}>Skor Akhir (0-100)</label>
                    <input
                      type="number"
                      max="100"
                      min="0"
                      style={styles.inputField}
                      placeholder="Masukkan nilai..."
                      required
                    />
                  </div>
                  <div>
                    <label style={styles.labelBlock}>
                      Catatan Evaluasi / Saran Perbaikan
                    </label>
                    <textarea
                      style={{ ...styles.inputField, height: "150px" }}
                      placeholder="Ketik catatan evaluasi Anda di sini..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label style={styles.labelBlock}>
                      Rekomendasi Keputusan
                    </label>
                    <select style={styles.inputField} required>
                      <option value="">-- Pilih Keputusan --</option>
                      <option value="Diterima">Diterima / Didanai</option>
                      <option value="Revisi">Diterima dengan Revisi</option>
                      <option value="Ditolak">Ditolak</option>
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
                  <div style={styles.resultBox}>
                    <label style={styles.labelBlock}>Skor Akhir</label>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#1a1a2e",
                      }}
                    >
                      {selectedProposal.reviewerScore}{" "}
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        /100
                      </span>
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
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeSuccessLg: {
    backgroundColor: "#d4edda",
    color: "#155724",
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

  // Gaya khusus AI Box
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
