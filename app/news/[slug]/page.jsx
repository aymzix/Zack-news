import Link from "next/link";

const demoNews = {
  title: "أحدث الأخبار والتطورات في المغرب والعالم",
  summary:
    "تابع آخر المستجدات والأخبار المهمة من المغرب والعالم عبر ZACK NEWS.",
  category: "المغرب",
  source: "ZACK NEWS",
  date: "2026-10-03",
  image:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80",
  content: [
    "هذا نص تجريبي للمقال. عند ربط الموقع بقاعدة البيانات ومصادر الأخبار، سيتم استبدال هذا المحتوى بالمقال الحقيقي الذي تتم معالجته ونشره تلقائيًا.",
    "يعتمد نظام ZACK NEWS على جلب الأخبار من مصادر مختلفة، ثم معالجة البيانات وتنظيمها وتصنيفها قبل عرضها للزوار.",
    "يمكن للنظام أيضًا استخدام الذكاء الاصطناعي لإنشاء ملخص وعنوان مناسبين، مع الاحتفاظ برابط المصدر الأصلي.",
  ],
};

export default async function NewsPage({ params }) {
  const { slug } = await params;

  // لاحقًا سيتم استخدام slug لجلب الخبر من قاعدة البيانات.
  console.log("News slug:", slug);

  const news = demoNews;

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
            <Link href="/">الرئيسية</Link>
            <Link href="/category/morocco">المغرب</Link>
            <Link href="/category/world">العالم</Link>
            <Link href="/category/sports">الرياضة</Link>
            <Link href="/category/technology">
              التكنولوجيا
            </Link>
          </nav>

          <Link href="/search" className="search-button">
            🔍 بحث
          </Link>
        </div>
      </header>

      {/* Breaking News */}
      <div className="breaking-bar">
        <div className="container breaking-inner">
          <span className="breaking-label">
            🔴 عاجل
          </span>

          <span className="breaking-text">
            تابع آخر الأخبار والتطورات عبر ZACK NEWS
          </span>
        </div>
      </div>

      {/* Article */}
      <main>
        <section className="page-section">
          <div className="container">
            <article className="article">
              {/* Article Header */}
              <header className="article-header">
                <div className="article-category">
                  {news.category}
                </div>

                <h1 className="article-title">
                  {news.title}
                </h1>

                <p className="article-summary">
                  {news.summary}
                </p>

                <div className="article-meta">
                  <span>
                    المصدر: {news.source}
                  </span>

                  <span>
                    {news.date}
                  </span>
                </div>
              </header>

              {/* Image */}
              <img
                src={news.image}
                alt={news.title}
                className="article-image"
              />

              {/* Content */}
              <div className="article-body">
                {news.content.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}
              </div>

              {/* Source */}
              <div className="source-box">
                <strong>
                  مصدر الخبر
                </strong>

                <p>
                  تم إعداد هذا المحتوى بواسطة
                  ZACK NEWS.
                </p>
              </div>

              {/* Back */}
              <div style={{ marginTop: "30px" }}>
                <Link
                  href="/"
                  className="primary-button"
                >
                  ← العودة إلى الرئيسية
                </Link>
              </div>
            </article>
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
              <Link href="/category/morocco">
                المغرب
              </Link>

              <Link href="/category/world">
                العالم
              </Link>

              <Link href="/category/sports">
                الرياضة
              </Link>

              <Link href="/category/technology">
                التكنولوجيا
              </Link>
            </div>
          </div>

          <div>
            <h3 className="footer-title">
              روابط
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
