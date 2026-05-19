import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      {/* Top Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 30px",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#1a1a2e" }}>SIP3MU UNDIP</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <select
            style={{
              padding: "8px",
              backgroundColor: "#1a1a2e",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            <option>DOSEN</option>
          </select>
          <span style={{ cursor: "pointer" }}>🔔</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
              }}
            ></div>
            <span>Nama Dosen</span>
          </div>
        </div>
      </header>

      {/* Main Navigation (Dark Blue) */}
      <nav
        style={{
          backgroundColor: "#1a1a2e",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "center", 
          gap: "50px", 
          flexWrap: "wrap",
        }}
      >
        <Link to="/dashboard" style={styles.navLink}>
          <span>🏠 Dashboard</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
        <Link to="/penelitian" style={styles.navLink}>
          <span>🔍 Penelitian</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
        <Link to="/pengabdian" style={styles.navLink}>
          <span>📄 Pengabdian</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
        <Link to="/publikasi" style={styles.navLink}>
          <span>📰 Publikasi</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
        
        {/* BAGIAN YANG DIPERBAIKI: Mengubah to="#" menjadi route yang benar */}
        <Link to="/pendanaan-lain" style={styles.navLink}>
          <span>📦 Pendanaan lain</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
        <Link to="/kekayaan-intelektual" style={styles.navLink}>
          <span>🔒 Kekayaan Intelektual</span>
          <span style={styles.dropdownIcon}>▼</span>
        </Link>
      </nav>

      {/* Main Content Area */}
      <div style={{ display: "flex", padding: "20px", gap: "20px", flex: 1 }}>
        {/* Dynamic Content (Kiri/Tengah) */}
        <div
          style={{
            flex: 3,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            minHeight: "500px",
          }}
        >
          <Outlet />
        </div>

        {/* Right Sidebar (Profil & Riwayat) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Card Profil Saya */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a1a2e",
                color: "white",
                padding: "10px 15px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>Profil Saya</span>
              <span style={{ cursor: 'pointer', fontSize: '12px' }}>📝</span>
            </div>
            <div style={{ padding: "20px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#1a1a2e",
                  margin: "0 auto 10px",
                }}
              ></div>
              <strong>Nama Dosen</strong>
              <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
                Departemen
                <br />
                Universitas Diponegoro
              </p>
              <span
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  fontSize: "10px",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  display: "inline-block",
                  marginTop: "5px"
                }}
              >
                Aktif Mengajar
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                  borderTop: "1px solid #eee",
                  paddingTop: "15px",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", color: "#666", marginBottom: "5px" }}>
                    Jenjang Pendidikan
                  </div>
                  <strong style={{ color: "#0056b3", fontSize: "16px" }}>S2</strong>
                </div>
                <div style={{ width: '1px', backgroundColor: '#eee', height: '40px' }}></div>
                <div>
                  <div style={{ fontSize: "11px", color: "#666", marginBottom: "5px" }}>
                    Jabatan Akademik
                  </div>
                  <strong style={{ color: "#0056b3", fontSize: "16px" }}>Lektor</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card Riwayat Usulan */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              minHeight: "200px",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a1a2e",
                color: "white",
                padding: "10px 15px",
                fontWeight: "bold",
              }}
            >
              Riwayat Usulan
            </div>
            <div style={{ padding: "15px" }}>
              {/* List riwayat nanti disini */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navLink: { 
    color: "white", 
    textDecoration: "none", 
    fontSize: "13px",
    display: "flex", 
    alignItems: "center",
    gap: "8px", 
    transition: "opacity 0.2s"
  },
  dropdownIcon: {
    fontSize: "10px",
    opacity: 0.7
  }
};