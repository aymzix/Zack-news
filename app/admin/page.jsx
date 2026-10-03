"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    sources: 0,
  });

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/stats", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("تعذر تحميل الإحصائيات");
      }

      const data = await response.json();

      setStats({
        total: data.total ?? 0,
        published: data.published ?? 0,
        pending: data.pending ?? 0,
        sources: data.sources ?? 0,
      });

      setNews(data.latestNews ?? []);
    } catch (error) {
      console.error(error);
      setMessage("تعذر تحميل بيانات لوحة التحكم");
    } finally {
      setLoading(false);
    }
  }

  async function fetchNews() {
    try {
      setFetching(true);
      setMessage("");

      const response = await fetch("/api/admin/fetch-news", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "حدث خطأ أثناء جلب الأخبار"
        );
      }

      setMessage(
        `تم جلب الأخبار بنجاح. تمت معالجة ${
          data.processed ?? 0
        } خبر.`
      );

      await loadDashboard();
    } catch (error) {
      console.error(error);
      setMessage(
        error.message || "تعذر جلب الأخبار"
      );
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">Z</span>
            <span>ZACK NEWS</span>
          </Link>

          <nav className="main-nav">
            <Link href="/">الموقع</Link>
            <Link href="/admin">لوحة التحكم</Link>
          </nav>

          <button
            className="search-button"
            onClick={loadDashboard}
            disabled={loading}
          >
            {loading ? "جارٍ..." : "↻ تحديث"}
          </button>
        </div>
      </header>

      <main className="admin-container">
        {/* Title */}
        <div className="section-header">
          <div>
            <h1 className="section-title">
              لوحة التحكم
            </h1>

            <p className="footer-text">
              إدارة ومراقبة منصة ZACK NEWS
            </p>
          </div>

          <button
            className="primary-button"
            onClick={fetchNews}
            disabled={fetching}
          >
            {fetching
              ? "جارٍ جلب الأخبار..."
              : "📰 جلب الأخبار الآن"}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="admin-card">
            {message}
          </div>
        )}

        {/* Statistics */}
        <section className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-label">
              إجمالي الأخبار
            </div>

            <div className="stat-value">
              {loading ? "..." : stats.total}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">
              الأخبار المنشورة
            </div>

            <div className="stat-value">
              {loading ? "..." : stats.published}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">
              قيد المعالجة
            </div>

            <div className="stat-value">
              {loading ? "..." : stats.pending}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">
              مصادر الأخبار
            </div>

            <div className="stat-value">
              {loading ? "..." : stats.sources}
            </div>
          </div>
        </section>

        {/* System Status */}
        <section className="admin-card">
          <h2 className="section-title">
            حالة النظام
          </h2>

          <div className="news-grid">
            <StatusCard
              title="قاعدة البيانات"
              status="متصلة"
            />

            <StatusCard
              title="محرك الأخبار"
              status="جاهز"
            />

            <StatusCard
              title="NVIDIA AI"
              status="جاهز"
            />

            <StatusCard
              title="النشر التلقائي"
              status="مفعّل"
            />
          </div>
        </section>

        {/* Latest News */}
        <section className="admin-card">
          <div className="section-header">
            <h2 className="section-title">
              آخر الأخبار
            </h2>

            <Link href="/admin/news">
              إدارة الأخبار ←
            </Link>
          </div>

          {loading ? (
            <div className="empty-state">
              جارٍ تحميل الأخبار...
            </div>
          ) : news.length === 0 ? (
            <div className="empty-state">
              لا توجد أخبار حتى الآن.
            </div>
          ) : (
            <div className="news-grid">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="news-card"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="news-image"
                    />
                  )}

                  <div className="news-content">
                    <span className="news-category">
                      {item.category?.name ||
                        item.category ||
                        "أخبار"}
                    </span>

                    <h3 className="news-title">
                      {item.title}
                    </h3>

                    <p className="news-summary">
                      {item.summary || ""}
                    </p>

                    <div className="news-meta">
                      <span>
                        {item.source_name ||
                          "ZACK NEWS"}
                      </span>

                      <span>
                        {item.status || "published"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="admin-card">
          <h2 className="section-title">
            إجراءات سريعة
          </h2>

          <div className="news-grid">
            <Link
              href="/admin/news"
              className="news-card"
            >
              <div className="news-content">
                <h3 className="news-title">
                  📰 إدارة الأخبار
                </h3>

                <p className="news-summary">
                  مشاهدة الأخبار وتعديلها أو حذفها.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/sources"
              className="news-card"
            >
              <div className="news-content">
                <h3 className="news-title">
                  🌐 مصادر الأخبار
                </h3>

                <p className="news-summary">
                  إضافة وتعديل مصادر RSS وواجهات API.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="news-card"
            >
              <div className="news-content">
                <h3 className="news-title">
                  ⚙️ الإعدادات
                </h3>

                <p className="news-summary">
                  إعدادات AI والنشر التلقائي.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusCard({ title, status }) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        {title}
      </div>

      <div
        className="stat-value"
        style={{
          fontSize: "18px",
          color: "#16a34a",
        }}
      >
        ● {status}
      </div>
    </div>
  );
            }
