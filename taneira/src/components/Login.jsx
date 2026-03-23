import { useState } from "react";
import API from "../api/axios";
const inp = {
  width: "100%",
  padding: "11px 14px 11px 36px",
  border: "1px solid rgba(184,135,42,.3)",
  borderRadius: 2,
  fontSize: ".88rem",
  background: "rgba(250,246,240,.6)",
  color: "var(--charcoal)",
  outline: "none",
};
const lbl = {
  fontSize: ".65rem",
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--warm-gray)",
};

export default function LoginPage({ onLogin, onSwitchToSignup, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      console.log("Login success:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setLoading(false);

      onLogin(res.data);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg,#1a0a0a,#3d1010,#5c1a1a)",
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
          padding: "40px 38px",
          width: "100%",
          maxWidth: 400,
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
            marginBottom: 16,
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
            margin: "0 0 22px",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--fd)",
            fontSize: "1.65rem",
            fontWeight: 300,
            color: "var(--deep-maroon)",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            fontSize: ".76rem",
            color: "var(--warm-gray)",
            textAlign: "center",
            marginBottom: 22,
          }}
        >
          Sign in to your account to continue
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={lbl}>Email</label>
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
                  left: 11,
                  color: "var(--gold)",
                  pointerEvents: "none",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="14"
                height="14"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inp}
                autoFocus
                autoComplete="email"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
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
                  left: 11,
                  color: "var(--gold)",
                  pointerEvents: "none",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="14"
                height="14"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inp, paddingRight: 36 }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  background: "none",
                  border: "none",
                  color: "var(--warm-gray)",
                  cursor: "pointer",
                  display: "flex",
                  padding: 2,
                }}
              >
                {showPass ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="15"
                    height="15"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="15"
                    height="15"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
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
          <div style={{ textAlign: "right" }}>
            <a
              href="#"
              style={{ fontSize: ".73rem", color: "var(--gold)" }}
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>
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
              "Log In"
            )}
          </button>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 18,
            fontSize: ".78rem",
            color: "var(--warm-gray)",
          }}
        >
          <span>New to Taneira?</span>
          <button
            onClick={onSwitchToSignup}
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
            Create Account
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: ".64rem",
            color: "var(--gold)",
            letterSpacing: ".1em",
            marginTop: 14,
            opacity: 0.65,
          }}
        >
          ✦ &nbsp;Exclusive member benefits await you
        </p>
      </div>
    </div>
  );
}
