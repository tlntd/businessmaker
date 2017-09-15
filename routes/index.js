const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail (data) {
  const to = process.env.EMAIL_TO;

  if (!to) {
    throw new Error('Set EMAIL_TO');
  }

  const msg = {
    to: to,
    from: 'noreply@businessmakerbeta.fi',
    subject: '[BusinessMaker] New contact request',
    text: `
New request through BusinessMaker Beta:

Name: ${data.name} 
Email: ${data.email} 
Phone: ${data.phone} 
`
  };
  sgMail.send(msg).catch(err => console.error(err));
}



router.get('/', function(req, res) {
  res.render('index');
});

router.post('/email', function(req, res) {
  const { name, email, phone } = req.body;
  if (!((name && email) || (name && phone))) {
    return res.sendStatus(406);
  }
  sendMail(req.body);
  res.sendStatus(203);
});

module.exports = router;
