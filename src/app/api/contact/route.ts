import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactEmail } from "@/components/emails/ContactEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const html = await render(
      React.createElement(ContactEmail, { name, email, message })
    );

    const { data, error } = await resend.emails.send({
      from: "Advanta Labs <contact@advantalabs.co>",
      to: ["nicolas@advantalabs.co"],
      replyTo: email,
      subject: `New contact from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API exception:", err);
    return Response.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
