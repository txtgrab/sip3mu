import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login sukses, arahkan ke dashboard
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* Pastikan logo-undip.png ada di folder public */}
          <img
            src="/logo-undip.png"
            alt="Logo Undip"
            style={{ height: "80px", objectFit: "contain" }}
          />
          <h2>Single Sign On (SSO)</h2>
          <p style={{ color: "#666" }}>Universitas Diponegoro</p>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#999" }}>
          Silahkan Masuk
        </p>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="NIM/NIP/username/e-mail official Undip"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btnOutline}>
            LOGIN
          </button>
          <button type="button" style={styles.btnSolid}>
            Reset Password
          </button>
        </form>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <p>
            Belum memiliki akun?{" "}
            <a href="#" style={{ color: "#d9534f" }}>
              Daftar sekarang!
            </a>
          </p>
          <p>
            <a href="#" style={{ color: "#0056b3" }}>
              Pendaftaran alumni klik disini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Hanya ada SATU deklarasi styles di sini
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",

    // Pastikan bg-undip.jpg ada di folder public
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/bg-undip.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
  },
  btnOutline: {
    padding: "12px",
    border: "1px solid #0056b3",
    color: "#0056b3",
    backgroundColor: "transparent",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnSolid: {
    padding: "12px",
    border: "none",
    color: "white",
    backgroundColor: "#d9534f",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
