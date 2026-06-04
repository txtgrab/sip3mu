import { useState, useRef } from "react";

export default function Pengabdian() {
  const [activeTab, setActiveTab] = useState("usulan");

  const tabs = [
    { id: "usulan", label: "Usulan" },
    { id: "dokumen", label: "Kelengkapan Dokumen" },
    { id: "rekap", label: "Rekap Pengeluaran" },
    { id: "catatan", label: "Catatan Harian" },
    { id: "kemajuan", label: "Laporan Kemajuan" },
    { id: "akhir", label: "Laporan Akhir" },
    { id: "luaran", label: "Capaian Luaran" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>
        Pengabdian Kepada Masyarakat
      </h2>

      {/* Menu Tabs */}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === tab.id ? "#1a1a2e" : "transparent",
              color: activeTab === tab.id ? "white" : "#555",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Konten Berdasarkan Tab yang Aktif */}
      <div style={styles.contentContainer}>
        {activeTab === "usulan" && <TabUsulan />}
        {activeTab === "dokumen" && <TabDokumen />}
        {activeTab === "rekap" && <TabRekap />}
        {activeTab === "catatan" && <TabCatatanHarian />}
        {activeTab === "kemajuan" && <TabLaporanKemajuan />}
        {activeTab === "akhir" && <TabAkhir />}
        {activeTab === "luaran" && <TabLuaran />}
      </div>
    </div>
  );
}

