import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Paymob sends transaction data here
    const { success, order, transaction_id } = body;

    if (success) {
      // Extract courseId from special_reference: "course-{id}-{timestamp}"
      const ref = order?.merchant_order_id || "";
      const courseId = ref.split("-")[1];

      console.log(`Payment successful for course ${courseId}, transaction: ${transaction_id}`);
      // In production: update database to grant course access
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paymob callback error:", error);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const success = searchParams.get("success");
  const courseId = searchParams.get("courseId");

  if (success === "true" && courseId) {
    return NextResponse.redirect(
      new URL(`/courses/${courseId}?payment=success`, request.url)
    );
  }

  return NextResponse.redirect(new URL("/courses", request.url));
}
