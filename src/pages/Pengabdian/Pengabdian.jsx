import { useState, useRef } from 'react';

export default function Pengabdian() {
  const [activeTab, setActiveTab] = useState('usulan'); 

  const tabs = [
    { id: 'usulan', label: 'Usulan' },
    { id: 'dokumen', label: 'Kelengkapan Dokumen' },
    { id: 'rekap', label: 'Rekap Pengeluaran' },
    { id: 'catatan', label: 'Catatan Harian' },
    { id: 'kemajuan', label: 'Laporan Kemajuan' },
    { id: 'akhir', label: 'Laporan Akhir' },
    { id: 'luaran', label: 'Capaian Luaran' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Pengabdian</h2>

      {/* Menu Tabs */}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === tab.id ? '#1a1a2e' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#555',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Konten Berdasarkan Tab yang Aktif */}
      <div style={styles.contentContainer}>
        {activeTab === 'usulan' && <TabUsulan />}
        {activeTab === 'dokumen' && <TabDokumen />}
        {activeTab === 'rekap' && <TabRekap />}
        {activeTab === 'catatan' && <TabCatatan />}
        {activeTab === 'kemajuan' && <TabKemajuan />}
        {activeTab === 'akhir' && <TabAkhir />}
        {activeTab === 'luaran' && <TabLuaran />}
      </div>
    </div>
  );
}

// ==========================================
// 1. TAB USULAN (MULTI-STEP FORM PENGABDIAN)
// ==========================================
function TabUsulan() {
  const [view, setView] = useState('list'); 
  const [skema, setSkema] = useState('');
  const [step, setStep] = useState(1);

  if (view === 'list') {
    return (
      <div>
        <h3 style={styles.sectionTitle}>Usulan Pengabdian</h3>
        <button style={styles.btnPrimary} onClick={() => setView('skema')}>+ Ajukan Usulan</button>
        
        <div style={{ marginTop: '20px', padding: '40px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666' }}>Belum ada usulan pengabdian.</p>
        </div>
      </div>
    );
  }

  if (view === 'skema') {
    return (
      <div style={styles.formBoxLg}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <h3 style={{ margin: 0 }}>Skema Pengabdian</h3>
          <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0, marginBottom: '20px' }}>Data skema pengabdian</p>
        
        <div style={styles.grid3}>
          <SkemaCard 
            title="Pengabdian Internal Fakultas" 
            kategori="Fakultas" dana="Rp15.000.000,00" durasi="1 Tahun"
            onSelect={() => { setSkema('Pengabdian Internal Fakultas'); setView('form'); setStep(1); }} 
          />
          <SkemaCard 
            title="Pengabdian Internal Universitas" 
            kategori="Universitas" dana="Rp10.000.000,00" durasi="1 Tahun"
            onSelect={() => { setSkema('Pengabdian Internal Universitas'); setView('form'); setStep(1); }} 
          />
          <SkemaCard 
            title="Pengabdian Hibah Kemendikbud" 
            kategori="Eksternal" dana="Rp 20.000.000,00" durasi="1 Tahun"
            onSelect={() => { setSkema('Pengabdian Hibah Kemendikbud'); setView('form'); setStep(1); }} 
          />
        </div>
      </div>
    );
  }

  if (view === 'form') {
    return (
      <div style={styles.formBoxLg}>
        <h3 style={{ margin: '0 0 5px 0' }}>Pengajuan Usulan Pengabdian</h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0, marginBottom: '25px' }}>Data skema pengabdian: <strong>{skema}</strong></p>
        
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '25px' }}>
          <StepTab label="Identitas Usulan" isActive={step === 1} onClick={() => setStep(1)} />
          <StepTab label="Substansi Usulan" isActive={step === 2} onClick={() => setStep(2)} />
          <StepTab label="Konfirmasi Usulan" isActive={step === 3} onClick={() => setStep(3)} />
        </div>

        <div style={{ minHeight: '300px' }}>
          {step === 1 && <FormIdentitasPengabdian />}
          {step === 2 && <FormSubstansiPengabdian />}
          {step === 3 && <FormKonfirmasiPengabdian skema={skema} />}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <button style={styles.btnOutlineLarge} onClick={() => step === 1 ? setView('skema') : setStep(step - 1)}>
            Kembali
          </button>
          <button style={styles.btnOutlineLarge}>Simpan Draft</button>
          
          {step < 3 ? (
            <button style={styles.btnDarkLarge} onClick={() => setStep(step + 1)}>Selanjutnya</button>
          ) : (
            <button style={styles.btnDarkLarge} onClick={() => { alert('Usulan Pengabdian Berhasil di-Submit!'); setView('list'); }}>Submit</button>
          )}
        </div>
      </div>
    );
  }
}

