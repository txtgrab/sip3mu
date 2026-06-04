import { useState } from "react";

export default function PenilaianPemaparan() {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // State nilai rubrik
  const [skorMateri, setSkorMateri] = useState("");
  const [skorMetode, setSkorMetode] = useState("");
  const [skorTanyaJawab, setSkorTanyaJawab] = useState("");
  const [catatan, setCatatan] = useState("");

  const [proposals, setProposals] = useState([
    {
      id: "PRP-UNIV-003",
      judul: "Pengembangan Algoritma Kriptografi Ringan untuk Perangkat Edge",
      ketua: "Dr. Budi Santoso, M.Kom.",
      jadwal: "18 Mei 2026, 09:00 WIB",
      ruang: "Ruang Rapat LPPM",
      status: "Menunggu Penilaian",
    },
    {
      id: "PRP-UNIV-008",
      judul: "Penerapan AI dalam Analisis Cuaca Ekstrem",
      ketua: "Dr. Rina Astuti",
      jadwal: "18 Mei 2026, 13:00 WIB",
      ruang: "Zoom Meeting",
      status: "Sudah Dinilai",
      totalSkor: 85,
    },
  ]);

  const handleBukaForm = (item) => {
    setSelectedItem(item);
    setSkorMateri("");
    setSkorMetode("");
    setSkorTanyaJawab("");
    setCatatan("");
    setView("form");
  };

  const handleSimpanNilai = (e) => {
    e.preventDefault();
    const total =
      (Number(skorMateri) + Number(skorMetode) + Number(skorTanyaJawab)) / 3;

    alert(`Penilaian Pemaparan Disimpan!\nTotal Skor: ${total.toFixed(2)}`);

    const updated = proposals.map((p) =>
      p.id === selectedItem.id
        ? { ...p, status: "Sudah Dinilai", totalSkor: total.toFixed(2) }
        : p,
    );
    setProposals(updated);
    setView("list");
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Penilaian Pemaparan (Presentasi)
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Halaman Reviewer untuk memberikan penilaian terhadap
          presentasi/paparan proposal dosen.
        </p>
      </div>

      {view === "list" && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID Usulan</th>
              <th style={styles.th}>Judul & Ketua</th>
              <th style={styles.th}>Jadwal Paparan</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{p.id}</strong>
                </td>
                <td style={styles.td}>
                  <div style={{ fontWeight: "bold" }}>{p.judul}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {p.ketua}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={{ fontSize: "13px" }}>{p.jadwal}</div>
                  <div style={{ fontSize: "12px", color: "#b45309" }}>
                    {p.ruang}
                  </div>
                </td>
                <td style={styles.td}>
                  <span
                    style={
                      p.status === "Sudah Dinilai"
                        ? styles.badgeSuccess
                        : styles.badgeWarning
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleBukaForm(p)}
                    style={
                      p.status === "Sudah Dinilai"
                        ? styles.btnOutline
                        : styles.btnPrimary
                    }
                  >
                    {p.status === "Sudah Dinilai"
                      ? "Lihat Nilai"
                      : "Input Nilai"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "form" && selectedItem && (
        <div>
          <button
            onClick={() => setView("list")}
            style={{ ...styles.btnOutline, marginBottom: "20px" }}
          >
            ← Kembali ke Daftar
          </button>

          <div style={styles.cardBox}>
            <h4 style={styles.cardTitle}>
              Form Penilaian Paparan: {selectedItem.id}
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: "#334155",
                marginBottom: "20px",
              }}
            >
              <strong>Judul:</strong> {selectedItem.judul}
            </p>

            <form
              onSubmit={handleSimpanNilai}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "15px",
                }}
              >
                <div>
                  <label style={styles.labelBlock}>
                    Penguasaan Materi (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={skorMateri}
                    onChange={(e) => setSkorMateri(e.target.value)}
                    style={styles.inputField}
                  />
                </div>
                <div>
                  <label style={styles.labelBlock}>
                    Metodologi & Kesesuaian Luaran (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={skorMetode}
                    onChange={(e) => setSkorMetode(e.target.value)}
                    style={styles.inputField}
                  />
                </div>
                <div>
                  <label style={styles.labelBlock}>
                    Kemampuan Tanya Jawab (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={skorTanyaJawab}
                    onChange={(e) => setSkorTanyaJawab(e.target.value)}
                    style={styles.inputField}
                  />
                </div>
              </div>

              <div>
                <label style={styles.labelBlock}>
                  Catatan Evaluasi Presentasi
                </label>
                <textarea
                  rows="4"
                  required
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tuliskan masukan, perbaikan RAB, atau koreksi metodologi dari sesi tanya jawab..."
                  style={styles.inputField}
                ></textarea>
              </div>

              <button type="submit" style={styles.btnPrimaryFull}>
                Simpan Hasil Penilaian
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
    borderRadius: "4px",
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
