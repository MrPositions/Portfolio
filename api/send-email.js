const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'   // Replace with your email password
  }
});

const sendEmail = (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // Replace with your email
    subject: `New message from YourPortfolio`, // Email subject
    text: `From: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: 'Email sent' });
  });
};

module.exports = sendEmail;
