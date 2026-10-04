"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "كلمة المرور غير صحيحة");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-section">
      <div
        className="container"
        style={{
          maxWidth: "500px",
        }}
      >
        <div className="admin-card">
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <div
              className="logo-mark"
              style={{ margin: "0 auto 15px" }}
            >
              Z
            </div>

            <h1 className="section-title">تسجيل الدخول</h1>

            <p className="news-summary">
              لوحة إدارة ZACK NEWS
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              كلمة المرور
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
              className="search-input"
              style={{
                width: "100%",
                marginBottom: "15px",
              }}
            />

            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
              style={{
                width: "100%",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
