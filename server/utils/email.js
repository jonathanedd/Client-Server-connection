const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class Email {
  constructor() {}

  //   Create a conection with an email service
  createTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'fd16e80f0728c9',
        pass: '3ae39cbfdbfff2',
      },
    });
  }
  //   Send the actual email
  async send() {
    //   Get the pug file that needs to be sent
    const html = pug.renderFile(`${__dirname}/../views/emails/baseEmail.pug`, {
      title: 'Email sent from NodeJS',
    });

    await this.createTransport().sendMail({
      from: 'Academloblogs@gmail.com',
      to: 'jhoeduardonez@gmail.com',
      subject: 'New account',
      html,
      text: htmlToText(html),
    });
  }

  //   Send an email
  async sendWelcome() {
    await this.send();
  }

  async sendPostNotice() {
    await this.send
  }
}

module.exports = { Email };
