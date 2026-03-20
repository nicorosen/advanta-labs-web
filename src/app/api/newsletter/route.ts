import { Resend } from "resend";
import { render } from "@react-email/render";
import { NewsletterWelcomeEmail } from "@/components/emails/NewsletterWelcomeEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const welcomeHtml = await render(
      React.createElement(NewsletterWelcomeEmail, { email })
    );

    // Send welcome email to the subscriber
    const { error: welcomeError } = await resend.emails.send({
      from: "Advanta Labs <newsletter@advantalabs.co>",
      to: [email],
      subject: "Welcome to the Advanta Labs newsletter!",
      html: welcomeHtml,
    });

    if (welcomeError) {
      return Response.json({ error: welcomeError.message }, { status: 500 });
    }

    // Notify you of new subscriber
    await resend.emails.send({
      from: "Advanta Labs <newsletter@advantalabs.co>",
      to: ["nicolas@advantalabs.co"],
      subject: `New newsletter subscriber: ${email}`,
      text: `New newsletter subscription from: ${email}`,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
