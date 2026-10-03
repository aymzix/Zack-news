import Link from "next/link";

const news = [
  {
    id: 1,
    title: "أحدث الأخبار والتطورات في المغرب والعالم",
    summary:
      "تابع أهم الأخبار والتطورات الجديدة من مختلف المجالات في منصة ZACK NEWS.",
    category: "المغرب",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    time: "منذ 10 دقائق",
  },
  {
    id: 2,
    title: "تطورات جديدة في عالم التكنولوجيا والذكاء الاصطناعي",
    summary:
      "أبرز المستجدات التقنية والابتكارات الجديدة في عالم التكنولوجيا والذكاء الاصطناعي.",
    category: "تكنولوجيا",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    time: "منذ 25 دقيقة",
  },
  {
    id: 3,
    title: "آخر أخبار الرياضة والمباريات",
    summary:
      "تابع آخر الأخبار الرياضية والنتائج والمستجدات من مختلف البطولات.",
    category: "رياضة",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    time: "منذ ساعة",
  },
];

const categories = [
  "الرئيسية",
  "المغرب",
  "العالم",
  "الرياضة",
  "التكنولوجيا",
  "الاقتصاد",
];

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">Z</span>
            <span>ZACK NEWS</span>
          </Link>

          <nav className="main-nav">
            {categories.map((category) => (
              <Link
                key={category}
                href={
                  category === "الرئيسية"
                    ? "/"
                    : `/category/${encodeURIComponent(category)}`
                }
              >
                {category}
              </Link>
            ))}
          </nav>

          <Link href="/search" className="search-button">
            🔍 بحث
          </Link>
        </div>
      </header>

      {/* Breaking News */}
      <div className="breaking-bar">
        <div className="container breaking-inner">
          <span className="breaking-label">🔴 عاجل</span>

          <span className="breaking-text">
            تابع آخر الأخبار والتطورات لحظة بلحظة عبر ZACK NEWS
          </span>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="page-section">
          <div className="container">
            <div className="featured-grid">
              <Link href={`/news/${news[0].id}`} className="featured-card">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                />

                <div className="featured-overlay">
                  <span className="news-category">
                    {news[0].category}
                  </span>

                  <h1>{news[0].title}</h1>

                  <div className="news-meta">
                    <span>{news[0].time}</span>
                    <span>ZACK NEWS</span>
                  </div>
                </div>
              </Link>

              <div className="news-grid">
                {news.slice(1).map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="page-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                آخر الأخبار
              </h2>

              <Link href="/latest">
                عرض الكل ←
              </Link>
            </div>

            <div className="news-grid">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="page-section">
          <div className="container">
            <h2 className="section-title">
              تصفح حسب القسم
            </h2>

            <div className="news-grid">
              {categories.slice(1).map((category) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="news-card"
                >
                  <div className="news-content">
                    <span className="news-category">
                      ZACK NEWS
                    </span>

                    <h3 className="news-title">
                      أخبار {category}
                    </h3>

                    <p className="news-summary">
                      اكتشف آخر الأخبار والمستجدات في قسم{" "}
                      {category}.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3 className="footer-title">
              ZACK NEWS
            </h3>

            <p className="footer-text">
              منصة إخبارية حديثة تجمع أهم الأخبار
              والمستجدات من مختلف المجالات.
            </p>
          </div>

          <div>
            <h3 className="footer-title">
              الأقسام
            </h3>

            <div className="footer-links">
              {categories.slice(1).map((category) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">
              ZACK NEWS
            </h3>

            <div className="footer-links">
              <Link href="/about">
                من نحن
              </Link>

              <Link href="/contact">
                اتصل بنا
              </Link>

              <Link href="/privacy">
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function NewsCard({ news }) {
  return (
    <Link
      href={`/news/${news.id}`}
      className="news-card"
    >
      <img
        src={news.image}
        alt={news.title}
        className="news-image"
      />

      <div className="news-content">
        <span className="news-category">
          {news.category}
        </span>

        <h3 className="news-title">
          {news.title}
        </h3>

        <p className="news-summary">
          {news.summary}
        </p>

        <div className="news-meta">
          <span>{news.time}</span>
          <span>ZACK NEWS</span>
        </div>
      </div>
    </Link>
  );
                }
