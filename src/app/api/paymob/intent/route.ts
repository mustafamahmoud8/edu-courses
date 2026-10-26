import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { courseId, amount, courseName } = await request.json();

    const PAYMOB_SECRET_KEY = process.env.PAYMOB_SECRET_KEY;
    const PAYMOB_PUBLIC_KEY = process.env.PAYMOB_PUBLIC_KEY;

    if (!PAYMOB_SECRET_KEY || !PAYMOB_PUBLIC_KEY) {
      // Demo mode — return mock response
      return NextResponse.json({
        demo: true,
        message: "Paymob keys not configured. Running in demo mode.",
      });
    }

    // Create Payment Intent via Paymob API
    const intentRes = await fetch(
      "https://accept.paymob.com/v1/intention/",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${PAYMOB_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Paymob uses smallest currency unit (piastres)
          currency: "EGP",
          payment_methods: [4825084], // Replace with your integration ID
          items: [
            {
              name: courseName,
              amount: amount * 100,
              description: `Course ID: ${courseId}`,
              quantity: 1,
            },
          ],
          billing_data: {
            first_name: "Customer",
            last_name: "Name",
            phone_number: "+201000000000",
            email: "customer@example.com",
          },
          special_reference: `course-${courseId}-${Date.now()}`,
          notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymob/callback`,
          redirection_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}?payment=success`,
        }),
      }
    );

    if (!intentRes.ok) {
      const err = await intentRes.text();
      console.error("Paymob error:", err);
      return NextResponse.json({ error: "Payment intent failed" }, { status: 500 });
    }

    const intent = await intentRes.json();

    return NextResponse.json({
      clientSecret: intent.client_secret,
      publicKey: PAYMOB_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
