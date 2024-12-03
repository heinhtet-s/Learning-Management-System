import nodemailer, { Transporter } from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import config from '../config/config'

interface EmailOptions {
    email: string
    subject: string
    template: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any }
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    console.log(config)
    const transporter: Transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: parseInt(config.SMTP_PORT || '587'),
        service: config.SMTP_SERVICE,
        auth: {
            user: config.SMTP_MAIL,
            pass: config.SMTP_PASSWORD
        }
    })

    const { email, subject, template, data } = options

    // get the pdath to the email template file
    const templatePath = path.join(__dirname, '../mails', template)

    // Render the email template with EJS
    const html: string = await ejs.renderFile(templatePath, data)

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail
