import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser"; // Use HTTP client in Next.js
import { api } from "@/convex/_generated/api";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
  try {
    const body = await req.json();

    const { to, subject, html, templateId, user } = body;

    if (!to || !subject || !html || !templateId || !user) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // 1. Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Email Builder <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    // 2. Call Convex mutation using HTTP client
    await convex.mutation(api.template.shareEmailTemplate, {
      to,
      subject,
      html,
      templateId,
      user,
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in sendEmailTemplate route:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
