const ProgrammingContest = require("../models/ProgrammingContest.model");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
 
const senderMail = process.env.UserEmail;
const password = process.env.UserPass;
 
// Hashing
const teamHash = randomstring.generate({
  length: 32,
  charset: "alphanumeric",
});

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: senderMail,
    pass: password,
  },
});

//Mail template
const mailTemplate = (to, subject, body) => {};
 
const getCP = (req, res) => {
  res.render("programming-contest/register.ejs", {
    error: req.flash("error"),
  });
};


const getPC = (req, res) => {
  //console.log("Here");
  res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
  const { teamName, coach, leader, member1, member2, contactCoach, contactLeader, contactMember1, contactMember2, emailCoach, emailLeader, emailMember1, emailMember2, tshirtCoach, tshirtLeader, tshirtMember1, tshirtMember2 } = req.body;


  let registrationFee = 2500;

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  let error = "";

  ProgrammingContest.findOne({ coach: coach, contactCoach: contactCoach }).then((team) => {
    if (team) {
      error = "Team already exists!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/register");
    } else {
        //console.log("CameALongWay")
        const team = new ProgrammingContest({
            teamName,
            coach,
            leader,
            member1,
            member2,
            contactCoach,
            contactLeader,
            contactMember1,
            contactMember2,
            emailCoach,
            emailLeader,
            emailMember1,
            emailMember2,
            tshirtCoach,
            tshirtLeader,
            tshirtMember1,
            tshirtMember2,
            paid,
            total,
            selected,
            teamHash,
          });
      team
        .save()
        .then(() => {
          error = "Team has been registered successfully!";

          const mailingList = [
            emailCoach,
            emailLeader,
            emailMember1,
            emailMember2,
          ];

          const userList = [
            coach,
            leader,
            member1,
            member2
          ];
 
          var to;
          const subject = "Team registered successfully in Programming Contest";
          var body;
 
          for (let i = 0; i < mailingList.length; i++) {
            to = mailingList[i];
            body = "Hello " + userList[i] + ", " + "Your team " + teamName + " registration has been completed for Programming Contest Event. Your Team's Unique ID is " + teamHash + ".";
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
          }


          req.flash("error", error);
          res.redirect("/ProgrammingContest/register");
        })
        .catch(() => {
          error = "An unexpected error occured while registering participant";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/register");
        });
    }
  });
};

const getPCList = (req, res) => {
    let all_team = [];
    let error = "";
    ProgrammingContest.find()
      .then((data) => {
        all_team = data;
        res.render("programming-contest/list.ejs", {
          error: req.flash("error"),
          team: all_team,
        });
      })
      .catch(() => {
        error = "Failed to retrieve data!";
        res.render("programming-contest/list.ejs", {
          error: req.flash("error", error),
          team: all_team,
        });
      });
  };

const deletePC = (req, res) => {
  let error = "";

  ProgrammingContest.deleteOne({ _id: req.params.id })
    .then(() => {
      let error = "Data has been deleted successfully!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    })
    .catch(() => {
      let error = "Failed to delete data";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
};

const paymentDonePC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id })
    .then((team) => {
      team.paid = team.total;
      team
        .save()
        .then(() => {
          let error = "Payment completed successfully!";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          let error = "Data could not be updated!";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
};

const selectPC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id })
    .then((team) => {
      team.selected = true;
      team
        .save()
        .then(() => {
          let error = "Team has been selected successfully!";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          let error = "Data could not be updated!";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
};

const editPC = (req, res) => {
  const id = req.params.id;
  let teamInfo;

  ProgrammingContest.findOne({ _id: id })
    .then((team) => {
      teamInfo = team;
      // console.log(teamInfo);
      res.render("programming-contest/editTeam.ejs", {
        error: req.flash("error"),
        teamInfo: team,
      });
    })
    .catch(() => {
      error = "Failed to update data!";
      res.render("programming-contest/list.ejs", {
        error: req.flash("error", error),
      });
    });
};

const postEditPC = (req, res) => {
  const {
    teamName,
    institution,
    coach,
    contactCoach,
    emailCoach,
    tshirtCoach,
    leader,
    contactLeader,
    emailLeader,
    tshirtLeader,
    member1,
    contactMember1,
    emailMember1,
    tshirtMember1,
    member2,
    contactMember2,
    emailMember2,
    tshirtMember2,
  } = req.body;
  //console.log("here");

  ProgrammingContest.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        teamName,
        institution,
        coach,
        contactCoach,
        emailCoach,
        tshirtCoach,
        leader,
        contactLeader,
        emailLeader,
        tshirtLeader,
        member1,
        contactMember1,
        emailMember1,
        tshirtMember1,
        member2,
        contactMember2,
        emailMember2,
        tshirtMember2,
      },
    }
  )
    .then(() => {
      let error = "Data has been updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    })
    .catch((err) => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
};

module.exports = {
  getPC,
  postPC,
  getPCList,
  deletePC,
  paymentDonePC,
  selectPC,
  editPC,
  postEditPC
};
