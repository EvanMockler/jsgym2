"use strict";


const logger = require("../utils/logger");
const memberstore = require("../models/member-store");
const analytics = require("../utils/analytics");
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId);
    logger.debug("Member id = ", memberId);
    var memberBMI;
    var idealWeight;
    var bmiCategory;
    var gender=member.gender;
    var weight;
    var height = member.height;
    
    logger.info("member: "+member.name);
    if(member.assessments.length < 1){
      weight = member.startingWeight;
    }
    else{
      const latestAssessment = member.assessments[member.assessments.length-1];
      logger.info("Latest Assessment "+ latestAssessment);
      weight = latestAssessment.weight;
    }
    memberBMI = analytics.calculateBMI(weight,height);
    logger.info("BMI: "+ height);
    idealWeight = analytics.isIdealBodyWeight(weight,height,gender);
    bmiCategory = analytics.determineBMICategory(memberBMI);
    const viewData = {
      title: "Member",
      member: member,
      BMI: memberBMI,
      IdealWeight: idealWeight,
      bmiCategory: bmiCategory
    };
    logger.info("about to render");
    response.render("members", viewData);
  },
    addComment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const comment = request.body.comment;
    logger.debug(`Adding Comment ${assessmentId} for Member ${memberId}`);
    memberstore.updateComment(memberId, assessmentId,comment);
    response.redirect("/member/" + memberId);    
  }
  
};

module.exports = member;
