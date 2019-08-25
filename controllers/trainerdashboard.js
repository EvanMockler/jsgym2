"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberstore = require("../models/member-store");
const trainerstore = require("../models/trainer-store");
const analytics = require("../utils/analytics");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    const trainerId = request.params.id;
    const trainer = trainerstore.getTrainer(trainerId);
    const members = memberstore.getAllMembers();
    logger.info("trainer dashboard rendering");
    const viewData = { 
      trainer: trainer,
      members: members,
    }
    response.render("trainerdashboard", viewData)

  },
  
  addComment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const comment = request.body.comment;
    logger.debug(`Adding Comment ${assessmentId} for Member ${memberId}`);
    memberstore.updateComment(memberId, assessmentId,comment);
    response.redirect("/members/" + memberId);    
  }
}

module.exports = trainerdashboard;
