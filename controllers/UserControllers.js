const { Register } = require('../models');
const {FormSubmission} = require("../models");
const { Event } = require("../models")
const {Signup} = require("../models")
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const acountSid = "ACe79385ef5aff258d5b49a5b139c827c7";
//const authToken = "c8f035579e8f1a0b7a54ea3425fc0656";
const authToken = "2500287e188644ab398eaebe413c705a";
const client = require("twilio")(acountSid, authToken);

const formSubmit = async (req, res) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'anusha.lakkakula2022@gmail.com',
        pass: 'iutvtpzrnkkcfoqd'
      }
    });

    const sendMail = (recipientEmail, message) => {
      const mailOptions = {
        from: 'santarun2023.rcck@gmail.com',
        to: recipientEmail,
        subject: "Form Submission of Novarace",
        text: message
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error)
        }
        else {
          console.log("Email sent: ", info.response)
        }
      })
    };

     const form = await FormSubmission.create(req.body);

    res.status(200).json({message: "Email sent successfully...", form});
 
    const successfulMessage = "Thank you for form submitting, Welcome to Novarace";
    sendMail(form.email, successfulMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const SignupUser = async(req, res) => {
  
  try {

  //   const userExist = await SignupUser.findOne({
  //     where: {email: req.body.email}
  //   });
  
  // if(userExist){
  //   throw new Error("User already signed up with this email...")
  // }

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'anusha.lakkakula2022@gmail.com',
        pass: 'iutvtpzrnkkcfoqd'
      }
    });

    const sendMail = (recipientEmail, message) => {
      const mailOptions = {
        from: 'santarun2023.rcck@gmail.com',
        to: recipientEmail,
        subject: "Welcome to Novarace",
        text: message
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error)
        }
        else {
          console.log("Email sent: ", info.response)
        }
      })
    };

const {
firstName,
lastName,
email,
password,
confirmPassword,
optCheck,
} = req.body;

const hashPassword = await bcrypt.hashSync(password, 10);
console.log(hashPassword, "hash")
const result = await Signup.create({
  firstName,
  lastName,
  email,
  password:hashPassword,
  confirmPassword:hashPassword,
  optCheck,
});

res.status(200).json({message: "Email sent successfully...", result});
 
const successfulMessage = "Welcome to Novarace";
sendMail(result.email, successfulMessage);
  } catch (error) {
    console.error(error); 
    res.status(500).json({message:"Internal server error"})
  }
}


const createUser = async (req, res) => {
  try {

    const event = await Event.findOne();
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // const userExists = await Register.findOne({
    //   where: { email: req.body.email },
    // });
 
    // if (userExists) {
    //   throw new Error("User already registered");
    // }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'anusha.lakkakula2022@gmail.com',
        pass: 'iutvtpzrnkkcfoqd'
      }
    });

    const sendMail = (recipientEmail, message) => {
      const mailOptions = {
        from: 'santarun2023.rcck@gmail.com',
        to: recipientEmail,
        subject: "Registration successful",
        text: message
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error)
        }
        else {
          console.log("Email sent: ", info.response)
        }
      })
    };

    const addCountryCode = (phoneNumber) => {
      const countryCode = "91"
      if (!phoneNumber.startsWith("+")) {
        return `whatsapp:+91${phoneNumber}`;
      }
    }
    const addCountryCodeForText = (phoneNumber) => {
      const countryCode = "91"
      if (!phoneNumber.startsWith("+")) {
        return `+91${phoneNumber}`;
      }
    }

    const sendWatsappMsg = async (recipientNumber, message) => {
      try {
        const formattedRecipientNumber = addCountryCode(recipientNumber);
        const response = await client.messages.create({
          from: "whatsapp:+14155238886",
          body: message,
          to: formattedRecipientNumber
        });
        console.log("Watsapp message sent: ", response.sid);
      } catch (error) {
        console.log("Error sending watsapp message: ", error);
      }
    }
    const sendTextMsg = async (recipientNumber, message) => {
      try {
        const formattedRecipientNumber = addCountryCodeForText(recipientNumber);
        const response = await client.messages.create({
          from: "+12058392432",
          body: message,
          to: formattedRecipientNumber
        });
        console.log("Text message sent: ", response.sid);
      } catch (error) {
        console.log("Error sending text message: ", error);
      }
    }
     const user = await Register.create(req.body);

    res.status(200).json(user);
    console.log("User registered");
    const successfulMessage = "Thank you for registering...";
    sendMail(user.email, successfulMessage);
    sendWatsappMsg(user.mobileNumber, successfulMessage);
    sendTextMsg(user.mobileNumber, successfulMessage)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await Register.findAll();
    res.status(200).json(users);
    console.log("users fetched...")

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const users = await Register.findAll({ where: { eventId } });
    res.status(200).json(users);
    console.log("users fetched...")

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersByGender = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender) {
      return res.status(400).json({ error: 'Gender parameter is missing' });
    }

    const users = await Register.findAll({ where: { gender } });

    res.status(200).json(users);
    console.log("Users fetched...");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsersByTshirtSize = async (req, res) => {

  try {
    const { tShirtSize } = req.query;
    const users = await Register.findAll({ where: { tShirtSize } })
    res.status(200).json(users);

    console.log(users, "tshirt")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersFreeRegistration = async (req, res) => {
  try {
    const users = await Register.findAll({
      where: {
        dateOfBirth: {
          [Op.lte]: new Date(new Date() - 1000 * 60 * 60 * 24 * 365 * 65)
        }
      }
    });
    res.status(200).json(users);
    console.log("users fetched...")

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersPaidRegistration = async (req, res) => {
  try {
    const users = await Register.findAll({
      where: {
        dateOfBirth: {
          [Op.gt]: new Date(new Date() - 1000 * 60 * 60 * 24 * 365 * 65)
        }
      }
    });
    res.status(200).json(users);
    console.log("users fetched...")

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createUser,
  getAllUsers,
  formSubmit,
  getAllUsersByEventId,
  getAllUsersByGender,
  getAllUsersByTshirtSize,
  getAllUsersFreeRegistration,
  getAllUsersPaidRegistration,
  SignupUser
};
