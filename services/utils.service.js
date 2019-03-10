const express = require('express');
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
const moment = require('moment');

var service = {
  generateOtp: generateOtp,
  sendSms: sendSms,
  sendMail: sendMail,
  getServerTime: getServerTime,
  diffBwTimestamps: diffBwTimestamps
}
module.exports = service;

function generateOtp(length, isUppercase, isAlphabates, isSpecialChars) {
  let uppercase = !!isUppercase ? isUppercase : false;
  let special = !!isSpecialChars ? isSpecialChars : false;
  let alphabates = !!isAlphabates ? isAlphabates : false;
  let otpLength = !!length ? length : 6;
  const otp = otpGenerator.generate(otpLength, {upperCase: uppercase, specialChars: special ,alphabets: alphabates});
  return otp;
}

function sendSms(type, mobileNumber, otp) {
  console.log("need to send sms,and otp is", otp);
  return true;
}

function sendMail(mail, otp) {
  console.log(mail, otp);
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: ""
    }
  });
  smtpTransport.sendMail({
  from: "", // sender address
  to: mail, // comma separated list of receivers
  subject: "Testing sending using gmail", // Subject line
  text: otp // plaintext body
  }, function(error, response){
      if(error){
          console.log(error);
          return false;
      }else{
        // res.json({
        //     status: true,
        //     "msg": "otp send successfully"
        // })
        return true;
      }
  });
  return true;
}

function getServerTime() {
  return moment();
}

function diffBwTimestamps(timestamp1, timestamp2, diffUnits) {
  let units = !!diffUnits ? diffUnits : 'minutes';
  let duration = moment.duration(timestamp2.diff(timestamp1));
  return duration.as(units);
}
