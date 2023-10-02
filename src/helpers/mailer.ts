import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, Emailtype, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);


        /* Updating the verify token and expiery token based on Email type   */
        if (Emailtype === "VERIFY") {

            User.findByIdAndUpdate(
                userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
                { new: true, runValidators: true }
            )
        }
        else if (Emailtype === "RESET") {
            User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
                { new: true, runValidators: true }
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODE_MAILER_USERNAME!,
                pass: process.env.NODE_MAILER_PASSWORD!
            }
        });

        const mailOptions = {
            from: "officialrohitsharma442@gmail.com",
            to: email,
            subject:
                Emailtype === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password",
            /* html: `<p>Click<a href=${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${Emailtype === "VERIFY" ? 'Verify Your Email' : "Reset Your Password"}</p>` */
            html: `<div style="background-color: yellow; font-family: Arial, sans-serif; text-align: center; color: #333; padding: 20px;">
            <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <p style="font-size: 18px;">Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}" style="color: #007bff; text-decoration: none; font-weight: bold; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px; display: inline-block;">Click Here</a><br> to ${Emailtype === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</p><p style="font-size: 14px; margin-top: 20px;">Powered By Rohit Sharma</p></div></div>`,
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;


    } catch (error: any) {
        throw new Error(error);
    }
};
