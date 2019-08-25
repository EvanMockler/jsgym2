"use strict";

const logger = require("../utils/logger");
const memberstore = require("../models/member-store");

const settings = {
  index(request, response) {
    logger.info("account settings rendering");
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId);
    const viewData = {
      title: "Account Settings",
      member: member
    };
    response.render("settings", viewData);
  },
  
  
  update(request,response){
    logger.info("Updating user details ");
    const memberId= request.params.id;
    const name = request.body.name;
    const gender = request.body.gender;
    const email = request.body.email;
    const address = request.body.address;
    const password = request.body.password;
    const height = request.body.height;
    const startingWeight = request.body.startingWeight;
    
    memberstore.update(memberId, name, gender, email, address, password, height, startingWeight);
    response.redirect("/settings/"+memberId);
  }
};



module.exports = settings