function SkemaCard({ title, kategori, dana, durasi, onSelect }) {
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc' }}>
      <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{title}</h4>
      <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
        <div>Kategori : {kategori}</div>
        <div>Dana Maksimal : {dana}</div>
        <div>Durasi : {durasi}</div>
      </div>
      <button style={{ backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }} onClick={onSelect}>
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
        flex: 1, textAlign: 'center', padding: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
        borderBottom: isActive ? '3px solid #1a1a2e' : '3px solid transparent',
        color: isActive ? '#1a1a2e' : '#94a3b8'
      }}
    >
      <span style={{ backgroundColor: isActive ? '#1a1a2e' : 'transparent', color: isActive ? 'white' : 'inherit', padding: isActive ? '6px 15px' : '0', borderRadius: '20px' }}>
        {label}
      </span>
    </div>
  );
}

// Form Step 1: Identitas
function FormIdentitasPengabdian() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Box 1: Judul Kegiatan Pengabdian */}
      <div style={styles.innerCard}>
        <h4 style={{ margin: '0 0 15px 0' }}>Judul Kegiatan Pengabdian</h4>
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
              <option value="">Pilih Bidang Fokus</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Ekonomi Kreatif">Ekonomi Kreatif</option>
              <option value="Lingkungan Hidup">Lingkungan Hidup</option>
              <option value="Pendidikan">Pendidikan</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.labelBlock}>Judul</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Tahun Pelaksanaan</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Lokasi Mitra Sasaran</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Biaya yang Diusulkan</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={styles.labelBlock}>Kontribusi Mitra</label>
              <input type="text" style={styles.inputField} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.labelBlock}>Nilai Kontribusi</label>
              <input type="text" style={styles.inputField} />
            </div>
          </div>
          <div>
            <label style={styles.labelBlock}>Nama Mitra Sasaran</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Jenis Mitra</label>
            <input type="text" style={styles.inputField} />
          </div>
        </div>
      </div>

      {/* Box 2: Identitas Personil & Pimpinan */}
      <div style={styles.innerCard}>
        <h4 style={{ margin: '0 0 15px 0' }}>Identitas Personil Penelitian</h4>
        <div style={styles.grid2}>
          <div>
            <label style={styles.labelBlock}>Masukkan NIDN</label>
            <input type="text" style={styles.inputField} placeholder="Ketik NIDN Dosen" />
          </div>
          <div>
            <label style={styles.labelBlock}>Tugas Anggota</label>
            <input type="text" style={styles.inputField} placeholder="Ketik Tugas Anggota" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <textarea style={{...styles.inputField, height: '60px'}} placeholder="Tuliskan rincian tugas penugasan anggota di lapangan secara detail ..."></textarea>
          </div>
        </div>

        <h4 style={{ margin: '25px 0 15px 0' }}>Identitas Pimpinan Fakultas</h4>
        <div style={styles.grid2}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.labelBlock}>Nama Pimpinan</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>Nama Fakultas</label>
            <input type="text" style={styles.inputField} />
          </div>
          <div>
            <label style={styles.labelBlock}>NIP</label>
            <input type="text" style={styles.inputField} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Step 2: Substansi (Rencana Luaran Diperbarui)
