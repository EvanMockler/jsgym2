"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberstore = require("../models/member-store");
const analytics = require("../utils/analytics");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId);
    logger.info("dashboard rendering");
    var memberBMI;
    var idealWeight;
    var bmiCategory;
    var gender=member.gender;
    var weight;
    var height = member.height;
    
    logger.info("member: "+member.name);
    logger.info("Assessments: "+ member.assessments.length);
    if(member.assessments.length < 1){
      weight = member.startingWeight;
    }
    else{
      const latestAssessment = member.assessments[member.assessments.length-1];
      logger.info("Latest Assessment "+ latestAssessment);
      weight = latestAssessment.weight;
    }
    memberBMI = analytics.calculateBMI(weight,height);
    idealWeight = analytics.isIdealBodyWeight(weight,height,gender);
    bmiCategory = analytics.determineBMICategory(memberBMI);
    const viewData = {
      title: "Member Dashboard",
      member: member,
      BMI: memberBMI,
      IdealWeight: idealWeight,
      bmiCategory: bmiCategory
    };
    logger.info("about to render");
    response.render("dashboard", viewData);
  },

  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberstore.removeMember(memberId);
    response.redirect("/dashboard");
  },
  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberstore.removeassessment(memberId, assessmentId);
    response.redirect("/dashboard/" + memberId);
  },
  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend: request.body.trend,
      comment: request.body.comment
    };
    logger.debug("New Assessment = ", newAssessment);
    memberstore.addassessment(memberId, newAssessment);
    response.redirect("/dashboard/" + memberId);
  }
};

module.exports = dashboard;
