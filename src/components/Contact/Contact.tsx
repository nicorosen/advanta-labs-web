"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import styles from "./Contact.module.css";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <ScrollReveal>
        <div className={styles.content}>
          <div className={styles.formSide}>
            <h2 className={styles.heading}>Get in Touch</h2>
            {status === "sent" ? (
              <div className={styles.successMessage}>
                <p>Message sent! We will get back to you soon.</p>
                <Button
                  variant="secondary"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={styles.input}
                  aria-label="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className={styles.input}
                  aria-label="Your email"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  className={styles.textarea}
                  aria-label="Your message"
                  required
                />
                {status === "error" && (
                  <p className={styles.errorMessage}>
                    Something went wrong. Please try again.
                  </p>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
          <div className={styles.infoSide}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>
                <a href="mailto:nicolas@advantalabs.co">
                  nicolas@advantalabs.co
                </a>
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>LinkedIn</span>
              <span className={styles.infoValue}>
                <a
                  href="https://linkedin.com/company/advantalabs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Advanta Labs
                </a>
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