function FormSubstansiPengabdian() {
  return (
    <div style={styles.innerCard}>
      <h4 style={{ margin: '0 0 15px 0' }}>Isi Ringkasan Pengabdian</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={styles.labelBlock}>Ringkasan Pengabdian</label>
          <textarea style={{...styles.inputField, height: '100px'}} placeholder="Tuliskan ringkasan usulan kegiatan pengabdian maksimal 500 kata yang memuat permasalahan mitra sasaran, solusi yang ditawarkan, metode pelaksanaan, serta target luaran yang ingin dicapai..."></textarea>
        </div>
        <div>
          <label style={styles.labelBlock}>Keyword</label>
          <input type="text" style={styles.inputField} />
        </div>
        <div>
          {/* Kolom Rencana Luaran Diubah menjadi Text Input */}
          <label style={styles.labelBlock}>Rencana Luaran</label>
          <input type="text" style={styles.inputField} placeholder="Ketik rencana luaran..." />
        </div>
        <div>
          <FileUploadRow label="Upload" placeholder="Cari file dokumen..." accept=".pdf" />
        </div>
      </div>
    </div>
  );
}

// Form Step 3: Konfirmasi
function FormKonfirmasiPengabdian({ skema }) {
  return (
    <div style={styles.innerCard}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ReadOnlyRow label="Jenis Usulan" value="Usulan Baru" />
        <ReadOnlyRow label="Judul Kegiatan" value="Pemberdayaan UMKM Kreatif" />
        <ReadOnlyRow label="Skema Pengabdian" value={skema} />
        <ReadOnlyRow label="Bidang Fokus" value="Ekonomi Kreatif" />
        <ReadOnlyRow label="Dana yang Diusulkan" value="Rp 15.000.000" />
        <ReadOnlyRow label="Nama Mitra Sasaran" value="Desa Wisata Batik" />
        <ReadOnlyRow label="Ketua Pengusul" value="Nama Dosen Ketua" />
        <ReadOnlyRow label="Total Anggota Tim" value="3 Orang" />
        <ReadOnlyRow label="Target Luaran Wajib" value="Artikel Media Massa" />
        <ReadOnlyRow label="File Dokumen" value="Proposal_Pengabdian_Final.pdf" />
      </div>
    </div>
  );
}

function ReadOnlyRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '200px', fontWeight: 'bold', fontSize: '13px', color: '#1a1a2e' }}>{label}</div>
      <div style={{ flex: 1, padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#333' }}>
        {value || '-'}
      </div>
    </div>
  );
}

// ==========================================
// KODE TAB LAINNYA & KOMPONEN BANTUAN
// ==========================================

function TabDokumen() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Kelengkapan Dokumen</h3>
      <p style={styles.subtitle}>Pengabdian yang dinyatakan lolos wajib mengunggah SPK, Proposal Pelaksanaan, dan RAB.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <FileUploadRow label="Surat Perjanjian Kontrak (SPK)" placeholder="Maksimal 5MB (PDF)" accept=".pdf" />
        <FileUploadRow label="Proposal Pelaksanaan" placeholder="Maksimal 5MB (PDF)" accept=".pdf" />
        <FileUploadRow label="Rencana Anggaran Biaya (RAB)" placeholder="Maksimal 5MB (PDF)" accept=".pdf" />
        <FileUploadRow label="Surat Kesediaan Kerja Sama Mitra Sasaran" placeholder="Maksimal 5MB (PDF Bermeterai)" accept=".pdf" />
      </div>

      <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }} onClick={() => alert("Dokumen pengabdian disimpan!")}>
        Simpan File
      </button>
    </div>
  );
}

function TabRekap() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Rekap Pengeluaran</h3>
      <p style={styles.subtitle}>Dosen mengunggah rekap pengeluaran dalam bentuk PDF untuk termin 1 dan termin 2.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <RekapUploadBox title="Rekap Termin 1" />
        <RekapUploadBox title="Rekap Termin 2" />
      </div>
    </div>
  );
}

function TabCatatan() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Catatan Harian</h3>
      <FileUploadRow label="Pilih File" placeholder="Unggah dokumen catatan harian" />
      <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }}>Simpan Catatan</button>
    </div>
  );
}

function TabKemajuan() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Laporan Kemajuan</h3>
      <FileUploadRow label="Pilih File" placeholder="Unggah file laporan kemajuan" />
      <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }}>Simpan Laporan</button>
    </div>
  );
}

function TabAkhir() {
  return (
    <div>
      <h3 style={styles.sectionTitle}>Laporan Akhir</h3>
      <FileUploadRow label="Pilih File" placeholder="Unggah file laporan akhir" />
      <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }}>Simpan Laporan</button>
    </div>
  );
}

