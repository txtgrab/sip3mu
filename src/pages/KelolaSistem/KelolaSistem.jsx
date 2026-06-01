import { useState } from "react";

export default function KelolaSistem() {
  const [activeTab, setActiveTab] = useState("akun");

  // Data Dummy Akun Pengguna
  const [akunList] = useState([
    {
      id: "USR-001",
      nama: "Dr. Budi Santoso",
      email: "budi@lecturer.undip.ac.id",
      role: "Dosen / Reviewer",
      status: "Aktif",
    },
    {
      id: "USR-002",
      nama: "Siti Aminah, M.Kom",
      email: "siti@lecturer.undip.ac.id",
      role: "Dosen",
      status: "Aktif",
    },
    {
      id: "USR-003",
      nama: "Ahmad Zaki",
      email: "zaki.admin@undip.ac.id",
      role: "Operator Fakultas",
      status: "Aktif",
    },
  ]);

  // Data Dummy Skema & Jadwal
  const [skemaList] = useState([
    {
      id: "SKM-001",
      nama: "Penelitian Dasar Fakultas",
      jenis: "Penelitian",
      level: "Fakultas",
      kuota: 50,
      deadline: "30 Juni 2026",
      status: "Buka",
    },
    {
      id: "SKM-002",
      nama: "Pengabdian Internal",
      jenis: "Pengabdian",
      level: "Universitas",
      kuota: 20,
      deadline: "15 Juli 2026",
      status: "Buka",
    },
    {
      id: "SKM-003",
      nama: "Penelitian Terapan",
      jenis: "Penelitian",
      level: "Universitas",
      kuota: 15,
      deadline: "01 Mei 2026",
      status: "Tutup",
    },
  ]);

  // Data Dummy Master Data Tridarma
  const [tridarmaList] = useState([
    {
      id: "PRP-2026-001",
      jenis: "Penelitian",
      judul: "Pengembangan AI untuk Deteksi Penyakit",
      ketua: "Dr. Budi Santoso",
      tahun: "2026",
      status: "Sedang Berjalan",
    },
    {
      id: "PRP-2026-002",
      jenis: "Pengabdian",
      judul: "Pemberdayaan UMKM Batik Semarang",
      ketua: "Siti Aminah, M.Kom",
      tahun: "2026",
      status: "Selesai",
    },
    {
      id: "PRP-2025-110",
      jenis: "Penelitian",
      judul: "Sistem Cerdas IoT Pertanian",
      ketua: "Ir. Ahmad Dahlan, M.T",
      tahun: "2025",
      status: "Selesai",
    },
  ]);

  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Data berhasil disimpan ke dalam sistem!");
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#1a1a2e" }}>Administrasi Sistem</h2>
        <p style={{ margin: "5px 0 0 0", color: "#666" }}>
          Pengaturan master data, manajemen akun pengguna, jadwal hibah, dan
          pangkalan data Tridarma.
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabBtn,
            ...(activeTab === "akun" ? styles.tabBtnActive : {}),
          }}
          onClick={() => setActiveTab("akun")}
        >
          👥 Kelola Akun Pengguna
        </button>
        <button
          style={{
            ...styles.tabBtn,
            ...(activeTab === "skema" ? styles.tabBtnActive : {}),
          }}
          onClick={() => setActiveTab("skema")}
        >
          📅 Kelola Skema & Jadwal
        </button>
        <button
          style={{
            ...styles.tabBtn,
            ...(activeTab === "tridarma" ? styles.tabBtnActive : {}),
          }}
          onClick={() => setActiveTab("tridarma")}
        >
          🗂️ Lihat Data Tridarma
        </button>
      </div>

      {/* --- TAB 1: KELOLA AKUN PENGGUNA --- */}
      {activeTab === "akun" && (
        <div style={styles.grid2}>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0 }}>Daftar Pengguna Sistem</h4>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nama Pengguna</th>
                  <th style={styles.th}>Email / Username</th>
                  <th style={styles.th}>Role / Akses</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {akunList.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{item.nama}</strong>
                    </td>
                    <td style={styles.td}>{item.email}</td>
                    <td style={styles.td}>
                      <span style={styles.badgeInfo}>{item.role}</span>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={
                          item.status === "Aktif"
                            ? styles.badgeSuccess
                            : styles.badgeDanger
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.card}>
            <h4
              style={{
                margin: "0 0 15px 0",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Tambah Akun Baru
            </h4>
            <form
              onSubmit={handleSimpan}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label style={styles.labelBlock}>Nama Lengkap & Gelar</label>
                <input type="text" style={styles.inputField} required />
              </div>
              <div>
                <label style={styles.labelBlock}>Email Institusi (SSO)</label>
                <input type="email" style={styles.inputField} required />
              </div>
              <div>
                <label style={styles.labelBlock}>Hak Akses Utama</label>
                <select style={styles.inputField} required>
                  <option value="">-- Pilih Hak Akses --</option>
                  <option value="Dosen">Dosen</option>
                  <option value="Reviewer">Reviewer (Penilai)</option>
                  <option value="Operator">Operator LPPM/Fakultas</option>
                  <option value="Pimpinan">Pimpinan</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <button type="submit" style={styles.btnPrimaryFull}>
                Simpan Akun
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- TAB 2: KELOLA SKEMA & JADWAL --- */}
      {activeTab === "skema" && (
        <div style={styles.grid2}>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0 }}>Daftar Skema Hibah Aktif</h4>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nama Skema</th>
                  <th style={styles.th}>Level</th>
                  <th style={styles.th}>Batas Waktu</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {skemaList.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <strong>{item.nama}</strong>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        {item.jenis} - Kuota: {item.kuota}
                      </div>
                    </td>
                    <td style={styles.td}>{item.level}</td>
                    <td style={styles.td}>{item.deadline}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          item.status === "Buka"
                            ? styles.badgeSuccess
                            : styles.badgeDanger
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.card}>
            <h4
              style={{
                margin: "0 0 15px 0",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Buka Skema & Jadwal Baru
            </h4>
            <form
              onSubmit={handleSimpan}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label style={styles.labelBlock}>Nama Skema Hibah</label>
                <input
                  type="text"
                  style={styles.inputField}
                  placeholder="Misal: Hibah Penelitian Terapan"
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.labelBlock}>Jenis</label>
                  <select style={styles.inputField} required>
                    <option value="Penelitian">Penelitian</option>
                    <option value="Pengabdian">Pengabdian</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.labelBlock}>Level</label>
                  <select style={styles.inputField} required>
                    <option value="Fakultas">Fakultas</option>
                    <option value="Universitas">Universitas</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={styles.labelBlock}>
                  Batas Waktu Pengumpulan (Deadline)
                </label>
                <input type="date" style={styles.inputField} required />
              </div>
              <div>
                <label style={styles.labelBlock}>Status Usulan</label>
                <select style={styles.inputField} required>
                  <option value="Buka">Buka (Terima Proposal)</option>
                  <option value="Tutup">Tutup</option>
                </select>
              </div>
              <button type="submit" style={styles.btnPrimaryFull}>
                Simpan Konfigurasi Skema
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- TAB 3: LIHAT DATA TRIDARMA --- */}
      {activeTab === "tridarma" && (
        <div style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div>
              <h4 style={{ margin: 0 }}>Pangkalan Data Master Tridarma</h4>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Akses sapu jagat (Superadmin) untuk keperluan audit dan
                troubleshooting sistem.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Cari ID/Judul/Dosen..."
                style={{ ...styles.inputField, width: "250px", padding: "8px" }}
              />
              <button style={styles.btnPrimary}>Cari Data</button>
            </div>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Kegiatan</th>
                <th style={styles.th}>Jenis</th>
                <th style={styles.th}>Judul Pelaksanaan</th>
                <th style={styles.th}>Ketua Pelaksana</th>
                <th style={styles.th}>Status Sistem</th>
                <th style={styles.th}>Aksi Sistem</th>
              </tr>
            </thead>
            <tbody>
              {tridarmaList.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.jenis === "Penelitian"
                          ? styles.badgeInfo
                          : styles.badgeWarning
                      }
                    >
                      {item.jenis}
                    </span>
                  </td>
                  <td style={styles.td}>{item.judul}</td>
                  <td style={styles.td}>{item.ketua}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        item.status === "Selesai"
                          ? styles.badgeSuccess
                          : styles.badgeDanger
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        style={{
                          ...styles.btnSecondary,
                          padding: "5px 10px",
                          fontSize: "11px",
                        }}
                      >
                        Lihat Log
                      </button>
                      <button
                        style={{
                          ...styles.btnOutline,
                          padding: "5px 10px",
                          fontSize: "11px",
                          color: "red",
                          borderColor: "red",
                        }}
                      >
                        Force Reset
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  grid2: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    alignItems: "start",
  },

  // Tab Styles
  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
  },
  tabBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#64748b",
    transition: "all 0.2s",
  },
  tabBtnActive: { color: "#1a1a2e", borderBottom: "3px solid #1a1a2e" },

  // Table Styles
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    borderBottom: "2px solid #1a1a2e",
    padding: "12px",
    textAlign: "left",
    color: "#1a1a2e",
  },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "12px", verticalAlign: "middle" },

  // Badges
  badgeInfo: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeDanger: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeWarning: {
    backgroundColor: "#fef08a",
    color: "#854d0e",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  // Form Styles
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
    marginTop: "10px",
  },
  btnPrimary: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
};
