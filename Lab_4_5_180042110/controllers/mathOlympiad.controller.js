const MathOlympiad = require("../models/MathOlympiad.model");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
 
const senderMail = process.env.UserEmail;
const password = process.env.UserPass;
 
// Hashing
const participantHash = randomstring.generate({
  length: 32,
  charset: "alphanumeric",
});
//console.log(participantHash);

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: senderMail,
    pass: password,
  },
});

const getMO = (req, res) => {
  res.render("math-olympiad/register.ejs", { error: req.flash("error") });
};
 
const postMO = (req, res) => {
  const { name, category, contact, email, institution, tshirt } = req.body;
 
  let registrationFee = 0;
  if (category == "School") {
    registrationFee = 250;
  } else if (category == "College") {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }
 
  const total = registrationFee;
  const paid = 0;
  const selected = false;
 
  let error = "";
 
  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = "Participant with this name and contact number already exists!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/register");
    } else {
      const participant = new MathOlympiad({
        name,
        category,
        contact,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt,
        participantHash,
      });
      participant
        .save()
        .then(() => {
          error = "Participant has been registered successfully!";
 
          const to = email;
          const subject = "Team registered successfully in Math Olympiad.";
          const body = "Hello " + name + ", " + "Your team registration has been completed for Math Olympiad Event. Your Unique ID is " + participantHash + ".";
 
          const options = {
            from: senderMail,
            to: to,
            subject: subject,
            text: body,
          };
 
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Sent: " + info.response);
          });
 
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        })
        .catch(() => {
          error = "An unexpected error occured while registering participant";
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        });
    }
  });
};
 
const getMOList = (req, res) => {
  let all_participant = [];
  let error = "";
  MathOlympiad.find()
    .then((data) => {
      all_participant = data;
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error"),
        participants: all_participant,
      });
    })
    .catch(() => {
      error = "Failed to retrieve data!";
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error", error),
        participants: all_participant,
      });
    });
};
 
const deleteMO = (req, res) => {
  let error = "";
 
  MathOlympiad.deleteOne({ _id: req.params.id })
    .then(() => {
      let error = "Data has been deleted successfully!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    })
    .catch(() => {
      let error = "Failed to delete data";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};
 
const paymentDoneMO = (req, res) => {
  const id = req.params.id;
 
  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = "Payment completed successfully!";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          let error = "Data could not be updated!";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};
 
const selectMO = (req, res) => {
  const id = req.params.id;
 
  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = "Participant has been selected successfully!";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          let error = "Data could not be updated!";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};
 
module.exports = {
  getMO,
  postMO,
  getMOList,
  deleteMO,
  paymentDoneMO,
  selectMO,
};