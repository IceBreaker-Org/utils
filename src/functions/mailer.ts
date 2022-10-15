import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export class Mailer {
  protected transporter: nodemailer.Transporter

  constructor(email: string, password: string, service: string) {
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: password,
      },
    })
  }

  public async send(to: string, subject: string, message: string): Promise<any> {
    const mailOptions: Mail.Options = {
      from: 'Klick Team 😀',
      to,
      subject,
      html: message,
    }

    return this.transporter.sendMail(mailOptions)
  }
}
