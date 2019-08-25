~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const settings = require("./controllers/settings.js");
const member = require("./controllers/member.js");
const trainer = require("./controllers/trainer.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard/:id", dashboard.index);
router.get("/trainerdashboard/", trainerdashboard.index);
router.get("/member/:id", member.index);
router.get("/dashboard/deletemember/:id", dashboard.deleteMember);

router.get("/settings/:id", settings.index);
router.get("/dashboard/:id", dashboard.index);
router.post("/update/:id", settings.update)

router.get("/dashboard/:id/deleteassessment/:assessmentid", dashboard.deleteAssessment);
router.post("/dashboard/:id/addassessment", dashboard.addAssessment);
router.post("/member/:id/addComment/:assessmentid",member.addComment);

module.exports = router;
