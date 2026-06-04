import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ManajemenPeriode() {
  const { role } = useOutletContext();
  const lingkupTugas =
    role === "OPERATOR FAKULTAS" ? "Fakultas" : "Universitas";

  // Data skema mentah yang dibuat oleh Admin
  const [skemaList, setSkemaList] = useState([
    {
      id: "SKM-01",
      namaSkema: "Penelitian Dosen Pemula",
      level: "Fakultas",
      kuota: 20,
      status: "Belum Dibuka",
      deadline: "-",
    },
    {
      id: "SKM-02",
      namaSkema: "Pengabdian Kemitraan Masyarakat",
      level: "Fakultas",
      kuota: 15,
      status: "Aktif",
      deadline: "30 Juni 2026",
    },
    {
      id: "SKM-03",
      namaSkema: "Penelitian Terapan Unggulan",
      level: "Universitas",
      kuota: 50,
      status: "Belum Dibuka",
      deadline: "-",
    },
  ]);

  // Filter data sesuai role operator
  const skemaFiltered = skemaList.filter((s) => s.level === lingkupTugas);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkema, setSelectedSkema] = useState(null);
  const [tglBuka, setTglBuka] = useState("");
  const [tglTutup, setTglTutup] = useState("");

  const handleBukaPeriode = (skema) => {
    setSelectedSkema(skema);
    setIsModalOpen(true);
  };

  const handleSimpanPeriode = (e) => {
    e.preventDefault();
    if (!tglBuka || !tglTutup) {
      alert("Harap isi tanggal mulai dan batas waktu (deadline)!");
      return;
    }

    const updated = skemaList.map((s) =>
      s.id === selectedSkema.id
        ? { ...s, status: "Aktif", deadline: tglTutup }
        : s,
    );
    setSkemaList(updated);
    setIsModalOpen(false);
    alert(
      `Periode untuk skema ${selectedSkema.namaSkema} resmi DIBUKA! Pengumuman otomatis dikirim ke dosen.`,
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {/* MODAL SETUP PERIODE */}
      {isModalOpen && selectedSkema && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3
              style={{
                marginTop: 0,
                color: "#1a1a2e",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "10px",
              }}
            >
              Buka Periode Skema
            </h3>
            <p style={{ fontSize: "13px", color: "#334155" }}>
              <strong>Skema:</strong> {selectedSkema.namaSkema} <br />
              <strong>Kuota:</strong> {selectedSkema.kuota} Usulan
            </p>

            <form onSubmit={handleSimpanPeriode}>
              <div style={{ marginBottom: "15px" }}>
                <label style={styles.labelBlock}>Tanggal Mulai Pengajuan</label>
                <input
                  type="date"
                  required
                  value={tglBuka}
                  onChange={(e) => setTglBuka(e.target.value)}
                  style={styles.inputField}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={styles.labelBlock}>
                  Batas Waktu (Deadline) Submit
                </label>
                <input
                  type="date"
                  required
                  value={tglTutup}
                  onChange={(e) => setTglTutup(e.target.value)}
                  style={styles.inputField}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{ ...styles.btnPrimary, flex: 1, padding: "10px" }}
                >
                  Buka Periode Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ ...styles.btnOutline, flex: 1, padding: "10px" }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HALAMAN UTAMA */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 5px 0", color: "#1a1a2e" }}>
          Manajemen Periode Hibah
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Mengaktifkan skema dan menetapkan batas waktu pengajuan proposal untuk
          tingkat <strong>{lingkupTugas}</strong>.
        </p>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nama Skema</th>
            <th style={styles.th}>Kuota</th>
            <th style={styles.th}>Batas Waktu</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {skemaFiltered.map((s) => (
            <tr key={s.id} style={styles.tr}>
              <td style={styles.td}>
                <strong>{s.id}</strong>
              </td>
              <td style={styles.td}>{s.namaSkema}</td>
              <td style={styles.td}>{s.kuota}</td>
              <td style={styles.td}>{s.deadline}</td>
              <td style={styles.td}>
                <span
                  style={
                    s.status === "Aktif"
                      ? styles.badgeSuccess
                      : styles.badgeGray
                  }
                >
                  {s.status}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  onClick={() =>
                    s.status === "Belum Dibuka"
                      ? handleBukaPeriode(s)
                      : alert("Periode ini sudah aktif.")
                  }
                  style={
                    s.status === "Aktif" ? styles.btnOutline : styles.btnPrimary
                  }
                >
                  {s.status === "Aktif" ? "Edit Tanggal" : "Buka Periode"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    padding: "12px",
    textAlign: "left",
    color: "#334155",
  },
  tr: { borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px", verticalAlign: "middle", color: "#1e293b" },
  badgeGray: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
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
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  labelBlock: {
    display: "block",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#1e293b",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
  },
};
