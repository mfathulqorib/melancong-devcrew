import nodemailer from "nodemailer";
export const SendMailer = async () => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
      },
    });

    //return the Transporter variable which has the sendMail method to send the mail
    //which is within the mailOptions
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
