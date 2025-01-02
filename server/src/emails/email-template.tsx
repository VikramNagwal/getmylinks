import * as React from "react";

interface EmailTemplateProps {
  otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ otp
}) => (
  <div>
    <h2>Your Accounct Verification link is given below:</h2>
    <p>copy and paste it to verification page or type it as it is</p>
    <h1>{otp}</h1>
    <p>In case this mail is not relevant to you. delete it or ignore it</p>
  </div>
);
