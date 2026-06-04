import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const [role, setRole] = useState("DOSEN");
  const [showOperatorPopup, setShowOperatorPopup] = useState(false);
  const [showPimpinanPopup, setShowPimpinanPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/dashboard";

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "OPERATOR") {
      setShowOperatorPopup(true);
    } else if (selectedRole === "PIMPINAN") {
      setShowPimpinanPopup(true);
    } else {
      setRole(selectedRole);
      navigate("/dashboard");
    }
  };

  const handlePilihOperator = (tipeOperator) => {
    setRole(tipeOperator);
    setShowOperatorPopup(false);
    navigate("/dashboard");
  };

  const handlePilihPimpinan = (tipePimpinan) => {
    setRole(tipePimpinan);
    setShowPimpinanPopup(false);
    navigate("/dashboard");
  };

  const isOperator = role === "OPERATOR FAKULTAS" || role === "OPERATOR LPPM";
  const isPimpinan = role === "PIMPINAN LPPM" || role === "PIMPINAN FAKULTAS";

  const displayRoleName = role.replace("_", " ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        position: "relative",
      }}
    >
      {/* POPUP MODAL PILIH OPERATOR */}
      {showOperatorPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ marginTop: 0, color: "#1a1a2e" }}>
              Pilih Tingkat Wewenang Operator
            </h3>
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}
            >
              Silakan pilih ruang lingkup wewenang Operator Anda:
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                onClick={() => handlePilihOperator("OPERATOR FAKULTAS")}
                style={styles.btnPrimaryFull}
              >
                Operator Fakultas
              </button>
              <button
                onClick={() => handlePilihOperator("OPERATOR LPPM")}
                style={styles.btnPrimaryFull}
              >
                Operator Universitas (LPPM)
              </button>
            </div>
            <button
              onClick={() => setShowOperatorPopup(false)}
              style={{ ...styles.btnOutline, marginTop: "15px", width: "100%" }}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODAL PILIH PIMPINAN */}
      {showPimpinanPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ marginTop: 0, color: "#1a1a2e" }}>
              Pilih Tingkat Wewenang Pimpinan
            </h3>
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}
            >
              Silakan pilih ruang lingkup wewenang Pimpinan Anda:
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                onClick={() => handlePilihPimpinan("PIMPINAN LPPM")}
                style={styles.btnPrimaryFull}
              >
                Pimpinan LPPM
              </button>
              <button
                onClick={() => handlePilihPimpinan("PIMPINAN FAKULTAS")}
                style={styles.btnPrimaryFull}
              >
                Pimpinan Prodi / Fakultas / Universitas
              </button>
            </div>
            <button
              onClick={() => setShowPimpinanPopup(false)}
              style={{ ...styles.btnOutline, marginTop: "15px", width: "100%" }}
            >
              Batal
            </button>
          </div>
        </div>
      )}

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
          {/* 1. Dropdown Pemilihan Role (Paling Kiri) */}
          <select
            value={isOperator ? "OPERATOR" : isPimpinan ? "PIMPINAN" : role}
            onChange={handleRoleChange}
            style={{
              padding: "8px",
              backgroundColor: "#1a1a2e",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <option value="DOSEN">DOSEN</option>
            <option value="REVIEWER">REVIEWER</option>
            <option value="OPERATOR">OPERATOR</option>
            <option value="PIMPINAN">PIMPINAN</option>
            <option value="ADMINISTRATOR">ADMINISTRATOR</option>
          </select>

          {/* 2. Ikon Notifikasi (Di Tengah) */}
          {role === "DOSEN" && (
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => navigate("/persetujuan-anggota")}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#1a1a2e",
                }}
              >
                🔔
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-15px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                1
              </span>
            </div>
          )}

          {/* 3. Profil / Nama Pengguna (Paling Kanan) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
              }}
            ></div>
            <span
              style={{ fontSize: "14px", fontWeight: "bold", color: "#334155" }}
            >
              Nama Pengguna
            </span>
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
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/dashboard" style={styles.navLink}>
          <span>Dashboard</span>
        </Link>

        {/* MENU KHUSUS DOSEN */}
        {role === "DOSEN" && (
          <>
            <Link to="/penelitian" style={styles.navLink}>
              <span>Penelitian</span>
              <span style={styles.dropdownIcon}></span>
            </Link>
            <Link to="/pengabdian" style={styles.navLink}>
              <span>Pengabdian</span>
              <span style={styles.dropdownIcon}></span>
            </Link>
            <Link to="/publikasi" style={styles.navLink}>
              <span>Publikasi</span>
              <span style={styles.dropdownIcon}></span>
            </Link>
            <Link to="/pendanaan-lain" style={styles.navLink}>
              <span>Pendanaan lain</span>
            </Link>
            <Link to="/kekayaan-intelektual" style={styles.navLink}>
              <span>Kekayaan Intelektual</span>
            </Link>
          </>
        )}

        {/* MENU KHUSUS REVIEWER */}
        {role === "REVIEWER" && (
          <>
            <Link to="/evaluasi-proposal" style={styles.navLink}>
              <span>Evaluasi Proposal</span>
            </Link>
            <Link to="/penilaian-pemaparan" style={styles.navLink}>
              <span>Penilaian Pemaparan</span>
            </Link>
            <Link to="/monev" style={styles.navLink}>
              <span>Proses Monev</span>
            </Link>
          </>
        )}

        {/* MENU KHUSUS OPERATOR */}
        {isOperator && (
          <>
            <Link to="/manajemen-periode" style={styles.navLink}>
              <span>Manajemen Periode</span>
            </Link>
            <Link to="/validasi-administratif" style={styles.navLink}>
              <span>Validasi Administratif</span>
            </Link>
            <Link to="/penugasan-review" style={styles.navLink}>
              <span>Penugasan Reviewer</span>
            </Link>
            <Link to="/penetapan-usulan" style={styles.navLink}>
              <span>Penetapan Pendanaan</span>
            </Link>
            <Link to="/validasi-laporan-akhir" style={styles.navLink}>
              <span>Validasi Laporan</span>
            </Link>
            <Link to="/validasi-luaran-non-hibah" style={styles.navLink}>
              <span>Validasi Luaran</span>
            </Link>
          </>
        )}

        {/* MENU KHUSUS PIMPINAN */}
        {isPimpinan && (
          <>
            <Link to="/monitoring" style={styles.navLink}>
              <span>Monitoring Kegiatan</span>
            </Link>
            {role === "PIMPINAN LPPM" && (
              <Link to="/approval-pimpinan" style={styles.navLink}>
                <span>Approval Pimpinan</span>
              </Link>
            )}
          </>
        )}

        {/* MENU KHUSUS ADMINISTRATOR */}
        {role === "ADMINISTRATOR" && (
          <Link to="/kelola-sistem" style={styles.navLink}>
            <span>Administrasi Sistem</span>
          </Link>
        )}
      </nav>

      {/* Main Content Area */}
      <div style={{ display: "flex", padding: "20px", gap: "20px", flex: 1 }}>
        <div
          style={{
            flex: isDashboard ? 3 : 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            minHeight: "500px",
          }}
        >
          {/* Kirimkan data role ke Outlet agar page tahu sedang jadi aktor apa */}
          <Outlet context={{ role }} />
        </div>

        {/* Right Sidebar HANYA MUNCUL DI PAGE DASHBOARD */}
        {isDashboard && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
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
                  alignItems: "center",
                }}
              >
                <span>Profil Saya</span>
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
                <strong>Nama Pengguna</strong>
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
                  Universitas Diponegoro
                </p>
                <div
                  style={{
                    marginTop: "10px",
                    display: "inline-block",
                    backgroundColor: "#e0f2fe",
                    color: "#0369a1",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  Akses: {displayRoleName}
                </div>
              </div>
            </div>
          </div>
        )}
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
  },
  dropdownIcon: { fontSize: "10px", opacity: 0.7 },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "350px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
