import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading as="h1" style={heading}>
              New Contact Form Submission
            </Heading>
          </Section>
          <Section style={content}>
            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>
              Sent from the Advanta Labs website contact form
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
  padding: "32px 40px",
};

const heading = {
  color: "#23decb",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const content = {
  padding: "32px 40px",
};

const label = {
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 4px",
};

const value = {
  color: "#18181b",
  fontSize: "16px",
  margin: "0 0 20px",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "8px 0 20px",
};

const messageStyle = {
  color: "#18181b",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
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
