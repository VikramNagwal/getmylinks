import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface GetmylinksVerifyEmailProps {
  Code: string;
  uid: string;
}

const baseUrl = Bun.env.FRONTEND_URL ?? ""

export function VerificationEmail({
  Code,
  uid
}: GetmylinksVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>AWS Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thank you for registering with getmylinks! 🚀 We're excited to
                have you on board. With our platform, you can easily host and
                manage your links, making sharing effortless and organized. Get
                started by logging in and exploring all the features we&apos;ve
                built just for you. If you have any questions or need
                assistance, we&apos;re here to help. Welcome aboard, and happy
                linking!
              </Text>
              <Section style={verificationSection}>
                <Text style={text}>If button given below does not work use this link below 👇</Text>
                <Text style={link}>http://{baseUrl}{uid}/verify</Text>
                <Text style={verifyText}>Verification code</Text>

                <Text style={codeText}>{Code}</Text>
                <Text style={validityText}>
                  (This code is valid for 5 minutes)
                </Text>
              </Section>
              <Hr />
                <Link style={button} target="_blank" href={`${baseUrl}/${uid}/verify`}>
                  Verify your Account
                </Link>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                getmylinks will never email you and ask you to disclose or
                verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by getmylinks, Please Ignore if not realated with you
             © 2025,
            getmylinks Services, Inc.. All rights reserved. getmylinks is a
            registered trademark of{" "}
            <Link href="https://getmylinks.io" target="_blank" style={link}>
              getmylinks
            </Link>
            , Inc. View our{" "}
            <Link
              href="https://getmylinks.io/privacy"
              target="_blank"
              style={link}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const button = {
    backgroundColor: "#2754C5",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "14px",
    padding: "10px 20px",
    margin: "20px auto",
    textDecoration: "none",
    textAlign: "center" as const,
    transition: "background-color 0.3s",
}

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
