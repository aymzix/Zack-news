"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
        });
      } catch (error) {
        console.error(error);
      } finally {
        router.replace("/login");
        router.refresh();
      }
    }

    logout();
  }, [router]);

  return (
    <main className="page-section">
      <div className="container">
        <div className="admin-card" style={{ textAlign: "center" }}>
          <h1 className="section-title">تسجيل الخروج</h1>
          <p>جاري تسجيل خروجك...</p>
        </div>
      </div>
    </main>
  );
}
