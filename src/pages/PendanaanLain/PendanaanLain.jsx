import { useState, useRef } from 'react';

export default function PendanaanLain() {
  const [view, setView] = useState('list'); // 'list' atau 'form'

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Pendanaan Lain</h2>

      {/* TAMPILAN 1: LIST */}
      {view === 'list' && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '15px', margin: 0 }}>Daftar Pendanaan Lain</h3>
            <button style={styles.btnPrimary} onClick={() => setView('form')}>
              + Ajukan Usulan
            </button>
          </div>
          <div style={{ height: '300px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ color: '#94a3b8' }}>Belum ada data pendanaan lain.</p>
          </div>
        </div>
      )}

      {/* TAMPILAN 2: FORM TAMBAH */}
      {view === 'form' && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>Tambah Data Pendanaan Lain</h3>
            <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>✖</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SelectRow label="Sumber Pendanaan" options={['Pendanaan Industri / Swasta', 'Pendanaan Instansi Pemerintah (Non-Kemendikbud)', 'Pendanaan Mandiri (Self-Funded)']} />
            <SelectRow label="Kategori Kegiatan" options={['Penelitian Kerja Sama', 'Pengabdian Masyarakat Kerja Sama', 'Konsultasi Ahli']} />
            <InputRow label="Judul Kegiatan" />
            <InputRow label="Nama Instansi Pemberi Dana" />
            <InputRow label="Nomor Kontrak / Surat Perjanjian Kerja Sama (PKS)" />
            <InputRow label="Tanggal Mulai Kontrak" type="date" />
            <InputRow label="Tanggal Selesai Kontrak" type="date" />
            <InputRow label="Total Nominal Dana" />
            <FileUploadRow label="Pilih File" />
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <AuthorSection type="Dosen" nameLabel="Nama Dosen" />
            <AuthorSection type="Mahasiswa" nameLabel="Nama Mahasiswa" />
            <AuthorSection type="Luar" nameLabel="Nama" />
            
            <button style={{ ...styles.btnPrimaryFull, marginTop: '30px' }} onClick={() => { alert('Berhasil disimpan!'); setView('list'); }}>
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
      <input type={type} style={{...styles.inputField, flex: 1}} />
    </div>
  );
}

function SelectRow({ label, options }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <select style={{...styles.inputField, flex: 1}}>
        <option>-- Pilih {label} --</option>
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function FileUploadRow({ label }) {
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

function AuthorSection({ type, nameLabel }) {
  const [authors, setAuthors] = useState([{ id: 1 }]);
  return (
    <div style={{ marginBottom: '25px' }}>
      <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>Anggota {type}</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        <span style={{ flex: 2, fontSize: '11px', fontWeight: 'bold' }}>{nameLabel}</span>
        <span style={{ width: '80px', fontSize: '11px', fontWeight: 'bold' }}>Urutan</span>
        <span style={{ width: '150px', fontSize: '11px', fontWeight: 'bold' }}>Tugas</span>
      </div>
      {authors.map((a) => (
        <div key={a.id} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input type="text" style={{...styles.inputField, flex: 2, padding: '8px'}} />
          <input type="number" style={{...styles.inputField, width: '80px', padding: '8px'}} />
          <input type="text" style={{...styles.inputField, width: '150px', padding: '8px'}} />
        </div>
      ))}
      <button style={styles.btnOutlineSmall} onClick={() => setAuthors([...authors, { id: Date.now() }])}>+ Tambah Anggota</button>
    </div>
  );
}

const styles = {
  container: { backgroundColor: 'transparent', width: '100%' },
  card: { backgroundColor: 'white', borderRadius: '8px', padding: '30px', border: '1px solid #e2e8f0' },
  rowFlex: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
  rowLabel: { width: '250px', fontWeight: 'bold', fontSize: '13px', color: '#333' },
  inputField: { padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' },
  btnPrimaryFull: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '12px', width: '100%', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnPrimary: { backgroundColor: '#60a5fa', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  btnDark: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  btnOutlineSmall: { padding: '5px 10px', border: '1px solid #64748b', backgroundColor: 'white', color: '#64748b', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }
};