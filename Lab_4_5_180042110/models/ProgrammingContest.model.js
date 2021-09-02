const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    required: true,
  },
  member2: {
    type: String,
    required: true,
  },
  contactCoach: {
    type: String,
    required: true,
  },
  contactLeader: {
    type: String,
    required: true,
  },
  contactMember1: {
    type: String,
    required: true,
  },
  contactMember2: {
    type: String,
    required: true,
  },

  emailCoach: {
    type: String,
    required: false,
  },
  emailLeader: {
    type: String,
    required: false,
  },
  emailMember1: {
    type: String,
    required: false,
  },
  emailMember2: {
    type: String,
    required: false,
  },
  total: {
    type: Number,
    required: false,
  },
  paid: {
    type: Number,
    required: false,
  },
  selected: {
    type: Boolean,
    required: false,
  },
  tshirtCoach: {
    type: String,
    required: true,
  },
  tshirtLeader: {
    type: String,
    required: true,
  },
  tshirtMember1: {
    type: String,
    required: true,
  },
  tshirtMember2: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  teamHash: {
    type: String,
    required: false,
  },
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;