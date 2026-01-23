import { resend } from "./resend.js";

export const sendEmail = async (to, subject, html) => {
  await resend.emails.send({
    from: "Ecommerce App <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
};
