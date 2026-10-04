"use client";

import { useState } from "react";

export default function IngestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function fetchNews() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/fetch-news", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "تعذر جلب الأخبار");
        return;
      }

      setResult(data);
    } catch {
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="news-category">NEWS INGEST</p>
            <h1 className="section-title">جلب الأخبار</h1>
          </div>
        </div>

        <div className="admin-card">
          <h2>تحديث الأخبار</h2>

          <p
            className="news-summary"
            style={{ marginTop: "10px" }}
          >
            اضغط على الزر لجلب الأخبار من المصادر النشطة ومعالجتها.
          </p>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="primary-button"
            style={{
              marginTop: "20px",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "جاري جلب الأخبار..." : "جلب الأخبار الآن"}
          </button>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#ffecec",
                color: "#b00020",
              }}
            >
              {error}
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <h3>تمت العملية بنجاح</h3>

              <div
                className="dashboard-grid"
                style={{ marginTop: "15px" }}
              >
                <div className="stat-card">
                  <div className="stat-label">
                    تمت معالجتها
                  </div>
                  <div className="stat-value">
                    {result.processed ?? 0}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    أخبار جديدة
                  </div>
                  <div className="stat-value">
                    {result.created ?? 0}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    تم تجاوزها
                  </div>
                  <div className="stat-value">
                    {result.skipped ?? 0}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
            }