// ==========================================
// 1. TAB USULAN (MULTI-STEP FORM PENGABDIAN)
// ==========================================
function TabUsulan() {
  const [view, setView] = useState("list");
  const [skema, setSkema] = useState("");
  const [step, setStep] = useState(1);

  if (view === "list") {
    return (
      <div>
        <h3 style={styles.sectionTitle}>Usulan Pengabdian</h3>
        <button style={styles.btnPrimary} onClick={() => setView("skema")}>
          + Ajukan Usulan
        </button>
        <div
          style={{
            marginTop: "20px",
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px dashed #ccc",
          }}
        >
          <p style={{ color: "#666" }}>Belum ada usulan pengabdian.</p>
        </div>
      </div>
    );
  }

  if (view === "skema") {
    return (
      <div style={styles.formBoxLg}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <h3 style={{ margin: 0 }}>Skema Pengabdian</h3>
          <button
            onClick={() => setView("list")}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Data skema pengabdian kepada masyarakat
        </p>
        <div style={styles.grid3}>
          <SkemaCard
            title="Pengabdian Internal Fakultas"
            kategori="Universitas"
            dana="Rp15.000.000,00"
            durasi="1 Tahun"
            onSelect={() => {
              setSkema("Pengabdian Internal Fakultas");
              setView("form");
              setStep(1);
            }}
          />
          <SkemaCard
            title="Pengabdian Internal Universitas"
            kategori="Fakultas"
            dana="Rp10.000.000,00"
            durasi="1 Tahun"
            onSelect={() => {
              setSkema("Pengabdian Internal Universitas");
              setView("form");
              setStep(1);
            }}
          />
          <SkemaCard
            title="Pengabdian Hibah Kemendikbud"
            kategori="Universitas"
            dana="Rp 20.000.000,00"
            durasi="1 Tahun"
            onSelect={() => {
              setSkema("Pengabdian Hibah Kemendikbud");
              setView("form");
              setStep(1);
            }}
          />
        </div>
      </div>
    );
  }

  if (view === "form") {
    return (
      <div style={styles.formBoxLg}>
        <h3 style={{ margin: "0 0 5px 0" }}>Pengajuan Usulan Pengabdian</h3>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginTop: 0,
            marginBottom: "25px",
          }}
        >
          Data skema pengabdian: <strong>{skema}</strong>
        </p>
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #e2e8f0",
            marginBottom: "25px",
          }}
        >
          <StepTab
            label="Identitas Usulan"
            isActive={step === 1}
            onClick={() => setStep(1)}
          />
          <StepTab
            label="Substansi Usulan"
            isActive={step === 2}
            onClick={() => setStep(2)}
          />
          <StepTab
            label="Konfirmasi Usulan"
            isActive={step === 3}
            onClick={() => setStep(3)}
          />
        </div>
        <div style={{ minHeight: "300px" }}>
          {step === 1 && <FormIdentitasUsulan />}
          {step === 2 && <FormSubstansiUsulan />}
          {step === 3 && <FormKonfirmasiUsulan skema={skema} />}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}
        >
          <button
            style={styles.btnOutlineLarge}
            onClick={() => (step === 1 ? setView("skema") : setStep(step - 1))}
          >
            Kembali
          </button>
          <button style={styles.btnOutlineLarge}>Simpan Draft</button>
          {step < 3 ? (
            <button
              style={styles.btnDarkLarge}
              onClick={() => setStep(step + 1)}
            >
              Selanjutnya
            </button>
          ) : (
            <button
              style={styles.btnDarkLarge}
              onClick={() => {
                alert("Usulan Pengabdian Berhasil di-Submit!");
                setView("list");
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }
}

function SkemaCard({ title, kategori, dana, durasi, onSelect }) {
  return (
    <div
      style={{
        border: "1px solid #cbd5e1",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <h4 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>{title}</h4>
      <div
        style={{
          fontSize: "12px",
          color: "#475569",
          lineHeight: "1.8",
          marginBottom: "20px",
        }}
      >
        <div>Kategori : {kategori}</div>
        <div>Dana Maksimal : {dana}</div>
        <div>Durasi : {durasi}</div>
      </div>
      <button
        style={{
          backgroundColor: "#1a1a2e",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "20px",
          fontSize: "12px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={onSelect}
      >
        Pilih Skema
      </button>
    </div>
  );
}

function StepTab({ label, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        textAlign: "center",
        padding: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        borderBottom: isActive ? "3px solid #1a1a2e" : "3px solid transparent",
        color: isActive ? "#1a1a2e" : "#94a3b8",
      }}
    >
      <span
        style={{
          backgroundColor: isActive ? "#1a1a2e" : "transparent",
          color: isActive ? "white" : "inherit",
          padding: isActive ? "6px 15px" : "0",
          borderRadius: "20px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Form Step 1: Identitas Pengabdian
function FormIdentitasUsulan() {
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [eksternal, setEksternal] = useState([]);

  const tambahDosen = () =>
    setDosen([...dosen, { id: Date.now(), nidn: "", tugas: "" }]);
  const hapusDosen = (id) => setDosen(dosen.filter((a) => a.id !== id));

  const tambahMahasiswa = () =>
    setMahasiswa([...mahasiswa, { id: Date.now(), nim: "", tugas: "" }]);
  const hapusMahasiswa = (id) =>
    setMahasiswa(mahasiswa.filter((a) => a.id !== id));

  const tambahEksternal = () =>
    setEksternal([
      ...eksternal,
      { id: Date.now(), nama: "", instansi: "", tugas: "" },
    ]);
  const hapusEksternal = (id) =>
    setEksternal(eksternal.filter((a) => a.id !== id));

  const daftarBidang = [
    "Pemberdayaan Ekonomi Masyarakat",
    "Kesehatan dan Lingkungan",
    "Pendidikan dan Sosial Budaya",
    "Teknologi Tepat Guna",
    "Pengembangan Desa Terpadu",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <div style={styles.innerCard}>
        <h4 style={{ margin: "0 0 15px 0" }}>Identitas Usulan Pengabdian</h4>
        <div style={styles.grid2}>
          <div>
            <label style={styles.labelBlock}>Jenis Usulan</label>
            <select style={styles.inputField}>
              <option>Usulan Baru</option>
              <option>Usulan Lanjutan</option>
            </select>
          </div>
          <div>
            <label style={styles.labelBlock}>Bidang Fokus Pengabdian</label>
            <select style={styles.inputField}>
              <option value="">-- Pilih Bidang --</option>
              {daftarBidang.map((bidang, index) => (
                <option key={index} value={bidang}>
                  {bidang}
                </option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.labelBlock}>Judul Kegiatan</label>
            <input
              type="text"
              style={styles.inputField}
              placeholder="Ketik judul pengabdian..."
            />
          </div>
          <div>
            <label style={styles.labelBlock}>Tahun Pelaksanaan</label>
            <input
              type="number"
              style={styles.inputField}
              placeholder="Contoh: 2026"
            />
          </div>
          <div>
            <label style={styles.labelBlock}>Lokasi Sasaran / Mitra</label>
            <input
              type="text"
              style={styles.inputField}
              placeholder="Contoh: Desa Tambaklorok, Semarang"
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.labelBlock}>Biaya yang Diusulkan (Rp)</label>
            <input
              type="number"
              style={styles.inputField}
              placeholder="Contoh: 15000000"
            />
          </div>
        </div>
      </div>

      <div style={styles.innerCard}>
        <h4 style={{ margin: "0 0 5px 0" }}>Susunan Anggota Pelaksana</h4>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>
          *Dosen dan Mahasiswa Undip akan menerima notifikasi persetujuan di
          dashboard mereka masing-masing.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* DOSEN */}
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
                        style={styles.inputField}
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
                      style={styles.inputField}
                      placeholder="Nama, Jurusan/Fakultas..."
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => hapusDosen(ang.id)}
                    style={styles.btnDeleteInline}
                  >
                    Hapus
                  </button>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label style={styles.labelBlock}>Rincian Tugas</label>
                  <input
                    type="text"
                    style={styles.inputField}
                    placeholder="Contoh: Fasilitator Penyuluhan"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={tambahDosen}
              style={styles.btnOutlineSmall}
            >
              + Tambah Dosen
            </button>
          </div>

          {/* MAHASISWA */}
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
                        style={styles.inputField}
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
                      style={styles.inputField}
                      placeholder="Nama, Prodi/Fakultas..."
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => hapusMahasiswa(ang.id)}
                    style={styles.btnDeleteInline}
                  >
                    Hapus
                  </button>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label style={styles.labelBlock}>Rincian Tugas</label>
                  <input
                    type="text"
                    style={styles.inputField}
                    placeholder="Contoh: Logistik & Dokumentasi"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={tambahMahasiswa}
              style={styles.btnOutlineSmall}
            >
              + Tambah Mahasiswa
            </button>
          </div>

          {/* EKSTERNAL */}
          <div>
            <h5 style={styles.columnTitle}>
              Anggota Mitra Sasaran / Eksternal
            </h5>
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
                      style={styles.inputField}
                      placeholder="Nama Eksternal/Mitra..."
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.labelBlock}>Asal Instansi/Desa</label>
                    <input
                      type="text"
                      style={styles.inputField}
                      placeholder="Contoh: Perangkat Desa..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => hapusEksternal(ang.id)}
                    style={styles.btnDeleteInline}
                  >
                    Hapus
                  </button>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label style={styles.labelBlock}>Rincian Tugas</label>
                  <input
                    type="text"
                    style={styles.inputField}
                    placeholder="Tugas..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={tambahEksternal}
              style={styles.btnOutlineSmall}
            >
              + Tambah Eksternal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Step 2: Substansi Pengabdian
function FormSubstansiUsulan() {
  return (
    <div style={styles.innerCard}>
      <h4 style={{ margin: "0 0 15px 0" }}>Isi Ringkasan Pengabdian</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={styles.labelBlock}>Ringkasan Kegiatan Pengabdian</label>
          <textarea
            style={{ ...styles.inputField, height: "100px" }}
          ></textarea>
        </div>
        <div>
          <label style={styles.labelBlock}>Keyword / Kata Kunci</label>
          <input type="text" style={styles.inputField} />
        </div>
        <div>
          <label style={styles.labelBlock}>Rencana Luaran Pengabdian</label>
          <input
            type="text"
            style={styles.inputField}
            placeholder="Cth: Teknologi Tepat Guna (TTG), Publikasi Media Massa"
          />
        </div>
        <div>
          <FileUploadRow
            label="Upload Proposal"
            placeholder="Cari file proposal..."
            accept=".pdf"
          />
        </div>
      </div>
    </div>
  );
}

// Form Step 3: Konfirmasi Pengabdian
function FormKonfirmasiUsulan({ skema }) {
  return (
    <div style={styles.innerCard}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <ReadOnlyRow label="Jenis Usulan" value="Usulan Baru" />
        <ReadOnlyRow
          label="Judul Pengabdian"
          value="Pelatihan Sistem IT untuk Perangkat Desa"
        />
        <ReadOnlyRow label="Skema Pengabdian" value={skema} />
        <ReadOnlyRow label="Bidang Fokus" value="Pemberdayaan Masyarakat" />
        <ReadOnlyRow
          label="Mitra Sasaran"
          value="Desa Tambaklorok, Kota Semarang"
        />
        <ReadOnlyRow label="Dana yang Diusulkan" value="Rp 15.000.000" />
        <ReadOnlyRow label="Ketua Pelaksana" value="Nama Dosen Ketua" />
        <ReadOnlyRow label="Total Anggota Tim" value="3 Orang" />
        <ReadOnlyRow
          label="Target Luaran Wajib"
          value="Publikasi Media Cetak/Online"
        />
        <ReadOnlyRow
          label="File Dokumen"
          value="Proposal_Pengabdian_Final.pdf"
        />
      </div>
    </div>
  );
}

function ReadOnlyRow({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "200px",
          fontWeight: "bold",
          fontSize: "13px",
          color: "#1a1a2e",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px",
          backgroundColor: "#f1f5f9",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          fontSize: "13px",
          color: "#333",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

// ==========================================
// KODE TAB LAINNYA
// ==========================================
function TabDokumen() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Kelengkapan Dokumen Pengabdian</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <FileUploadRow
          label="Surat Perjanjian Kontrak (SPK)"
          placeholder="Maksimal 5MB (PDF)"
          accept=".pdf"
        />
        <FileUploadRow
          label="Proposal Pelaksanaan"
          placeholder="Maksimal 5MB (PDF)"
          accept=".pdf"
        />
        <FileUploadRow
          label="Rencana Anggaran Biaya (RAB)"
          placeholder="Maksimal 5MB (PDF)"
          accept=".pdf"
        />
      </div>
      <button
        style={{ ...styles.btnPrimaryFull, marginTop: "30px" }}
        onClick={() => alert("Dokumen disimpan!")}
      >
        Simpan File
      </button>
    </div>
  );
}

function TabRekap() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Rekap Pengeluaran</h3>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <RekapUploadBox title="Rekap Termin 1" />
        <RekapUploadBox title="Rekap Termin 2" />
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN TAB CATATAN HARIAN
// ==========================================
function TabCatatanHarian() {
  return (
    <div style={styles.formBoxLg}>
      <h3 style={styles.sectionTitle}>Isi Catatan Harian (Logbook) Kegiatan</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div style={styles.grid2}>
          <div>
            <label style={styles.labelBlock}>Tanggal Kegiatan</label>
            <input type="date" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Persentase Capaian (%)</label>
            <input
              type="number"
              placeholder="Contoh: 25"
              style={styles.inputField}
            />
          </div>
        </div>
        <div>
          <label style={styles.labelBlock}>Uraian Kegiatan Bersama Mitra</label>
          <textarea
            rows="3"
            placeholder="Jelaskan kegiatan pengabdian yang dilakukan hari ini..."
            style={styles.inputField}
          ></textarea>
        </div>
        <div>
          <label style={styles.labelBlock}>
            Unggah Bukti Kegiatan (Foto Pelaksanaan/Dokumen)
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="file"
              style={{ ...styles.inputField, padding: "7px" }}
            />
            <button style={styles.btnDark}>Unggah</button>
          </div>
        </div>
        <button style={{ ...styles.btnPrimary, marginTop: "10px" }}>
          + Tambah Catatan Harian
        </button>
      </div>

      <h4 style={styles.columnTitle}>Riwayat Catatan Harian Pengabdian</h4>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8fafc" }}>
            <th style={styles.th}>Tanggal</th>
            <th style={styles.th}>Kegiatan</th>
            <th style={styles.th}>Progres</th>
            <th style={styles.th}>Bukti</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>15 Mei 2026</td>
            <td style={styles.td}>
              Kunjungan lapangan perdana dan koordinasi jadwal dengan Kepala
              Desa.
            </td>
            <td style={styles.td}>15%</td>
            <td style={styles.td}>
              <a
                href="#"
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Lihat File
              </a>
            </td>
          </tr>
          <tr>
            <td style={styles.td}>20 Mei 2026</td>
            <td style={styles.td}>
              Pelaksanaan penyuluhan dan pelatihan pembuatan kemasan produk
              warga.
            </td>
            <td style={styles.td}>45%</td>
            <td style={styles.td}>
              <a
                href="#"
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Lihat File
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// KOMPONEN TAB LAPORAN KEMAJUAN
// ==========================================
function TabLaporanKemajuan() {
  return (
    <div style={styles.formBoxLg}>
      <h3 style={styles.sectionTitle}>Unggah Laporan Kemajuan Pengabdian</h3>
      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          marginBottom: "20px",
          marginTop: "-5px",
        }}
      >
        Pastikan format file berupa PDF dan ukuran maksimal 5MB. Laporan ini
        akan divalidasi oleh Operator.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px",
        }}
      >
        <div>
          <label style={styles.labelBlock}>
            Dokumen Laporan Kemajuan (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            style={{ ...styles.inputField, padding: "8px" }}
          />
        </div>
        <div>
          <label style={styles.labelBlock}>Catatan Tambahan (Opsional)</label>
          <textarea
            rows="3"
            placeholder="Ketik catatan jika ada..."
            style={styles.inputField}
          ></textarea>
        </div>
        <button style={styles.btnPrimaryFull}>Submit Laporan Kemajuan</button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#fef3c7",
          borderLeft: "4px solid #f59e0b",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ margin: "0 0 5px 0", color: "#b45309", fontSize: "14px" }}>
          Status Saat Ini: Menunggu Validasi LPPM
        </h4>
        <p style={{ margin: 0, fontSize: "13px", color: "#92400e" }}>
          Laporan terakhir diunggah pada: 28 Mei 2026.
        </p>
      </div>
    </div>
  );
}

function TabAkhir() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Laporan Akhir Pengabdian</h3>
      <FileUploadRow label="Pilih File" placeholder="Unggah file laporan" />
      <button style={{ ...styles.btnPrimaryFull, marginTop: "30px" }}>
        Simpan Laporan
      </button>
    </div>
  );
}

// ==========================================
// KOMPONEN TAB CAPAIAN LUARAN
// ==========================================
function TabLuaran() {
  const [identitas, setIdentitas] = useState("");
  const [jenisLainnya, setJenisLainnya] = useState("");

  return (
    <div style={styles.formBoxLg}>
      <h3 style={styles.sectionTitle}>Pengisian Capaian Luaran</h3>

      <div style={styles.formSection}>
        <label style={styles.labelBlock}>Identitas Luaran</label>
        <select
          style={{ ...styles.inputField, marginBottom: "15px" }}
          value={identitas}
          onChange={(e) => {
            setIdentitas(e.target.value);
            setJenisLainnya(""); // Reset jenis lainnya jika identitas berubah
          }}
        >
          <option value="">-- Pilih Identitas Luaran --</option>
          <option value="Artikel">Artikel (Jurnal/Prosiding)</option>
          <option value="HKI">HKI</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        {identitas === "Lainnya" && (
          <>
            <label style={styles.labelBlock}>Jenis Luaran</label>
            <select
              style={{ ...styles.inputField, marginBottom: "20px" }}
              value={jenisLainnya}
              onChange={(e) => setJenisLainnya(e.target.value)}
            >
              <option value="">-- Pilih Jenis Luaran --</option>
              <option value="TTG">Teknologi Tepat Guna (TTG)</option>
              <option value="Buku">Buku/Modul Pelatihan</option>
              <option value="Media">Publikasi Media Massa/Elektronik</option>
              <option value="Produk">Produk Mitra Sasaran</option>
              <option value="Naskah">Naskah Akademik</option>
            </select>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          {identitas === "Artikel" && <FormArtikel />}
          {identitas === "HKI" && <FormHKI />}
          {identitas === "Lainnya" && jenisLainnya === "Buku" && <FormBuku />}
          {identitas === "Lainnya" && jenisLainnya === "Produk" && (
            <FormProduk />
          )}
          {identitas === "Lainnya" && jenisLainnya === "TTG" && <FormDesain />}
          {identitas === "Lainnya" && jenisLainnya === "Media" && <FormMedia />}
          {identitas === "Lainnya" && jenisLainnya === "Naskah" && (
            <FormNaskah />
          )}
        </div>

        {/* Bagian Penulis akan muncul jika ada form yang aktif */}
        {(identitas === "Artikel" ||
          identitas === "HKI" ||
          (identitas === "Lainnya" && jenisLainnya !== "")) && (
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #eee",
              paddingTop: "30px",
            }}
          >
            <CapaianAuthorSection isArtikel={identitas === "Artikel"} />

            <button
              style={{ ...styles.btnPrimaryFull, marginTop: "40px" }}
              onClick={() => alert("Capaian Luaran berhasil disimpan!")}
            >
              Simpan Luaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sub Form Luaran ---
function FormArtikel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Judul Artikel" />
      <InputRow label="Nama Jurnal / Seminar" />
      <InputRow label="ISSN/e-ISSN" />
      <InputRow label="DOI" />
      <InputRow label="Volume / Nomor / Halaman" />
      <InputRow label="Tanggal Terbit" type="date" />
      <div style={styles.rowFlex}>
        <label style={styles.rowLabel}>Status Jurnal/Seminar</label>
        <select style={{ ...styles.inputField, flex: 1 }}>
          <option>-- Pilih Status --</option>
          <option>Jurnal Pengabdian Internasional</option>
          <option>Jurnal Pengabdian Nasional Terakreditasi</option>
          <option>Prosiding Seminar Nasional</option>
        </select>
        <label
          style={{
            width: "100px",
            textAlign: "right",
            paddingRight: "15px",
            fontWeight: "bold",
            fontSize: "13px",
            color: "#333",
          }}
        >
          Peringkat
        </label>
        <input
          type="text"
          style={{ ...styles.inputField, flex: 1 }}
          placeholder="Cth: Sinta 4"
        />
      </div>
      <InputRow label="URL" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function FormHKI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow
        label="Jenis HKI"
        placeholder="Cth: Hak Cipta Modul, Paten Produk"
      />
      <InputRow label="Judul HKI" />
      <InputRow label="Tanggal" type="date" />
      <InputRow label="URL HKI" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function FormBuku() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Judul Buku / Modul Pelatihan" />
      <InputRow label="ISBN" />
      <InputRow label="Penerbit" />
      <InputRow label="Jumlah Halaman" type="number" />
      <InputRow label="Tautan" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function FormProduk() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Nama Produk Hasil Binaan" />
      <InputRow label="Deskripsi Penggunaan" />
      <InputRow label="Kelompok Masyarakat Pengguna" />
      <InputRow label="Tautan Pendukung" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function FormDesain() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Nama Teknologi Tepat Guna (TTG)" />
      <InputRow label="Lokasi Penerapan" />
      <InputRow label="Tahun Penerapan" type="number" placeholder="Cth: 2026" />
      <InputRow label="Tautan Bukti Penerapan" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function FormMedia() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Judul Berita/Artikel" />
      <InputRow label="Nama Media Massa (Koran/Web/TV)" />
      <InputRow label="Tanggal Tayang" type="date" />
      <InputRow label="Tautan/URL Berita" />
      <LuaranFileUpload label="Pilih File (Screenshot/PDF)" />
    </div>
  );
}

function FormNaskah() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InputRow label="Judul Dokumen/Naskah Kebijakan" />
      <InputRow label="Instansi Penerima (Misal: Pemkab)" />
      <InputRow label="Tautan" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}

function CapaianAuthorSection({ isArtikel }) {
  const [dosen, setDosen] = useState([{ id: 1 }]);
  const [mahasiswa, setMahasiswa] = useState([{ id: 1 }]);
  const [lain, setLain] = useState([{ id: 1 }]);
  const [corAuthorId, setCorAuthorId] = useState("dosen-1");

  const renderAuthorGroup = (title, items, setItems, prefix, roleLabel) => {
    return (
      <div style={{ marginBottom: "25px" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "5px",
            color: "#1a1a2e",
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "5px",
            paddingLeft: "5px",
          }}
        >
          <div
            style={{
              flex: 2,
              fontSize: "12px",
              fontWeight: "bold",
              color: "#64748b",
            }}
          >
            Nama
          </div>
          <div
            style={{
              width: "80px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#64748b",
            }}
          >
            Urutan
          </div>
          <div
            style={{
              flex: 1,
              fontSize: "12px",
              fontWeight: "bold",
              color: "#64748b",
            }}
          >
            {roleLabel}
          </div>
          <div style={{ width: "150px" }}></div>
        </div>

        {items.map((item) => {
          const radioId = `${prefix}-${item.id}`;
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                style={{ ...styles.inputField, flex: 2 }}
                placeholder={`Nama ${prefix}...`}
              />
              <input
                type="number"
                style={{ ...styles.inputField, width: "80px" }}
                placeholder="1, 2.."
              />
              <input
                type="text"
                style={{ ...styles.inputField, flex: 1 }}
                placeholder={roleLabel}
              />
              <div
                style={{
                  width: "150px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                <input
                  type="radio"
                  id={radioId}
                  name="corresponding_author"
                  checked={corAuthorId === radioId}
                  onChange={() => setCorAuthorId(radioId)}
                  style={{ cursor: "pointer" }}
                />
                <label
                  htmlFor={radioId}
                  style={{ cursor: "pointer", color: "#475569" }}
                >
                  Corresponding Author
                </label>
              </div>
            </div>
          );
        })}
        <button
          style={styles.btnOutlineSmall}
          onClick={() => setItems([...items, { id: Date.now() }])}
        >
          + Tambah Anggota
        </button>
      </div>
    );
  };

  return (
    <div style={{ padding: "10px 5px" }}>
      {renderAuthorGroup(
        "Pelaksana Dosen",
        dosen,
        setDosen,
        "Dosen",
        isArtikel ? "Afiliasi" : "Peran",
      )}
      {renderAuthorGroup(
        "Pelaksana Mahasiswa",
        mahasiswa,
        setMahasiswa,
        "Mahasiswa",
        "Peran",
      )}
      {renderAuthorGroup(
        "Pelaksana Mitra/Lain",
        lain,
        setLain,
        "Lain",
        "Peran",
      )}
    </div>
  );
}

// ==========================================
// KOMPONEN BANTUAN UMUM
// ==========================================
function InputRow({ label, type = "text", placeholder }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{ ...styles.inputField, flex: 1 }}
      />
    </div>
  );
}

function LuaranFileUpload({ label }) {
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

function FileUploadRow({ label, placeholder, accept }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };
  return (
    <div>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "5px",
          fontSize: "14px",
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder={placeholder}
          style={{
            ...styles.inputField,
            backgroundColor: file ? "#e8f5e9" : "#f9f9f9",
          }}
          value={file ? file.name : ""}
          readOnly
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept={accept}
        />
        <button
          style={styles.btnDark}
          onClick={() => fileInputRef.current.click()}
        >
          Cari
        </button>
      </div>
    </div>
  );
}

function RekapUploadBox({ title }) {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };
  return (
    <div style={styles.uploadBox}>
      <h4>{title}</h4>
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf"
      />
      <div
        style={{
          ...styles.uploadArea,
          backgroundColor: file ? "#f0f8ff" : "transparent",
          cursor: "pointer",
        }}
        onClick={() => fileRef.current.click()}
      >
        <span style={{ fontSize: "30px" }}>📄</span>
        <p>{file ? file.name : "Klik untuk Pilih Rekap PDF"}</p>
      </div>
    </div>
  );
}

// ==========================================
// GAYA CSS (Styles)
// ==========================================
const styles = {
  container: { backgroundColor: "white", width: "100%" },
  tabContainer: {
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "25px",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  tabButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    marginRight: "10px",
    whiteSpace: "nowrap",
    transition: "all 0.3s",
  },
  contentContainer: { padding: "10px" },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#1a1a2e",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  formSection: { marginTop: "15px" },
  labelBlock: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "13px",
    color: "#334155",
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
  formBoxLg: {
    marginTop: "15px",
    padding: "30px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  innerCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f8fafc",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
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
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnDark: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnDarkLarge: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "10px 30px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  btnOutlineLarge: {
    backgroundColor: "white",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    padding: "10px 30px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
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
  uploadBox: {
    flex: 1,
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },
  uploadArea: {
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "40px 20px",
    margin: "15px 0",
    color: "#666",
    transition: "background-color 0.3s",
  },
  columnTitle: {
    margin: "0 0 10px 0",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "8px",
    color: "#1a1a2e",
    fontSize: "15px",
  },
  memberItemRow: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-end",
    marginBottom: "15px",
    paddingBottom: "15px",
    borderBottom: "1px dashed #cbd5e1",
  },
  btnDeleteInline: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  th: {
    padding: "12px",
    borderBottom: "1px solid #cbd5e1",
    color: "#475569",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "13px",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "13px",
  },
};