function TabLuaran() {
  const [identitas, setIdentitas] = useState('');
  const [jenisLainnya, setJenisLainnya] = useState('');

  return (
    <div>
      <h3 style={styles.sectionTitle}>Pengisian Capaian Luaran</h3>
      <div style={styles.formSection}>
        <label style={styles.labelBlock}>Identitas Luaran</label>
        <select style={{...styles.inputField, marginBottom: '15px'}} value={identitas} onChange={(e) => { setIdentitas(e.target.value); setJenisLainnya(''); }}>
          <option value="">-- Pilih Identitas Luaran --</option>
          <option value="Artikel">Artikel</option>
          <option value="HKI">HKI</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        {identitas === 'Lainnya' && (
          <>
            <label style={styles.labelBlock}>Jenis Luaran</label>
            <select style={{...styles.inputField, marginBottom: '20px'}} value={jenisLainnya} onChange={(e) => setJenisLainnya(e.target.value)}>
              <option value="">-- Pilih Jenis Luaran --</option>
              <option value="Video">Video Dokumentasi Kegiatan</option>
              <option value="Berita">Artikel Media Massa</option>
            </select>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          {identitas === 'Artikel' && <FormArtikel />}
          {identitas === 'HKI' && <FormHKI />}
          {identitas === 'Lainnya' && jenisLainnya === 'Video' && <FormVideo />}
          {identitas === 'Lainnya' && jenisLainnya === 'Berita' && <FormBerita />}
        </div>

        {(identitas === 'Artikel' || identitas === 'HKI' || (identitas === 'Lainnya' && jenisLainnya !== '')) && (
          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <AuthorSection type="Dosen" roleLabel="Peran" nameLabel="Nama Dosen" />
            <AuthorSection type="Mahasiswa" roleLabel="Peran" nameLabel="Nama Mahasiswa" />
            <AuthorSection type="Lain" roleLabel="Peran" nameLabel="Nama" />
            <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }} onClick={() => alert("Luaran Disimpan!")}>
              Simpan Luaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-FORM LUARAN PENGABDIAN ---
function FormArtikel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InputRow label="Judul Artikel" /><InputRow label="Nama Jurnal" /><InputRow label="ISSN" /><InputRow label="DOI" />
      <InputRow label="Volume / Nomor / Halaman" /><InputRow label="Tanggal Terbit" type="date" />
      <div style={styles.rowFlex}>
        <label style={styles.rowLabel}>Status Jurnal</label>
        <select style={{...styles.inputField, flex: 1}}>
          <option>Pilih Status</option><option>Published</option><option>Accepted</option><option>Under Review</option>
        </select>
        <span style={{ margin: '0 15px', fontWeight: 'bold', fontSize: '13px' }}>Peringkat</span>
        <input type="text" style={{...styles.inputField, flex: 1}} />
      </div>
      <InputRow label="URL" />
      <LuaranFileUpload label="Pilih File" />
    </div>
  );
}
function FormHKI() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InputRow label="Jenis HKI" /><InputRow label="Judul HKI" /><InputRow label="Tanggal" type="date" /><InputRow label="URL HKI" /><LuaranFileUpload label="Pilih File" />
    </div>
  );
}
function FormVideo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InputRow label="Platform Publikasi" /><InputRow label="Judul Video" /><InputRow label="Tanggal Publikasi" type="date" /><InputRow label="URL Video" /><LuaranFileUpload label="Pilih File" />
    </div>
  );
}
function FormBerita() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InputRow label="Jenis Media Massa" /><InputRow label="Judul Berita / Artikel" /><InputRow label="Nama Media Massa" /><InputRow label="Tanggal Terbit" type="date" /><InputRow label="URL Berita" /><LuaranFileUpload label="Pilih File" />
    </div>
  );
}

// ==========================================
// KOMPONEN BANTUAN INTERAKTIF
// ==========================================
function InputRow({ label, type = "text" }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type={type} style={{...styles.inputField, flex: 1}} />
    </div>
  );
}

function LuaranFileUpload({ label }) {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type="text" readOnly value={fileName} style={{...styles.inputField, flex: 1, backgroundColor: '#f1f5f9'}} />
      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
      <button style={{...styles.btnDark, marginLeft: '10px'}} onClick={() => fileRef.current.click()}>Cari</button>
    </div>
  );
}

