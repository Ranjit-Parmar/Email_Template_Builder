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
    console.log(html)
    
    // 1. Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Email Builder <onboarding@resend.dev>",
      to,
      subject,
      html
    });

    `<table cellpadding="0" cellspacing="0" style="align-items: center; background-color: rgb(17, 8, 8); color: rgb(0, 188, 212); display: flex; font-size: 16px; font-style: normal; font-weight: normal; height: 64px; letter-spacing: 0.2px; text-decoration: none; text-transform: uppercase;"><tbody style="width: 100%;"><tr style="align-items: center; background-color: rgb(17, 8, 8); color: rgb(0, 188, 212); display: flex; font-size: 16px; font-style: normal; font-weight: normal; height: 64px; letter-spacing: 0.2px; text-decoration: none; text-transform: uppercase;"><td><img alt="logo" width="50" height="50" src="https://res.cloudinary.com/duxhsvpry/image/upload/v1747985319/b3jdd8wr9oonzfqih6wj.svg" style="color: transparent;"></td><td><a href="#" style="display: inline-block; padding: 4px 12px; text-decoration: none;">home</a><a href="#" style="display: inline-block; padding: 4px 12px; text-decoration: none;">about</a><a href="#" style="display: inline-block; padding: 4px 12px; text-decoration: none;">contact</a><a href="#" style="display: inline-block; padding: 4px 12px; text-decoration: none;">help</a></td></tr></tbody></table>`
    
    

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




 