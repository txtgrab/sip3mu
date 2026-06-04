import { useState, useRef } from "react";

export default function Publikasi() {
  // State untuk mengatur tampilan layar: 'list' (awal) atau 'form' (tambah publikasi)
  const [view, setView] = useState("list");
  // State untuk mengatur jenis form publikasi yang ditampilkan
  const [jenisPublikasi, setJenisPublikasi] = useState("Jurnal Ilmiah"); // Default Jurnal Ilmiah

  const handleSimpan = () => {
    alert(`Sukses! Publikasi jenis "${jenisPublikasi}" berhasil disimpan.`);
    setView("list"); // Kembali ke halaman list setelah simpan
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Publikasi</h2>

      {/* ========================================== */}
      {/* TAMPILAN 1: DAFTAR PUBLIKASI (LIST VIEW)     */}
      {/* ========================================== */}
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
              Daftar Publikasi Ilmiah Dosen
            </h3>
            <button style={styles.btnPrimary} onClick={() => setView("form")}>
              + Tambah Publikasi
            </button>
          </div>

          {/* Area Kosong Daftar Publikasi */}
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
            <p style={{ color: "#94a3b8" }}>Belum ada data publikasi.</p>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAMPILAN 2: FORM TAMBAH PUBLIKASI MANDIRI  */}
      {/* ========================================== */}
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
              Tambah Publikasi Mandiri
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

          <div style={styles.rowFlex}>
            <label style={styles.rowLabel}>Jenis Publikasi</label>
            <select
              style={{ ...styles.inputField, flex: 1 }}
              value={jenisPublikasi}
              onChange={(e) => setJenisPublikasi(e.target.value)}
            >
              <option value="Jurnal Ilmiah">Jurnal Ilmiah</option>
              <option value="Prosiding Seminar">Prosiding Seminar</option>
              <option value="Artikel Media Massa">Artikel Media Massa</option>
            </select>
          </div>

          {/* RENDER FORM SESUAI JENIS PUBLIKASI */}
          <div style={{ marginTop: "10px" }}>
            {jenisPublikasi === "Jurnal Ilmiah" && <FormJurnal />}
            {jenisPublikasi === "Prosiding Seminar" && <FormProsiding />}
            {jenisPublikasi === "Artikel Media Massa" && <FormBerita />}
          </div>

          {/* BAGIAN PENULIS (Ditampilkan di semua jenis publikasi) */}
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            <AuthorSection
              type="Dosen"
              roleLabel="Peran"
              nameLabel="Nama Dosen"
            />
            <AuthorSection
              type="Mahasiswa"
              roleLabel="Peran"
              nameLabel="Nama Mahasiswa"
            />
            <AuthorSection type="Lain" roleLabel="Peran" nameLabel="Nama" />

            <button
              style={{ ...styles.btnPrimaryFull, marginTop: "30px" }}
              onClick={handleSimpan}
            >
              Simpan Publikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-KOMPONEN FORM BERDASARKAN JENIS
// ==========================================

function FormJurnal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Judul Artikel" />
      <InputRow label="Nama Jurnal" />
      <InputRow label="ISSN" />
      <InputRow label="DOI" />
      <InputRow label="Volume / Nomor / Halaman" />
      <InputRow label="Tanggal Terbit" type="date" />

      <div style={styles.rowFlex}>
        <label style={styles.rowLabel}>Status Jurnal</label>
        <select style={{ ...styles.inputField, flex: 1 }}>
          <option>Pilih Status</option>
          <option>Published</option>
          <option>Accepted</option>
          <option>Under Review</option>
        </select>
        <span
          style={{ margin: "0 15px", fontWeight: "bold", fontSize: "13px" }}
        >
          Peringkat
        </span>
        <input type="text" style={{ ...styles.inputField, flex: 1 }} />
      </div>

      <InputRow label="URL" />
      <FileUploadRow label="Pilih File" />
    </div>
  );
}

function FormProsiding() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={styles.rowFlex}>
        <label style={styles.rowLabel}>Status Prosiding</label>
        <select style={{ ...styles.inputField, flex: 1 }}>
          <option>Pilih Status Prosiding</option>
          <option>Prosiding Internasional Bereputasi</option>
          <option>Prosiding Internasional</option>
          <option>Prosiding Nasional</option>
        </select>
      </div>
      <InputRow label="Judul" />
      <InputRow label="Nama Konferensi / Seminar" />
      <InputRow label="ISBN" />
      <InputRow label="Volume / Halaman" />
      <InputRow label="Tanggal Terbit" type="date" />
      <InputRow label="DOI" />
      <InputRow label="URL" />
      <FileUploadRow label="Pilih File" />
    </div>
  );
}

function FormBerita() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Jenis Media Massa" />
      <InputRow label="Judul Berita / Artikel" />
      <InputRow label="Nama Media Massa" />
      <InputRow label="Tanggal Terbit" type="date" />
      <InputRow label="URL Berita" />
      <FileUploadRow label="Pilih File" />
    </div>
  );
}

// ==========================================
// KOMPONEN BANTUAN INTERAKTIF (Reusable)
// ==========================================

function InputRow({ label, type = "text" }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type={type} style={{ ...styles.inputField, flex: 1 }} />
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

function AuthorSection({ type, nameLabel, roleLabel }) {
  const [authors, setAuthors] = useState([{ id: 1 }]);

  const addAuthor = () => {
    setAuthors([...authors, { id: Date.now() }]);
  };

  return (
    <div style={{ marginBottom: "25px" }}>
      <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "10px" }}>
        Penulis {type}
      </p>

      {/* Header Kolom */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
        <span style={{ flex: 2, fontSize: "12px", fontWeight: "bold" }}>
          {nameLabel}
        </span>
        <span style={{ width: "80px", fontSize: "12px", fontWeight: "bold" }}>
          Urutan
        </span>
        <span style={{ flex: 1, fontSize: "12px", fontWeight: "bold" }}>
          {roleLabel}
        </span>
        <span style={{ width: "150px" }}></span>
      </div>

      {/* Baris Input Penulis */}
      {authors.map((author) => (
        <div
          key={author.id}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            style={{ ...styles.inputField, flex: 2, padding: "8px" }}
          />
          <input
            type="number"
            style={{ ...styles.inputField, width: "80px", padding: "8px" }}
          />
          <input
            type="text"
            style={{ ...styles.inputField, flex: 1, padding: "8px" }}
          />

          <div
            style={{
              width: "150px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <input type="radio" name={`corresponding_${type}`} />
            <label>Corresponding Author</label>
          </div>
        </div>
      ))}

      <button style={styles.btnOutlineSmall} onClick={addAuthor}>
        + Tambah Anggota
      </button>
    </div>
  );
}

// ==========================================
// GAYA CSS (Styles)
// ==========================================
const styles = {
  container: { backgroundColor: "transparent", width: "100%" },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  rowFlex: { display: "flex", alignItems: "center", marginBottom: "10px" },
  rowLabel: {
    width: "220px",
    fontWeight: "bold",
    fontSize: "13px",
    color: "#333",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    boxSizing: "border-box",
    width: "100%",
    fontSize: "13px",
  },

  // Buttons
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
    padding: "10px 25px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnOutlineSmall: {
    padding: "6px 12px",
    border: "1px solid #64748b",
    backgroundColor: "white",
    color: "#64748b",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "5px",
  },
};
