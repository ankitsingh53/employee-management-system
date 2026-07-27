import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLeaveStatusEmail = async (
  email: string,
  name: string,
  status: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Leave Request Status",

    html: `
      <h2>Hello ${name},</h2>

      <p>Your leave request has been <b>${status}</b>.</p>

      <p>Regards,<br/>HR Team</p>
    `,
  });
};