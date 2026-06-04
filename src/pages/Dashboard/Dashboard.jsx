import { useOutletContext, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { role } = useOutletContext();
  const navigate = useNavigate();

  // Simulasi data pengumuman periode dari Operator
  const pengumumanAktif = [
    {
      id: 1,
      jenis: "Penelitian",
      judul: "Penerimaan Proposal Penelitian Dasar Fakultas (Tahun 2026)",
      deadline: "30 Juni 2026",
      kuota: 20,
      level: "Fakultas",
    },
    {
      id: 2,
      jenis: "Pengabdian",
      judul: "Pengabdian Kemitraan Masyarakat Tingkat Universitas",
      deadline: "15 Juli 2026",
      kuota: 50,
      level: "Universitas",
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      {/* HEADER DASHBOARD */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{ margin: "0 0 10px 0", color: "#1a1a2e", fontSize: "28px" }}
        >
          Selamat Datang, User!
        </h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: "16px" }}>
          Sistem Informasi Penelitian dan Pengabdian kepada Masyarakat
          Universitas (SIP3MU)
        </p>
      </div>

      {/* TAMPILAN KHUSUS DOSEN: PENGUMUMAN PERIODE BUKA */}
      {role === "DOSEN" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* BANNER INFORMASI UTAMA */}
          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontSize: "40px" }}>📢</div>
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#1e3a8a" }}>
                Informasi Periode Hibah Aktif
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#1e40af",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                Operator telah membuka periode pengajuan proposal untuk tahun
                akademik ini. Silakan persiapkan proposal Anda dan perhatikan
                batas waktu (deadline) yang telah ditetapkan.
              </p>
            </div>
          </div>

          {/* KARTU SKEMA YANG SEDANG BUKA */}
          <h3 style={{ margin: "10px 0 0 0", color: "#1a1a2e" }}>
            Skema Tersedia untuk Anda
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {pengumumanAktif.map((skema) => (
              <div key={skema.id} style={styles.card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <span style={styles.badge}>{skema.jenis}</span>
                  <span style={styles.badgeLevel}>{skema.level}</span>
                </div>
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    color: "#1e293b",
                    fontSize: "16px",
                    lineHeight: "1.4",
                  }}
                >
                  {skema.judul}
                </h4>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    marginBottom: "5px",
                  }}
                >
                  <strong>Batas Waktu:</strong>{" "}
                  <span style={{ color: "#b45309" }}>{skema.deadline}</span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    marginBottom: "20px",
                  }}
                >
                  <strong>Kuota Pendanaan:</strong> {skema.kuota} Usulan
                </div>

                <button
                  onClick={() =>
                    navigate(
                      skema.jenis === "Penelitian"
                        ? "/penelitian"
                        : "/pengabdian",
                    )
                  }
                  style={styles.btnAction}
                >
                  Mulai Ajukan {skema.jenis}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAMPILAN JIKA LOGIN SEBAGAI SELAIN DOSEN */}
      {role !== "DOSEN" && (
        <div style={styles.emptyState}>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}></div>
          <h2 style={{ margin: "0 0 10px 0", color: "#334155" }}>
            Dashboard {role}
          </h2>
          <p style={{ color: "#64748b", margin: 0 }}>
            Ringkasan data statistik dan performa sistem akan ditampilkan di
            sini.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  badge: {
    backgroundColor: "#e0f2fe",
    color: "#0284c7",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  badgeLevel: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  btnAction: {
    marginTop: "auto",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    width: "100%",
  },
  emptyState: {
    backgroundColor: "white",
    border: "1px dashed #cbd5e1",
    borderRadius: "8px",
    padding: "60px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
  },
};
