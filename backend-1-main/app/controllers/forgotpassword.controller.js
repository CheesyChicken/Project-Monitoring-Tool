const db = require("../models");
const config = require("../config/auth.config");
const Person = db.person;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail, forgeMailText } = require("../config/nodemailer");

function forgotPassword(req, res) {
  Person.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (person) => {
    if (!person)
      return res.status(404).send({ message: "User Not found." }).end();

    const payload = {
      email: person.email,
    };

    const token = jwt.sign(payload, config.secret, { expiresIn: "15m" });
    const link = `${config.frontendUri}/reset-password?token=${token}`;
    const mailText = forgeMailText(person.FullName, link);
    const sent = await sendMail("Password Reset", mailText, person.email);
    if (sent === true) res.status(200).end();
    else res.status(500).end();

    // res.send(link).end();
  });
}
async function resetPassword(req, res) {
  const { token, password } = req.body;
  try {
    const { email } = jwt.verify(token, config.secret);
    Person.findOne({
      where: {
        email,
      },
    }).then(async (person) => {
      if (!person)
        return res.status(404).send({ message: "User Not found." }).end();
      if (person.email === email) {
        person.password = bcrypt.hashSync(password, 8);
        //   person.password = password;
        try {
          await person.save();
          res.send(person);
        } catch (error) {
          res.status(500).send();
        }
      }
    });
  } catch (error) {
    return res.status(404).send({ message: "User Not found." }).end();
  }
}
module.exports = { forgotPassword, resetPassword };
