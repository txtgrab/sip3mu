import { useState } from "react";

export default function PersetujuanAnggota() {
  // Data dummy (simulasi usulan yang masuk dan menunggu persetujuan)
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      judul: "Pengembangan Sistem Deteksi Dini Penyakit Jantung Berbasis AI",
      ketua: "Dr. Budi Santoso, S.T., M.Kom.",
      jenis: "Penelitian Hibah Universitas",
      peran: "Anggota Peneliti (Analisis Data ECG)",
      tanggal: "04 Juni 2026",
    },
    {
      id: 2,
      judul: "Pelatihan Pembuatan Website Desa di Kabupaten Demak",
      ketua: "Siti Aminah, S.Kom., M.Cs.",
      jenis: "Pengabdian Masyarakat Mandiri",
      peran: "Anggota Pengabdi (Instruktur Pendamping)",
      tanggal: "02 Juni 2026",
    },
  ]);

  // Fungsi untuk menangani aksi Setuju
  const handleApprove = (id) => {
    alert("Anda telah menyetujui untuk bergabung dalam tim usulan ini!");
    // Hapus dari daftar (simulasi update state)
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  // Fungsi untuk menangani aksi Tolak
  const handleReject = (id) => {
    const confirmReject = window.confirm(
      "Apakah Anda yakin ingin menolak undangan bergabung di tim ini?",
    );
    if (confirmReject) {
      // Hapus dari daftar
      setInvitations(invitations.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a1a2e", marginBottom: "5px" }}>
          Persetujuan Anggota Tim
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Daftar usulan kegiatan Tridarma yang mengundang Anda sebagai anggota.
        </p>
      </div>

      {/* JIKA TIDAK ADA UNDANGAN */}
      {invitations.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>📭</div>
          <h3 style={{ color: "#475569", margin: "0 0 10px 0" }}>
            Tidak Ada Undangan
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            Saat ini Anda belum didaftarkan sebagai anggota tim pada usulan
            manapun.
          </p>
        </div>
      ) : (
        /* JIKA ADA UNDANGAN */
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {invitations.map((inv) => (
            <div key={inv.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{inv.jenis}</span>
                <span style={styles.date}>{inv.tanggal}</span>
              </div>

              <h3 style={styles.title}>{inv.judul}</h3>

              <div style={styles.detailGrid}>
                <div>
                  <label style={styles.label}>Ketua Pengusul</label>
                  <div style={styles.value}>{inv.ketua}</div>
                </div>
                <div>
                  <label style={styles.label}>Peran Anda / Tugas</label>
                  <div style={styles.value}>{inv.peran}</div>
                </div>
              </div>

              <div style={styles.actionContainer}>
                <button
                  style={styles.btnReject}
                  onClick={() => handleReject(inv.id)}
                >
                  ✖ Tolak
                </button>
                <button
                  style={styles.btnApprove}
                  onClick={() => handleApprove(inv.id)}
                >
                  ✔ Setuju Bergabung
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = {
  container: {
    backgroundColor: "transparent",
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "25px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  badge: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  date: {
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "500",
  },
  title: {
    fontSize: "18px",
    color: "#1e293b",
    margin: "0 0 20px 0",
    lineHeight: "1.4",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    backgroundColor: "#f8fafc",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #f1f5f9",
    marginBottom: "20px",
  },
  label: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: "5px",
    display: "block",
  },
  value: {
    fontSize: "14px",
    color: "#334155",
    fontWeight: "500",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "20px",
  },
  btnApprove: {
    backgroundColor: "#10b981", // Hijau
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  btnReject: {
    backgroundColor: "white",
    color: "#ef4444", // Merah
    border: "1px solid #fca5a5",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  emptyState: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "50px 20px",
    border: "1px dashed #cbd5e1",
    textAlign: "center",
  },
};
