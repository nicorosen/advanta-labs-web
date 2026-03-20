import { Resend } from "resend";
import { ContactEmail } from "@/components/emails/ContactEmail";

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

    const { data, error } = await resend.emails.send({
      from: "Advanta Labs <contact@advantalabs.co>",
      to: ["nicolas@advantalabs.co"],
      replyTo: email,
      subject: `New contact from ${name}`,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch {
    return Response.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
