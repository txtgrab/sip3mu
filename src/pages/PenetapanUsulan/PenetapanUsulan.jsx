import { useState } from "react";

export default function PenetapanUsulan() {
  // State untuk Tab (desk atau paparan)
  const [activeTab, setActiveTab] = useState("desk");
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // State untuk form keputusan Operator
  const [skorFinal, setSkorFinal] = useState("");
  const [keputusanFinal, setKeputusanFinal] = useState("");
  const [danaDisetujui, setDanaDisetujui] = useState("");
  const [catatanOperator, setCatatanOperator] = useState("");

  // ==========================================
  // DATA DUMMY: TAB 1 (DESK REVIEW)
  // ==========================================
  const [proposalsDesk, setProposalsDesk] = useState([
    {
      id: "PRP-UNIV-001",
      judul: "Pengembangan Algoritma Kriptografi Ringan untuk Perangkat Edge",
      skema: "Penelitian Dasar Universitas",
      jenis: "Penelitian",
      ketua: "Dr. Budi Santoso, M.Kom.",
      danaDiusulkan: "Rp 20.000.000",
      skorReviewer: 680,
      rekomendasiReviewer: "Lolos ke Paparan",
      catatanReviewer: "Sangat baik dan komprehensif. Layak presentasi.",
      status: "Menunggu Penetapan",
    },
    {
      id: "PRP-UNIV-002",
      judul: "Pendampingan Digital Marketing UMKM Batik Demak",
      skema: "Pengabdian Kemitraan Masyarakat",
      jenis: "Pengabdian",
      ketua: "Siti Aminah, S.E., M.Si.",
      danaDiusulkan: "Rp 15.000.000",
      skorReviewer: 420,
      rekomendasiReviewer: "Revisi / Tidak Lolos",
      catatanReviewer: "RAB terlalu membengkak. Tidak disarankan lanjut.",
      status: "Menunggu Penetapan",
    },
  ]);

  // ==========================================
  // DATA DUMMY: TAB 2 (PAPARAN & PENDANAAN)
  // ==========================================
  const [proposalsPaparan, setProposalsPaparan] = useState([
    {
      id: "PRP-UNIV-003",
      judul: "Sistem Deteksi Dini Kebakaran Hutan Berbasis IoT",
      skema: "Penelitian Terapan Universitas",
      jenis: "Penelitian",
      ketua: "Ir. Eko Purwanto, M.T.",
      danaDiusulkan: "Rp 18.000.000",
      skorDesk: 610,
      skorPaparan: 88,
      rekomendasiReviewer: "Didanai",
      catatanReviewer: "Presentasi sangat meyakinkan. Layak didanai penuh.",
      status: "Menunggu Keputusan Pendanaan",
    },
    {
      id: "PRP-UNIV-004",
      judul: "Pemanfaatan AI untuk Analisis Cuaca",
      skema: "Penelitian Terapan Universitas",
      jenis: "Penelitian",
      ketua: "Dr. Rina Astuti",
      danaDiusulkan: "Rp 15.000.000",
      skorDesk: 550,
      skorPaparan: 60,
      rekomendasiReviewer: "Ditolak",
      catatanReviewer:
        "Penguasaan materi kurang, target luaran tidak realistis.",
      status: "Sudah Ditetapkan",
      skorFinalFix: 610,
    },
  ]);

  // Fungsi Pindah Tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setView("list");
  };

  const handleBukaDetail = (item) => {
    setSelectedItem(item);
    if (item.status === "Sudah Ditetapkan") {
      setSkorFinal(item.skorFinalFix);
      setKeputusanFinal("");
      setDanaDisetujui("");
      setCatatanOperator("");
    } else {
      // Logic default skor
      if (activeTab === "desk") {
        setSkorFinal(item.skorReviewer || "");
      } else {
        setSkorFinal((item.skorDesk || 0) + (item.skorPaparan || 0));
      }
      setKeputusanFinal("");
      setDanaDisetujui("");
      setCatatanOperator("");
    }
    setView("detail");
  };

  const handleSimpanPenetapan = (e) => {
    e.preventDefault();
    if (!skorFinal || !keputusanFinal) {
      alert("Pastikan Skor Final dan Keputusan sudah diisi!");
      return;
    }

    alert(
      `Penetapan Disimpan!\nSkor Final: ${skorFinal}\nStatus: ${keputusanFinal}`,
    );

    if (activeTab === "desk") {
      const updated = proposalsDesk.map((p) =>
        p.id === selectedItem.id
          ? { ...p, status: "Sudah Ditetapkan", skorFinalFix: skorFinal }
          : p,
      );
      setProposalsDesk(updated);
    } else {
      const updated = proposalsPaparan.map((p) =>
        p.id === selectedItem.id
          ? { ...p, status: "Sudah Ditetapkan", skorFinalFix: skorFinal }
          : p,
      );
      setProposalsPaparan(updated);
    }
    setView("list");
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      {/* HEADER & TAB NAVIGATION */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Penetapan Usulan (Approval Pleno)
        </h2>
        <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
          Halaman Operator untuk memverifikasi hasil evaluasi Reviewer pada
          setiap tahapan seleksi.
        </p>

        {/* TOMBOL TAB */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "10px",
          }}
        >
          <button
            onClick={() => handleTabChange("desk")}
            style={activeTab === "desk" ? styles.tabActive : styles.tabInactive}
          >
            1. Pleno Desk Review
          </button>
          <button
            onClick={() => handleTabChange("paparan")}
            style={
              activeTab === "paparan" ? styles.tabActive : styles.tabInactive
            }
          >
            2. Pleno Akhir (Pendanaan)
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW: LIST */}
      {/* ========================================================= */}
      {view === "list" && (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Proposal</th>
                <th style={styles.th}>Judul & Skema</th>
                <th style={styles.th}>Ketua Pengusul</th>

                {activeTab === "desk" ? (
                  <th style={{ ...styles.th, textAlign: "center" }}>
                    Skor Desk
                  </th>
                ) : (
                  <>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Skor Desk
                    </th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Skor Paparan
                    </th>
                    <th style={{ ...styles.th, textAlign: "center" }}>Total</th>
                  </>
                )}

                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "desk" ? proposalsDesk : proposalsPaparan).map(
                (item) => {
                  const totalSkor =
                    activeTab === "desk"
                      ? item.skorReviewer
                      : (item.skorDesk || 0) + (item.skorPaparan || 0);

                  return (
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

                      {activeTab === "desk" ? (
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: totalSkor >= 500 ? "#15803d" : "#b45309",
                            }}
                          >
                            {item.skorReviewer}
                          </span>
                        </td>
                      ) : (
                        <>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            {item.skorDesk}
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            {item.skorPaparan}
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <span
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: totalSkor >= 500 ? "#15803d" : "#b45309",
                              }}
                            >
                              {totalSkor}
                            </span>
                          </td>
                        </>
                      )}

                      <td style={styles.td}>
                        <span
                          style={
                            item.status.includes("Menunggu")
                              ? styles.badgeWarning
                              : styles.badgeSuccess
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          onClick={() => handleBukaDetail(item)}
                          style={
                            item.status.includes("Menunggu")
                              ? styles.btnPrimary
                              : styles.btnOutline
                          }
                        >
                          {item.status.includes("Menunggu")
                            ? "Tetapkan Nilai"
                            : "Lihat Hasil"}
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: DETAIL FORM */}
      {/* ========================================================= */}
      {view === "detail" && selectedItem && (
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
              gridTemplateColumns: "1.2fr 1fr",
              gap: "20px",
            }}
          >
            {/* KIRI: INFORMASI PROPOSAL & HASIL REVIEW */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={styles.cardBox}>
                <h4 style={styles.cardTitle}>Data Usulan</h4>
                <div style={styles.infoRow}>
                  <strong>ID:</strong> {selectedItem.id}
                </div>
                <div style={styles.infoRow}>
                  <strong>Ketua:</strong> {selectedItem.ketua}
                </div>
                <div style={styles.infoRow}>
                  <strong>Skema:</strong> {selectedItem.skema}
                </div>
                <div style={styles.infoRow}>
                  <strong>Dana Diusulkan:</strong>{" "}
                  <span style={{ color: "#b45309", fontWeight: "bold" }}>
                    {selectedItem.danaDiusulkan}
                  </span>
                </div>
                <div style={{ ...styles.infoRow, marginTop: "10px" }}>
                  <strong>Judul:</strong>
                  <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
                    {selectedItem.judul}
                  </p>
                </div>
              </div>

              <div
                style={{
                  ...styles.cardBox,
                  backgroundColor: "#f0fdf4",
                  borderColor: "#bbf7d0",
                }}
              >
                <h4
                  style={{
                    ...styles.cardTitle,
                    color: "#15803d",
                    borderBottomColor: "#bbf7d0",
                  }}
                >
                  Hasil Evaluasi Reviewer
                </h4>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  {activeTab === "desk" ? (
                    <div>
                      <span style={styles.nilaiLabel}>
                        Skor Mentah Reviewer
                      </span>
                      <strong style={styles.nilaiValue}>
                        {selectedItem.skorReviewer}
                      </strong>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span style={styles.nilaiLabel}>Skor Desk Review</span>
                        <strong style={styles.nilaiValue}>
                          {selectedItem.skorDesk}
                        </strong>
                      </div>
                      <div>
                        <span style={styles.nilaiLabel}>Skor Paparan</span>
                        <strong style={styles.nilaiValue}>
                          {selectedItem.skorPaparan}
                        </strong>
                      </div>
                      <div>
                        <span style={styles.nilaiLabel}>Total Keseluruhan</span>
                        <strong style={styles.nilaiValue}>
                          {(selectedItem.skorDesk || 0) +
                            (selectedItem.skorPaparan || 0)}
                        </strong>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <span style={styles.nilaiLabel}>Rekomendasi Reviewer</span>
                  <strong
                    style={{
                      fontSize: "16px",
                      color: "#15803d",
                      display: "block",
                      marginTop: "5px",
                    }}
                  >
                    {selectedItem.rekomendasiReviewer}
                  </strong>
                </div>

                <div>
                  <strong style={{ fontSize: "12px", color: "#166534" }}>
                    Catatan Reviewer:
                  </strong>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#334155",
                      lineHeight: "1.5",
                      marginTop: "5px",
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    {selectedItem.catatanReviewer}
                  </p>
                </div>
              </div>
            </div>

            {/* KANAN: FORM KEPUTUSAN OPERATOR */}
            <div style={styles.cardBox}>
              <h4 style={styles.cardTitle}>Form Penetapan Operator (Pleno)</h4>
              <form
                onSubmit={handleSimpanPenetapan}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#eff6ff",
                    padding: "15px",
                    borderRadius: "6px",
                    border: "1px solid #bae6fd",
                  }}
                >
                  <label style={{ ...styles.labelBlock, color: "#0369a1" }}>
                    Nilai Fix / Skor Akhir Pleno
                  </label>
                  <input
                    type="number"
                    required
                    value={skorFinal}
                    onChange={(e) => setSkorFinal(e.target.value)}
                    style={{
                      ...styles.inputField,
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#0c4a6e",
                      borderColor: "#7dd3fc",
                    }}
                  />
                </div>

                <div>
                  <label style={styles.labelBlock}>Keputusan Final</label>
                  <select
                    required
                    value={keputusanFinal}
                    onChange={(e) => setKeputusanFinal(e.target.value)}
                    style={{
                      ...styles.inputField,
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    <option value="">-- Pilih Keputusan --</option>
                    {activeTab === "desk" ? (
                      <>
                        <option value="Lolos">Lolos ke Tahap Paparan</option>
                        <option value="Ditolak">Ditolak / Gugur</option>
                      </>
                    ) : (
                      <>
                        <option value="Didanai">Disetujui / Didanai</option>
                        <option value="Revisi">Diterima dengan Revisi</option>
                        <option value="Ditolak">Ditolak</option>
                      </>
                    )}
                  </select>
                </div>

                {activeTab === "paparan" && keputusanFinal === "Didanai" && (
                  <div
                    style={{
                      backgroundColor: "#fffbeb",
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #fde68a",
                    }}
                  >
                    <label style={styles.labelBlock}>
                      Nominal Dana Disetujui (RAB Final)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color: "#b45309" }}>
                        Rp
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 15.000.000"
                        value={danaDisetujui}
                        onChange={(e) => setDanaDisetujui(e.target.value)}
                        style={styles.inputField}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={styles.labelBlock}>
                    Catatan Operator / LPPM (Opsional)
                  </label>
                  <textarea
                    rows="4"
                    value={catatanOperator}
                    onChange={(e) => setCatatanOperator(e.target.value)}
                    placeholder="Ketik instruksi tambahan untuk dosen..."
                    style={styles.inputField}
                  ></textarea>
                </div>

                <button type="submit" style={styles.btnPrimaryFull}>
                  🔨 Tetapkan Keputusan
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
  tabActive: {
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  tabInactive: {
    backgroundColor: "transparent",
    color: "#64748b",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
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
  nilaiLabel: {
    fontSize: "11px",
    color: "#166534",
    fontWeight: "bold",
    display: "block",
  },
  nilaiValue: {
    fontSize: "24px",
    color: "#15803d",
    display: "block",
    marginTop: "2px",
    fontWeight: "bold",
  },
};
