import { resend } from "../Utility/resend.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 10 minutes.</p>
      `,
    });

    res.json({ message: "Reset email sent" });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
};
