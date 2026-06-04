import { useState } from "react";

export default function EvaluasiProposal() {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // State untuk form manual
  const [penilaian, setPenilaian] = useState({});
  const [catatan, setCatatan] = useState("");
  const [keputusan, setKeputusan] = useState("");

  // Data Dummy Antrean dengan Detail Skor AI & Manual (Untuk yang sudah selesai)
  const [proposals, setProposals] = useState([
    {
      id: "PRP-UNIV-001",
      judul: "Sistem Deteksi Dini Kebakaran Hutan Berbasis IoT",
      skema: "Penelitian Terapan Universitas",
      jenis: "Penelitian",
      ketua: "Ir. Eko Purwanto, M.T.",
      aiScore: 620,
      aiDetailScore: { p1: 6, p2: 6, p3: 7, p4: 6, p5: 6, p6: 4 },
      aiSummary:
        "Proposal ini memiliki novelty yang kuat pada pemanfaatan sensor. Metodologi sangat jelas. Namun, RAB sedikit over-budget pada bagian honorarium.",
      status: "Menunggu Evaluasi",
    },
    {
      id: "PRP-UNIV-002",
      judul: "Penyuluhan Gizi Balita di Tembalang",
      skema: "Pengabdian Internal Universitas",
      jenis: "Pengabdian",
      ketua: "Dr. Rina Astuti",
      aiScore: 565,
      aiDetailScore: { m1: 6, m2: 6, m3: 5, m4: 5, m5: 6 },
      aiSummary:
        "Analisis permasalahan mitra sangat tajam dan solusinya aplikatif. Namun instrumen evaluasi dampak pasca-kegiatan kurang terinci dengan baik.",
      status: "Menunggu Evaluasi",
    },
    {
      id: "PRP-UNIV-003",
      judul: "Pengembangan Algoritma Kriptografi Ringan untuk Perangkat Edge",
      skema: "Penelitian Dasar Universitas",
      jenis: "Penelitian",
      ketua: "Dr. Budi Santoso, M.Kom.",
      aiScore: 680,
      aiDetailScore: { p1: 7, p2: 7, p3: 7, p4: 6, p5: 7, p6: 6 },
      aiSummary:
        "Tinjauan pustaka sangat mutakhir dan relevan. Metodologi dijabarkan dengan sangat sistematis. Luaran target jurnal Q1 sangat realistis dengan rekam jejak pengusul.",
      status: "Evaluasi Selesai",
      // Data Manual yang sudah diinput sebelumnya:
      manualScore: { p1: 7, p2: 6, p3: 7, p4: 6, p5: 7, p6: 5 },
      catatanReviewer:
        "Sangat baik dan komprehensif. Perlu sedikit penyesuaian pada RAB bagian publikasi agar lebih optimal.",
      keputusanReviewer: "Didanai",
    },
    {
      id: "PRP-UNIV-004",
      judul: "Pendampingan Digital Marketing UMKM Batik Demak",
      skema: "Pengabdian Kemitraan Masyarakat",
      jenis: "Pengabdian",
      ketua: "Siti Aminah, S.E., M.Si.",
      aiScore: 420,
      aiDetailScore: { m1: 5, m2: 5, m3: 4, m4: 2, m5: 4 },
      aiSummary:
        "Analisis mitra cukup baik, namun RAB banyak yang kurang wajar pada komponen belanja bahan. Metode partisipasi mitra juga perlu dirinci ulang.",
      status: "Evaluasi Selesai",
      // Data Manual yang sudah diinput sebelumnya:
      manualScore: { m1: 4, m2: 5, m3: 4, m4: 2, m5: 4 },
      catatanReviewer:
        "RAB terlalu membengkak pada pembelian barang modal yang tidak relevan dengan esensi pengabdian. Harus direvisi total.",
      keputusanReviewer: "Revisi",
    },
  ]);

  // Definisi Lengkap Rubrik Penilaian (Sesuai Gambar Skala 1-7)
  const rubrikPenelitian = [
    {
      id: "p1",
      kriteria: "Masalah Penelitian dan Urgensi",
      bobot: 25,
      deskripsi:
        "Skor 6-7: Masalah sangat jelas, urgen, originalitas tinggi, state of the art komprehensif. | Skor 4-5: Masalah jelas namun kurang menggambarkan urgensi atau originalitas biasa. | Skor 2-3: Masalah kurang jelas, relevansi lemah, state of the art tidak memadai. | Skor 1: Masalah tidak jelas, tidak relevan, tidak ada state of the art.",
    },
    {
      id: "p2",
      kriteria: "Tinjauan Pustaka dan Landasan Teori",
      bobot: 15,
      deskripsi:
        "Skor 6-7: Pustaka sangat mutakhir (mayoritas <= 5 tahun), relevan, dari jurnal bereputasi. | Skor 4-5: Pustaka cukup mutakhir, ada beberapa referensi lama atau kurang relevan. | Skor 2-3: Banyak referensi lama (>10 tahun) atau kurang relevan, landasan teori lemah. | Skor 1: Pustaka sangat minim, tidak relevan, atau teori tidak ada.",
    },
    {
      id: "p3",
      kriteria: "Metode Penelitian",
      bobot: 30,
      deskripsi:
        "Skor 6-7: Metode sangat tepat, tahapan sangat rinci dan sistematis, analisis data jelas dan tepat. | Skor 4-5: Metode tepat, tahapan cukup rinci namun ada bagian yang kurang detail. | Skor 2-3: Metode kurang tepat, tahapan tidak rinci, analisis data tidak jelas. | Skor 1: Metode tidak tepat atau tidak ada tahapan yang jelas.",
    },
    {
      id: "p4",
      kriteria: "Kelayakan Peneliti dan Sarana",
      bobot: 15,
      deskripsi:
        "Skor 6-7: Tim sangat kompeten, track record publikasi kuat, sarana sangat mendukung. | Skor 4-5: Tim cukup kompeten, track record memadai, sarana tersedia. | Skor 2-3: Kompetensi tim kurang sesuai atau track record lemah, sarana terbatas. | Skor 1: Tim tidak kompeten dan sarana tidak memadai.",
    },
    {
      id: "p5",
      kriteria: "Luaran dan Dampak Penelitian",
      bobot: 10,
      deskripsi:
        "Skor 6-7: Luaran sangat jelas, ambisius, target jurnal internasional bereputasi atau paten. | Skor 4-5: Luaran jelas dan realistis namun dampak terbatas atau target jurnal nasional. | Skor 2-3: Luaran kurang jelas atau terlalu minimal, dampak tidak terukur. | Skor 1: Luaran tidak jelas atau tidak ada.",
    },
    {
      id: "p6",
      kriteria: "Rencana Anggaran Biaya (RAB)",
      bobot: 5,
      deskripsi:
        "Skor 6-7: Anggaran sangat wajar, rinci, dan sangat sesuai dengan kegiatan penelitian. | Skor 4-5: Anggaran wajar dan cukup rinci namun ada beberapa pos yang kurang sesuai. | Skor 2-3: Anggaran kurang wajar atau rincian tidak lengkap. | Skor 1: Anggaran tidak wajar atau tidak ada rincian.",
    },
  ];

  const rubrikPengabdian = [
    {
      id: "m1",
      kriteria: "Analisis Situasi & Masalah Mitra",
      bobot: 25,
      deskripsi:
        "Skor 6-7: Identifikasi masalah mitra sangat tajam dan komprehensif. | Skor 4-5: Identifikasi masalah cukup baik namun kurang spesifik. | Skor 2-3: Identifikasi masalah lemah dan tidak relevan. | Skor 1: Tidak ada identifikasi masalah yang jelas.",
    },
    {
      id: "m2",
      kriteria: "Solusi & Metodologi Pelaksanaan",
      bobot: 25,
      deskripsi:
        "Skor 6-7: Metode transfer teknologi sangat tepat dan aplikatif. | Skor 4-5: Metode cukup tepat namun partisipasi mitra kurang jelas. | Skor 2-3: Metode kurang sesuai dengan masalah mitra. | Skor 1: Metode tidak logis.",
    },
    {
      id: "m3",
      kriteria: "Target Luaran & Dampak",
      bobot: 20,
      deskripsi:
        "Skor 6-7: Dampak keberdayaan mitra sangat terukur dan signifikan. | Skor 4-5: Dampak terlihat namun kurang terukur. | Skor 2-3: Dampak minimal dan tidak jelas kelanjutannya. | Skor 1: Tidak berdampak.",
    },
    {
      id: "m4",
      kriteria: "Kelayakan RAB & Jadwal",
      bobot: 15,
      deskripsi:
        "Skor 6-7: RAB sangat rasional dan jadwal kegiatan sangat realistis. | Skor 4-5: RAB cukup wajar namun jadwal sedikit padat. | Skor 2-3: RAB tidak efisien dan jadwal tidak logis. | Skor 1: RAB sangat membengkak dan tidak berdasar.",
    },
    {
      id: "m5",
      kriteria: "Rekam Jejak Tim",
      bobot: 15,
      deskripsi:
        "Skor 6-7: Tim sangat multidisiplin dan relevan dengan bidang pengabdian. | Skor 4-5: Tim cukup relevan. | Skor 2-3: Kompetensi tim kurang mendukung program. | Skor 1: Tim tidak kompeten di bidangnya.",
    },
  ];

  const handleMulaiEvaluasi = (item) => {
    setSelectedItem(item);

    // Jika statusnya sudah selesai, isi form dengan nilai yang sudah ada
    if (item.status === "Evaluasi Selesai") {
      setPenilaian(item.manualScore || {});
      setCatatan(item.catatanReviewer || "");
      setKeputusan(item.keputusanReviewer || "");
    } else {
      // Jika baru, kosongkan form
      setPenilaian({});
      setCatatan("");
      setKeputusan("");
    }

    setView("form");
  };

  const handleNilaiChange = (idKriteria, value) => {
    let val = parseInt(value, 10);
    if (isNaN(val)) val = "";
    else if (val > 7)
      val = 7; // Batas maksimal diubah menjadi 7
    else if (val < 0) val = 0;

    setPenilaian({ ...penilaian, [idKriteria]: val });
  };

  const hitungTotalSkor = (tipePenilaian) => {
    if (!selectedItem) return 0;
    const rubrik =
      selectedItem.jenis === "Penelitian" ? rubrikPenelitian : rubrikPengabdian;
    let total = 0;

    rubrik.forEach((r) => {
      // tipePenilaian: "manual" atau "ai"
      const skor =
        tipePenilaian === "ai"
          ? selectedItem.aiDetailScore?.[r.id] || 0
          : penilaian[r.id] || 0;

      total += skor * r.bobot; // Rumus: Skor (1-7) x Bobot = Max 700
    });
    return total;
  };

  const handleSimpanEvaluasi = (e) => {
    e.preventDefault();
    if (!keputusan) {
      alert("Pilih rekomendasi keputusan terlebih dahulu!");
      return;
    }
    const finalScore = hitungTotalSkor("manual");
    alert(
      `Evaluasi disimpan! Skor Akhir Anda: ${finalScore} | Keputusan: ${keputusan}`,
    );

    // Update status di array dummy
    const updated = proposals.map((p) =>
      p.id === selectedItem.id
        ? {
            ...p,
            status: "Evaluasi Selesai",
            manualScore: penilaian,
            catatanReviewer: catatan,
            keputusanReviewer: keputusan,
          }
        : p,
    );
    setProposals(updated);
    setView("list");
  };

  const currentRubrik =
    selectedItem?.jenis === "Penelitian" ? rubrikPenelitian : rubrikPengabdian;

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Evaluasi Proposal (Desk Review)
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Lakukan penilaian secara mandiri menggunakan tabel rubrik evaluasi di
          bawah ini.
        </p>
      </div>

      {/* --- TAMPILAN 1: TABEL ANTREAN --- */}
      {view === "list" && (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Proposal</th>
                <th style={styles.th}>Judul & Skema</th>
                <th style={styles.th}>Ketua Pengusul</th>
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
                  <td style={styles.td}>
                    <div style={{ fontWeight: "bold" }}>{item.judul}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {item.skema}
                    </div>
                  </td>
                  <td style={styles.td}>{item.ketua}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Menunggu Evaluasi"
                          ? styles.badgeWarning
                          : styles.badgeSuccess
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleMulaiEvaluasi(item)}
                      style={
                        item.status === "Menunggu Evaluasi"
                          ? styles.btnPrimary
                          : styles.btnOutline
                      }
                    >
                      {item.status === "Menunggu Evaluasi"
                        ? "Mulai Review"
                        : "Lihat / Edit Hasil"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAMPILAN 2: FORM EVALUASI LENGKAP --- */}
      {view === "form" && selectedItem && (
        <div>
          <button
            onClick={() => setView("list")}
            style={{ ...styles.btnOutline, marginBottom: "20px" }}
          >
            ← Kembali ke Antrean
          </button>

          {/* INFORMASI ATAS: DATA PROPOSAL & RINGKASAN AI */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={styles.cardBox}>
              <h4 style={styles.cardTitle}>Informasi Proposal</h4>
              <div style={styles.infoRow}>
                <strong>ID Proposal:</strong> {selectedItem.id}
              </div>
              <div style={styles.infoRow}>
                <strong>Ketua Pengusul:</strong> {selectedItem.ketua}
              </div>
              <div style={styles.infoRow}>
                <strong>Skema:</strong> {selectedItem.skema}
              </div>
              <div style={{ ...styles.infoRow, marginTop: "10px" }}>
                <strong>Judul:</strong>
                <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
                  {selectedItem.judul}
                </p>
              </div>
              <button style={{ ...styles.btnDoc, marginTop: "10px" }}>
                📄 Unduh Proposal_Lengkap.pdf
              </button>
            </div>

            <div style={styles.aiBox}>
              <div style={styles.aiHeader}>
                ✨ Ringkasan Analisis AI Assistant
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#334155",
                  lineHeight: "1.6",
                  marginTop: "10px",
                }}
              >
                {selectedItem.aiSummary}
              </p>
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "6px",
                  display: "inline-block",
                  color: "#166534",
                  fontWeight: "bold",
                }}
              >
                Estimasi Total Skor AI: {hitungTotalSkor("ai")} / 700
              </div>
            </div>
          </div>

          {/* TABEL PENILAIAN LENGKAP (PERSIS GAMBAR) */}
          <form onSubmit={handleSimpanEvaluasi}>
            <div
              style={{
                overflowX: "auto",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                marginBottom: "30px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr>
                    <th style={styles.rubrikTh}>No.</th>
                    <th style={styles.rubrikTh}>Kriteria</th>
                    <th style={styles.rubrikTh}>Bobot (%)</th>
                    <th style={styles.rubrikTh}>Skala Skor</th>
                    <th style={styles.rubrikTh}>Panduan Penilaian</th>
                    <th
                      style={{
                        ...styles.rubrikTh,
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                      }}
                    >
                      Skor AI
                    </th>
                    <th
                      style={{
                        ...styles.rubrikTh,
                        backgroundColor: "#1a1a2e",
                        color: "white",
                      }}
                    >
                      Nilai Anda
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRubrik.map((r, index) => (
                    <tr key={r.id}>
                      <td
                        style={{
                          ...styles.rubrikTd,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td style={{ ...styles.rubrikTd, fontWeight: "bold" }}>
                        {r.kriteria}
                      </td>
                      <td style={{ ...styles.rubrikTd, textAlign: "center" }}>
                        {r.bobot}
                      </td>
                      <td style={{ ...styles.rubrikTd, textAlign: "center" }}>
                        1-7
                      </td>
                      <td style={styles.rubrikTd}>
                        <ul
                          style={{
                            paddingLeft: "15px",
                            margin: 0,
                            color: "#475569",
                            lineHeight: "1.6",
                          }}
                        >
                          {r.deskripsi.split(" | ").map((descLine, i) => (
                            <li key={i}>{descLine}</li>
                          ))}
                        </ul>
                      </td>
                      <td
                        style={{
                          ...styles.rubrikTd,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#15803d",
                          fontSize: "16px",
                        }}
                      >
                        {selectedItem.aiDetailScore[r.id]}
                      </td>
                      <td style={{ ...styles.rubrikTd, textAlign: "center" }}>
                        <input
                          type="number"
                          min="1"
                          max="7"
                          required
                          placeholder="1-7"
                          value={
                            penilaian[r.id] !== undefined ? penilaian[r.id] : ""
                          }
                          onChange={(e) =>
                            handleNilaiChange(r.id, e.target.value)
                          }
                          style={styles.inputScoreTable}
                        />
                      </td>
                    </tr>
                  ))}
                  {/* BARIS TOTAL SKOR */}
                  <tr
                    style={{
                      backgroundColor: "#f1f5f9",
                      borderTop: "2px solid #94a3b8",
                    }}
                  >
                    <td
                      colSpan="5"
                      style={{
                        ...styles.rubrikTd,
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      TOTAL SKOR (Skor × Bobot)
                    </td>
                    <td
                      style={{
                        ...styles.rubrikTd,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#15803d",
                        fontSize: "16px",
                      }}
                    >
                      {hitungTotalSkor("ai")}
                    </td>
                    <td
                      style={{
                        ...styles.rubrikTd,
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#1a1a2e",
                        fontSize: "18px",
                      }}
                    >
                      {hitungTotalSkor("manual")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* KESIMPULAN & CATATAN */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div>
                <label style={styles.labelBlock}>
                  Catatan Evaluasi / Saran Perbaikan
                </label>
                <textarea
                  required
                  rows="5"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Ketik catatan evaluasi secara mendetail di sini..."
                  style={styles.inputField}
                ></textarea>
              </div>

              <div>
                <label style={styles.labelBlock}>
                  Rekomendasi Keputusan Akhir
                </label>
                <select
                  required
                  value={keputusan}
                  onChange={(e) => setKeputusan(e.target.value)}
                  style={{ ...styles.inputField, marginBottom: "20px" }}
                >
                  <option value="">-- Pilih Keputusan --</option>
                  <option value="Didanai">Diterima / Didanai</option>
                  <option value="Revisi">Diterima dengan Revisi</option>
                  <option value="Ditolak">Ditolak</option>
                </select>

                <button type="submit" style={styles.btnPrimaryFull}>
                  💾 Simpan Hasil Evaluasi
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// === STYLES ===
const styles = {
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

  // Styles Khusus Tabel Rubrik
  rubrikTh: {
    backgroundColor: "#e2e8f0",
    border: "1px solid #cbd5e1",
    padding: "12px 8px",
    textAlign: "center",
    color: "#1e293b",
  },
  rubrikTd: {
    border: "1px solid #cbd5e1",
    padding: "12px",
    verticalAlign: "top",
    color: "#334155",
  },

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
  btnPrimary: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "6px 12px",
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
  infoRow: { marginBottom: "8px", fontSize: "13px", color: "#334155" },
  btnDoc: {
    backgroundColor: "white",
    color: "#1e293b",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },
  aiBox: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    padding: "20px",
    borderRadius: "8px",
  },
  aiHeader: {
    color: "#15803d",
    fontWeight: "bold",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "1px solid #bbf7d0",
    paddingBottom: "10px",
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
  inputScoreTable: {
    width: "60px",
    padding: "10px 5px",
    borderRadius: "4px",
    border: "2px solid #cbd5e1",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  btnPrimaryFull: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "15px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
};
