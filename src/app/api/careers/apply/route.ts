export const runtime = "nodejs";
import { Buffer } from "buffer";

/**
 * Job Application API endpoint
 *
 * Sends job applications with CV attachments via Resend
 */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const coverLetter = String(formData.get("coverLetter") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const cv = formData.get("cv") as File | null;

    // Validation
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ error: "Name must be at least 2 characters" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!coverLetter || coverLetter.length < 50) {
      return new Response(
        JSON.stringify({
          error: "Cover letter must be at least 50 characters",
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!cv || cv.size === 0) {
      return new Response(
        JSON.stringify({ error: "CV/Resume is required" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Process CV attachment
    const arrayBuffer = await cv.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const cvAttachment = {
      filename: cv.name,
      content: base64,
      contentType: cv.type,
    };

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO || "careers@krasty.me";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (resendApiKey) {
      try {
        const emailPayload = {
          from: fromEmail,
          to: [toEmail],
          subject: `New Job Application: ${position} - ${name}`,
          html: `
            <h2>New Job Application</h2>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <h3>Cover Letter:</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
            <p><strong>CV/Resume:</strong> ${cvAttachment.filename}</p>
          `,
          reply_to: email,
          attachments: [
            {
              filename: cvAttachment.filename,
              content: cvAttachment.content,
            },
          ],
        };

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Resend API error:", errorData);
          throw new Error("Failed to send email");
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "Application submitted successfully!",
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Fallback to logging
      }
    }

    // Fallback: Log to console
    console.log("📄 New job application:");
    console.log(`Position: ${position}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Cover Letter: ${coverLetter}`);
    console.log(`CV: ${cvAttachment.filename} (${cvAttachment.contentType})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application received! (Logged to server console)",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("Job application error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process your application. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
