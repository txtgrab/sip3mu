import { useState, useRef } from "react";

export default function PendanaanLain() {
  const [view, setView] = useState("list"); // 'list' atau 'form'

  // State terpisah untuk masing-masing kategori anggota
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [eksternal, setEksternal] = useState([]);

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Pendanaan Lain</h2>

      {/* TAMPILAN 1: LIST */}
      {view === "list" && (
        <div style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ fontSize: "15px", margin: 0 }}>
              Ddaftar Pendanaan Lain
            </h3>
            <button style={styles.btnPrimary} onClick={() => setView("form")}>
              + Tambah Pendanaan
            </button>
          </div>
          <div
            style={{
              height: "300px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              backgroundColor: "#f8fafc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#94a3b8" }}>Belum ada data pendanaan lain.</p>
          </div>
        </div>
      )}

      {/* TAMPILAN 2: FORM TAMBAH */}
      {view === "form" && (
        <div style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ fontSize: "16px", margin: 0 }}>
              Tambah Data Pendanaan Lain
            </h3>
            <button
              onClick={() => setView("list")}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              ✖
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <SelectRow
              label="Sumber Pendanaan"
              options={[
                "Pendanaan Industri / Swasta",
                "Pendanaan Instansi Pemerintah (Non-Kemendikbud)",
                "Pendanaan Mandiri (Self-Funded)",
              ]}
            />
            <SelectRow
              label="Kategori Kegiatan"
              options={[
                "Penelitian Kerja Sama",
                "Pengabdian Masyarakat Kerja Sama",
                "Konsultasi Ahli",
              ]}
            />
            <InputRow label="Judul Kegiatan" />
            <InputRow label="Nama Instansi Pemberi Dana" />
            <InputRow label="Nomor Kontrak / Surat Perjanjian Kerja Sama (PKS)" />
            <InputRow label="Tanggal Mulai Kontrak" type="date" />
            <InputRow label="Tanggal Selesai Kontrak" type="date" />
            <InputRow label="Total Nominal Dana" />
            <FileUploadRow label="Pilih File Proposal / Kontrak" />
          </div>

          {/* BAGIAN ANGGOTA TIM VERTICAL */}
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0", fontSize: "15px" }}>
              Susunan Anggota Tim
            </h4>
            <p
              style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}
            >
              *Dosen dan Mahasiswa Undip akan menerima notifikasi persetujuan di
              dashboard mereka masing-masing.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              {/* --- ANGGOTA DOSEN --- */}
              <div>
                <h5 style={styles.columnTitle}>Anggota Dosen</h5>
                {dosen.map((ang, index) => (
                  <div
                    key={ang.id}
                    style={{
                      borderBottom: "1px dashed #cbd5e1",
                      paddingBottom: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>
                          NIDN Dosen {index + 1}
                        </label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input
                            type="text"
                            style={styles.inputFieldFull}
                            placeholder="Ketik NIDN..."
                          />
                          <button type="button" style={styles.btnDark}>
                            Cari
                          </button>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>
                          Nama Dosen & Jurusan
                        </label>
                        <input
                          type="text"
                          style={styles.inputFieldFull}
                          placeholder="Nama, Jurusan/Fakultas..."
                          readOnly
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setDosen(dosen.filter((a) => a.id !== ang.id))
                        }
                        style={styles.btnDeleteInline}
                      >
                        Hapus
                      </button>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <label style={styles.labelBlock}>Rincian Tugas</label>
                      <input
                        type="text"
                        style={styles.inputFieldFull}
                        placeholder="Contoh: Koordinator Lapangan"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setDosen([...dosen, { id: Date.now() }])}
                  style={styles.btnOutlineSmall}
                >
                  + Tambah Dosen
                </button>
              </div>

              {/* --- ANGGOTA MAHASISWA --- */}
              <div>
                <h5 style={styles.columnTitle}>Anggota Mahasiswa</h5>
                {mahasiswa.map((ang, index) => (
                  <div
                    key={ang.id}
                    style={{
                      borderBottom: "1px dashed #cbd5e1",
                      paddingBottom: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>
                          NIM Mahasiswa {index + 1}
                        </label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input
                            type="text"
                            style={styles.inputFieldFull}
                            placeholder="Ketik NIM..."
                          />
                          <button type="button" style={styles.btnDark}>
                            Cari
                          </button>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>
                          Nama Mahasiswa & Prodi
                        </label>
                        <input
                          type="text"
                          style={styles.inputFieldFull}
                          placeholder="Nama, Prodi/Fakultas..."
                          readOnly
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setMahasiswa(mahasiswa.filter((a) => a.id !== ang.id))
                        }
                        style={styles.btnDeleteInline}
                      >
                        Hapus
                      </button>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <label style={styles.labelBlock}>Rincian Tugas</label>
                      <input
                        type="text"
                        style={styles.inputFieldFull}
                        placeholder="Contoh: Analisis Data"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setMahasiswa([...mahasiswa, { id: Date.now() }])
                  }
                  style={styles.btnOutlineSmall}
                >
                  + Tambah Mahasiswa
                </button>
              </div>

              {/* --- ANGGOTA EKSTERNAL --- */}
              <div>
                <h5 style={styles.columnTitle}>Anggota Eksternal / Mitra</h5>
                {eksternal.map((ang) => (
                  <div
                    key={ang.id}
                    style={{
                      borderBottom: "1px dashed #cbd5e1",
                      paddingBottom: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>Nama Lengkap</label>
                        <input
                          type="text"
                          style={styles.inputFieldFull}
                          placeholder="Nama Eksternal..."
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.labelBlock}>Asal Instansi</label>
                        <input
                          type="text"
                          style={styles.inputFieldFull}
                          placeholder="Contoh: PT. Bintang..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEksternal(eksternal.filter((a) => a.id !== ang.id))
                        }
                        style={styles.btnDeleteInline}
                      >
                        Hapus
                      </button>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <label style={styles.labelBlock}>Rincian Tugas</label>
                      <input
                        type="text"
                        style={styles.inputFieldFull}
                        placeholder="Tugas..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEksternal([...eksternal, { id: Date.now() }])
                  }
                  style={styles.btnOutlineSmall}
                >
                  + Tambah Eksternal
                </button>
              </div>
            </div>

            <button
              style={{ ...styles.btnPrimaryFull, marginTop: "40px" }}
              onClick={() => {
                alert("Usulan Pendanaan Berhasil Disimpan!");
                setView("list");
              }}
            >
              Simpan Pendanaan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// KOMPONEN BANTUAN
// ==========================================
function InputRow({ label, type = "text" }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type={type} style={{ ...styles.inputField, flex: 1 }} />
    </div>
  );
}

function SelectRow({ label, options }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <select style={{ ...styles.inputField, flex: 1 }}>
        <option>-- Pilih {label} --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileUploadRow({ label }) {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input
        type="text"
        readOnly
        value={fileName}
        style={{ ...styles.inputField, flex: 1, backgroundColor: "#f1f5f9" }}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => setFileName(e.target.files[0]?.name || "")}
      />
      <button
        style={{ ...styles.btnDark, marginLeft: "10px" }}
        onClick={() => fileRef.current.click()}
      >
        Cari
      </button>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = {
  container: { backgroundColor: "transparent", width: "100%" },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "30px",
    border: "1px solid #e2e8f0",
  },
  rowFlex: { display: "flex", alignItems: "center", marginBottom: "10px" },
  rowLabel: {
    width: "250px",
    fontWeight: "bold",
    fontSize: "13px",
    color: "#333",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
  },
  inputFieldFull: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
    boxSizing: "border-box",
  },
  labelBlock: {
    display: "block",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#475569",
    marginBottom: "5px",
  },
  columnTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#334155",
    marginBottom: "10px",
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
  },
  btnPrimary: {
    backgroundColor: "#60a5fa",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
  btnDark: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
  btnOutlineSmall: {
    padding: "5px 10px",
    border: "1px solid #64748b",
    backgroundColor: "white",
    color: "#64748b",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "11px",
  },
  btnDeleteInline: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    border: "1px solid #fca5a5",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
