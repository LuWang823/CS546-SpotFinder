import nodemailer from "nodemailer";

(async () => {
  console.log(await nodemailer.createTestAccount());
})().catch(console.error);
