"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [status, setStatus] = useState({
    database: "جاري الفحص...",
    api: "جاري الفحص...",
    news: "جاري الفحص...",
  });

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/admin/stats", {
          cache: "no-store",
        });

        if (res.ok) {
          setStatus({
            database: "يعمل",
            api: "يعمل",
            news: "جاهز",
          });
        } else {
          setStatus({
            database: "غير متاح",
            api: "يعمل",
            news: "غير متاح",
          });
        }
      } catch {
        setStatus({
          database: "غير متاح",
          api: "غير متاح",
          news: "غير متاح",
        });
      }
    }

    checkStatus();
  }, []);

  return (
    <main className="page-section">
      <div className="container">
        <p className="news-category">SYSTEM</p>
        <h1 className="section-title">حالة النظام</h1>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-label">قاعدة البيانات</div>
            <div className="stat-value" style={{ fontSize: "22px" }}>
              {status.database}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">واجهة API</div>
            <div className="stat-value" style={{ fontSize: "22px" }}>
              {status.api}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">نظام الأخبار</div>
            <div className="stat-value" style={{ fontSize: "22px" }}>
              {status.news}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
