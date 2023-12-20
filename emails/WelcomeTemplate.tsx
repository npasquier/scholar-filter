import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Tailwind,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}) => {
  return (
    <Html lang="en">
      <Preview>Welcome aboard! 🎉</Preview>
      <Tailwind>
        <Body>
          <Container className="bg-white text-center py-8 mt-4">
            <Text className="text-2xl font-bold mb-4">Welcome, {email}!</Text>
            <Text className="mb-4">
              Thank you for joining the <strong>Economic Search Filter 🔍</strong> . We&apos;re
              excited to have you on board.
            </Text>
            <Text className="mb-6">
              To get started, please verify your email address by clicking on the following link:
            </Text>
            <Link
              href={verificationUrl}
              className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
            >
              Verify Email
            </Link>
            <Text className="my-5">
                For any questions, please contact me at <Link href={"mailto:npasquier.dev@gmail.com?subject=Mail for verification of email"}>npasquier.dev@gmail.com</Link>
            </Text>
            <Text className="mt-8 text-sm text-slate-400">
              NB: This link will expire in 24 hours.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
