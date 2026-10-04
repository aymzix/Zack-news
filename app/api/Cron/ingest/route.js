import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchAllNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await fetchAllNews(prisma);

    return NextResponse.json({
      success: true,
      message: "تم جلب الأخبار بنجاح",
      processed: result?.processed ?? 0,
      created: result?.created ?? 0,
      skipped: result?.skipped ?? 0,
    });
  } catch (error) {
    console.error("CRON NEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "تعذر جلب الأخبار",
      },
      { status: 500 }
    );
  }
}
