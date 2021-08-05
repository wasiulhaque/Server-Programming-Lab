const ProgrammingContest = require("../models/ProgrammingContest.model");

const getPC = (req, res) => {
  //console.log("Here");
  res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
  const { teamName, coach, leader, member1, member2, contactCoach, contactLeader, contactMember1, contactMember2, emailCoach, emailLeader, emailMember1, emailMember2, tshirtCoach, tshirtLeader, tshirtMember1, tshirtMember2 } = req.body;


  let registrationFee = 2500;

  const total = registrationFee;
  const paid = 2500;
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
          });
      team
        .save()
        .then(() => {
          error = "Team has been registered successfully!";
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

module.exports = {
  getPC,
  postPC,
  getPCList,
  deletePC,
  paymentDonePC,
  selectPC,
};
