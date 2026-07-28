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

export const sendRegisterMail = async (
  email: string,
  firstName: string,
  lastName: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Complete Registration",

    html: `
      <h2>Hello ${firstName},</h2>

      <p>Complete your registration process and access the organisation portal.</b>.</p>
      <p>Registration Details:</b>.</p>
      <p>First Name: ${firstName}</b>.</p>
      <p>Last Name: ${lastName}</b>.</p>
      <p>Email: ${email}</b>.</p>

      <p>Register with your secure password...</b>.</p>

      <p>Regards,<br/>HR Team</p>
    `,
  });
};