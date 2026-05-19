import { useState, useRef } from 'react';

export default function KekayaanIntelektual() {
  const [view, setView] = useState('list');
  const [jenisKI, setJenisKI] = useState('');
  const [statusKI, setStatusKI] = useState('');

  const listJenisKI = [
    "Hak Cipta", "Paten", "Paten Sederhana", "Merek", 
    "Desain Industri", "Perlindungan Varietas Tanaman (PVT)"
  ];

  const listStatus = ["Permohonan", "Terdaftar (Registered)", "Bersertifikat (Granted)"];

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Kekayaan Intelektual</h2>

      {view === 'list' && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '15px', margin: 0 }}>Daftar Portofolio Kekayaan Intelektual</h3>
            <button style={styles.btnPrimary} onClick={() => setView('form')}>+ Ajukan Usulan</button>
          </div>
          <div style={styles.emptyState}><p style={{ color: '#94a3b8' }}>Belum ada data kekayaan intelektual.</p></div>
        </div>
      )}

      {view === 'form' && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>Tambah Data Kekayaan Intelektual</h3>
            <button onClick={() => setView('list')} style={styles.btnClose}>✖</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Jenis KI */}
            <SelectRow label="Jenis Kekayaan Intelektual" options={listJenisKI} value={jenisKI} onChange={setJenisKI} />
            
            {/* Status */}
            <SelectRow label="Status" options={listStatus} value={statusKI} onChange={setStatusKI} />

            <InputRow label="Judul HKI" />
            <InputRow label="Nomor Pendaftaran" />
            <InputRow label="Nomor Sertifikat" />
            <InputRow label="Tanggal Pendaftaran" type="date" />
            <InputRow label="Tanggal Terbit" type="date" />
            <InputRow label="URL" />
            <FileUploadRow label="Pilih File" />
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <InventorSection title="Inventor / Pencipta Dosen" nameLabel="Nama Dosen" />
            <InventorSection title="Inventor / Pencipta Mahasiswa" nameLabel="Nama Mahasiswa" />
            <InventorSection title="Inventor / Pencipta Luar Kampus" nameLabel="Nama" />
            <button style={styles.btnSimpanFull} onClick={() => { alert('Disimpan!'); setView('list'); }}>Simpan HKI</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// KOMPONEN PENDUKUNG
// ==========================================

function InputRow({ label, type = "text" }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type={type} style={{...styles.inputField, flex: 1}} />
    </div>
  );
}

function SelectRow({ label, options, value, onChange }) {
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <select style={{...styles.inputField, flex: 1}} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Pilih {label} --</option>
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function FileUploadRow({ label }) {
  const [fileName, setFileName] = useState('');
  const ref = useRef(null);
  return (
    <div style={styles.rowFlex}>
      <label style={styles.rowLabel}>{label}</label>
      <input type="text" readOnly value={fileName} style={{...styles.inputField, flex: 1, backgroundColor: '#f1f5f9'}} />
      <input type="file" style={{ display: 'none' }} ref={ref} onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
      <button style={styles.btnCari} onClick={() => ref.current.click()}>Cari</button>
    </div>
  );
}

function InventorSection({ title, nameLabel }) {
  const [members, setMembers] = useState([{ id: Date.now() }]);
  return (
    <div style={{ marginBottom: '30px' }}>
      <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '10px' }}>{title}</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        <span style={{ flex: 2, fontSize: '11px', fontWeight: 'bold' }}>{nameLabel}</span>
        <span style={{ width: '80px', fontSize: '11px', fontWeight: 'bold' }}>Urutan</span>
        <span style={{ flex: 1, fontSize: '11px', fontWeight: 'bold' }}>Peran</span>
      </div>
      {members.map((m) => (
        <div key={m.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <input type="text" style={{...styles.inputField, flex: 2, padding: '8px'}} />
          <input type="number" style={{...styles.inputField, width: '80px', padding: '8px'}} />
          <input type="text" style={{...styles.inputField, flex: 1, padding: '8px'}} />
        </div>
      ))}
      <button style={styles.btnTambah} onClick={() => setMembers([...members, { id: Date.now() }])}>+ Tambah Anggota</button>
    </div>
  );
}

const styles = {
  container: { backgroundColor: 'transparent', width: '100%' },
  card: { backgroundColor: 'white', borderRadius: '8px', padding: '30px', border: '1px solid #e2e8f0' },
  emptyState: { height: '300px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  rowFlex: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
  rowLabel: { width: '250px', fontWeight: 'bold', fontSize: '13px', color: '#334155' },
  inputField: { padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' },
  btnPrimary: { backgroundColor: '#60a5fa', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  btnSimpanFull: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '12px', width: '100%', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  btnCari: { backgroundColor: '#1a1a2e', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer', marginLeft: '10px', fontSize: '12px' },
  btnTambah: { padding: '5px 12px', border: '1px solid #64748b', backgroundColor: 'white', color: '#64748b', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' },
  btnClose: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94a3b8' }
};