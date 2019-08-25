"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore = {
  store: new JsonStore("./models/member-store.json", { memberCollection: []  }),
  collection: "memberCollection",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  removeAllMembers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  updateComment(memberId, assessmentId, comment) {
    const member = this.getMember(memberId);
    const assessments = member.assessments;
    const assessment = _.find(assessments, { id: assessmentId });
    assessment.comment = comment;
    this.store.save();
  },
  
  addassessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
  },
  update(id, name, gender, email, address, password, height, startingWeight){
    const member = this.getMember(id);
    member.name = name;
    member.gender = gender;
    member.email = email;
    member.address = address;
    member.password = password;
    member.height = height;
    member.startingWeight = startingWeight;
    
    this.store.save();
  },
  removeassessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId });
    this.store.save();
  }
};

module.exports = memberStore;
