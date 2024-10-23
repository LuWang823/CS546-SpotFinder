import nodemailer from "nodemailer";

const smtp = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "kncsapvmgoffkyhd@ethereal.email",
    pass: "nB9NhrDtdbUhzDwnEd",
  },
};

const transporter = nodemailer.createTransport(smtp);

export const sendMail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log("preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.error("error sending email");
    console.error(e);
  }
};

export const sendVerificationMail = async (info) => {
  await sendMail({
    from: "spot-finder@gmail.com",
    to: info.email,
    subject: "vefification link",
    text: `${process.env.baseURL}/users/verify/${info.id}/${info.verificationCode}`,
    html: `<a href="${process.env.baseURL}/users/verify/${info.id}/${info.verificationCode}" >verify</a>`,
  });
};

export const sendResetPasswordMail = async (info) => {
  await sendMail({
    from: "spot-finder@gmail.com",
    to: info.email,
    subject: "reset password",
    text: `${process.env.baseURL}/resetpassword/${info.id}/${info.resetPasswordCode}`,
    html: `<a href="${process.env.baseURL}/resetpassword//${info.id}/${info.resetPasswordCode}" >reset password</a>`,
  });
};
