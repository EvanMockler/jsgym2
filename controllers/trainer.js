"use strict";

const logger = require("../utils/logger");
const trainerstore = require("../models/trainer-store");
const uuid = require("uuid");

const trainer = {
  index(request, response) {
    const trainerId = request.params.id;
    logger.debug("Trainer id = ", trainerId);
    const viewData = {
      title: "Trainer",
      trainer: trainerstore.getTrainer(trainerId)
    };
    response.render("trainers", viewData);
  },

  
};

module.exports = trainer;