function FileUploadRow({ label, placeholder, accept }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => { if (e.target.files.length > 0) setFile(e.target.files[0]); };

  return (
    <div>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>{label}</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" placeholder={placeholder} style={{ ...styles.inputField, backgroundColor: file ? '#e8f5e9' : '#f9f9f9' }} value={file ? file.name : ''} readOnly />
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept={accept} />
        <button style={styles.btnDark} onClick={() => fileInputRef.current.click()}>Cari</button>
      </div>
    </div>
  );
}

function RekapUploadBox({ title }) {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const handleFileChange = (e) => { if (e.target.files.length > 0) setFile(e.target.files[0]); };

  return (
    <div style={styles.uploadBox}>
      <h4>{title}</h4>
      <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf" />
      <div style={{ ...styles.uploadArea, backgroundColor: file ? '#f0f8ff' : 'transparent', cursor: 'pointer' }} onClick={() => fileRef.current.click()}>
        <span style={{ fontSize: '30px' }}>📄</span>
        <p>{file ? file.name : "Klik untuk Pilih Rekap PDF"}</p>
      </div>
    </div>
  );
}

function AuthorSection({ type, nameLabel, roleLabel }) {
  const [authors, setAuthors] = useState([{ id: 1 }]);
  return (
    <div style={{ marginBottom: '25px' }}>
      <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>Penulis {type}</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        <span style={{ flex: 2, fontSize: '12px', fontWeight: 'bold' }}>{nameLabel}</span>
        <span style={{ width: '80px', fontSize: '12px', fontWeight: 'bold' }}>Urutan</span>
        <span style={{ flex: 1, fontSize: '12px', fontWeight: 'bold' }}>{roleLabel}</span>
        <span style={{ width: '150px' }}></span>
      </div>
      {authors.map((author) => (
        <div key={author.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <input type="text" style={{...styles.inputField, flex: 2, padding: '8px'}} />
          <input type="number" style={{...styles.inputField, width: '80px', padding: '8px'}} />
          <input type="text" style={{...styles.inputField, flex: 1, padding: '8px'}} />
          <div style={{ width: '150px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="radio" name={`corresponding_${type}`} />
            <label>Corresponding Author</label>
          </div>
        </div>
      ))}
      <button style={styles.btnOutlineSmall} onClick={() => setAuthors([...authors, { id: Date.now() }])}>+ Tambah Anggota</button>
    </div>
  );
}

// ==========================================
// GAYA CSS (Styles)
// ==========================================
const styles = {
  container: { backgroundColor: 'white', width: '100%' },
  tabContainer: { display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px' },
  tabButton: { padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', marginRight: '10px', whiteSpace: 'nowrap', transition: 'all 0.3s' },
  contentContainer: { padding: '10px' },
  sectionTitle: { fontSize: '18px', marginBottom: '15px', color: '#1a1a2e', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  subtitle: { fontSize: '13px', color: '#666', marginBottom: '15px' },
  formSection: { marginTop: '15px' },
  labelBlock: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px', color: '#334155' },
  rowFlex: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
  rowLabel: { width: '220px', fontWeight: 'bold', fontSize: '13px', color: '#333' },
  inputField: { padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', width: '100%', fontSize: '13px' },
  
  // Custom Styles untuk Form Multi-Step Pengabdian
  formBoxLg: { marginTop: '15px', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
  innerCard: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', backgroundColor: '#f8fafc' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  
  // Buttons
  btnPrimaryFull: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '12px', width: '100%', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnPrimary: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnDark: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer' },
  btnDarkLarge: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' },
  btnOutlineLarge: { backgroundColor: 'white', color: '#1a1a2e', border: '1px solid #1a1a2e', padding: '10px 30px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' },
  btnOutlineSmall: { padding: '6px 12px', border: '1px solid #64748b', backgroundColor: 'white', color: '#64748b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', marginTop: '5px' },
  
  uploadBox: { flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', textAlign: 'center' },
  uploadArea: { border: '2px dashed #ccc', borderRadius: '8px', padding: '40px 20px', margin: '15px 0', color: '#666', transition: 'background-color 0.3s' },
};