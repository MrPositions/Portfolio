const nodemailer = require('nodemailer');

export default async function (req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email, // Sender's email address
      to: process.env.EMAIL_USER, // Your email address
      replyTo: email, // Reply to the sender's email address
      subject: `New message from ${name}: ${subject}`,
      text: `Message from: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent', info });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
