import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {}
};

export const sendEmailVerificationLink = async({to, token}) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

   const html = `
    <h2>Email Verification</h2>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
    <p>This link will expire in 5 minutes.</p>
  `;

  await sendEmail({
    to,
    subject: "Verify your email address",
    html,
  });
};

export const sendPasswordResetLink = async ({to, token}) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const html = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    <p>This link will expire in 5 Minutes.</p>
  `;

  await sendEmail({
    to,
    subject: "Reset your password",
    html,
  });
}; 