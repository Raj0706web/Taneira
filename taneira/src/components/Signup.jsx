import { useState } from "react";
import API from "../api/axios";
const inp = {
  width: "100%",
  padding: "10px 14px 10px 34px",
  border: "1px solid rgba(184,135,42,.3)",
  borderRadius: 2,
  fontSize: ".85rem",
  background: "rgba(250,246,240,.6)",
  color: "var(--charcoal)",
  outline: "none",
};
const lbl = {
  fontSize: ".63rem",
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--warm-gray)",
};

export default function SignupPage({ onSignup, onSwitchToLogin, onClose }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, username, email, password, confirm } = form;

    if (!name || !username || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/register", {
        name,
        username,
        email,
        password,
      });

      console.log("Signup success:", res.data);

      // 🔥 SAVE LOGIN DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setLoading(false);

      // 🔥 update app state (IMPORTANT)
      onSignup(res.data);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg,#0a1a08,#1a3a12,#2a5c1a)",
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn .25s ease",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }} onClick={onClose} />
      <div
        style={{
          background: "var(--ivory)",
          borderRadius: 4,
          padding: "36px 38px",
          width: "100%",
          maxWidth: 500,
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,.45)",
          animation: "popIn .3s ease",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            color: "var(--warm-gray)",
            fontSize: "1rem",
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          ✕
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: ".56rem",
              letterSpacing: ".34em",
              color: "var(--warm-gray)",
            }}
          >
            TATA
          </span>
          <span style={{ color: "rgba(184,135,42,.35)", fontSize: "1.1rem" }}>
            |
          </span>
          <div>
            <div
              style={{
                fontFamily: "var(--fd)",
                fontSize: "1.8rem",
                color: "var(--deep-maroon)",
                lineHeight: 1,
              }}
            >
              Taneira
            </div>
            <div
              style={{
                fontSize: ".52rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Handloom Heritage
            </div>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right,transparent,rgba(184,135,42,.4),transparent)",
            margin: "0 0 20px",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--fd)",
            fontSize: "1.65rem",
            fontWeight: 300,
            color: "var(--deep-maroon)",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Create Account
        </h2>
        <p
          style={{
            fontSize: ".76rem",
            color: "var(--warm-gray)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Join our community of heritage lovers
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={lbl}>Full Name</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    left: 10,
                    color: "var(--gold)",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="13"
                  height="13"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  style={inp}
                  autoFocus
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={lbl}>Username</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    left: 10,
                    color: "var(--gold)",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="13"
                  height="13"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="@username"
                  value={form.username}
                  onChange={set("username")}
                  style={inp}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={lbl}>Email Address</label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                style={{
                  position: "absolute",
                  left: 10,
                  color: "var(--gold)",
                  pointerEvents: "none",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="13"
                height="13"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={set("email")}
                style={inp}
              />
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={lbl}>Password</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    left: 10,
                    color: "var(--gold)",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="13"
                  height="13"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min 6 chars"
                  value={form.password}
                  onChange={set("password")}
                  style={{ ...inp, paddingRight: 30 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 8,
                    background: "none",
                    border: "none",
                    color: "var(--warm-gray)",
                    cursor: "pointer",
                    display: "flex",
                    padding: 2,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="13"
                    height="13"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={lbl}>Confirm</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    left: 10,
                    color: "var(--gold)",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="13"
                  height="13"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Repeat"
                  value={form.confirm}
                  onChange={set("confirm")}
                  style={inp}
                />
              </div>
            </div>
          </div>
          {error && (
            <div
              style={{
                fontSize: ".73rem",
                color: "#c0392b",
                textAlign: "center",
                padding: 8,
                background: "rgba(192,57,43,.08)",
                border: "1px solid rgba(192,57,43,.2)",
                borderRadius: 2,
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 13,
              background: "var(--deep-maroon)",
              color: "var(--gold-light)",
              border: "none",
              borderRadius: 2,
              fontSize: ".76rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 46,
              opacity: loading ? 0.75 : 1,
              marginTop: 4,
            }}
          >
            {loading ? (
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(212,168,75,.3)",
                  borderTopColor: "var(--gold-light)",
                  borderRadius: "50%",
                  animation: "spin .7s linear infinite",
                  display: "inline-block",
                }}
              />
            ) : (
              "Create My Account"
            )}
          </button>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 16,
            fontSize: ".78rem",
            color: "var(--warm-gray)",
          }}
        >
          <span>Already have an account?</span>
          <button
            onClick={onSwitchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "var(--deep-maroon)",
              fontSize: ".78rem",
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: ".64rem",
            color: "var(--gold)",
            letterSpacing: ".1em",
            marginTop: 12,
            opacity: 0.65,
          }}
        >
          ✦ &nbsp;Exclusive member benefits await you
        </p>
      </div>
    </div>
  );
}
