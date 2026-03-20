import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface NewsletterWelcomeEmailProps {
  email: string;
}

export function NewsletterWelcomeEmail({
  email,
}: NewsletterWelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>
              Advanta<span style={logoAccent}>Labs</span>
            </Text>
          </Section>
          <Section style={content}>
            <Heading as="h1" style={heading}>
              Welcome to our newsletter!
            </Heading>
            <Text style={text}>
              Thanks for subscribing. You will receive updates on AI automation,
              industry insights, and how we are helping corporations work
              smarter.
            </Text>
            <Button href="https://advantalabs.co" style={button}>
              Visit Our Website
            </Button>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>
              Advanta Labs - Automate Smarter, Optimize Faster, and Grow
              Stronger.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f4f4f5",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  borderRadius: "8px",
  overflow: "hidden" as const,
  maxWidth: "560px",
};

const header = {
  backgroundColor: "#000000",
  padding: "24px 40px",
};

const logo = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "800",
  margin: "0",
};

const logoAccent = {
  color: "#23decb",
};

const content = {
  padding: "32px 40px",
};

const heading = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const text = {
  color: "#52525b",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const button = {
  backgroundColor: "#000000",
  color: "#23decb",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
};

const footer = {
  padding: "20px 40px",
  backgroundColor: "#fafafa",
  borderTop: "1px solid #e4e4e7",
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "12px",
  margin: "0",
};
