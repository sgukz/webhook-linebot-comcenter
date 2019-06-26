const express = require("express");
const fs = require("fs");
const sharp = require('sharp');
const bodyParser = require("body-parser");
const axios = require('axios');
const moment = require('moment');
const request = require('request')
moment.locale('th');
const restService = express("");
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  let userMessage = req.body.events[0].message.text;
  let userId = req.body.events[0].source.userId;
  let formatMessage = {
    "type": "text",
    "text": userId
  }
  reply(userId, formatMessage)
  res.sendStatus(200)
});

function reply(userId, formatMessage) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {VdKGNhSVx5cGjQ4bWjbVPmD88+MXVwHCS9oTJu5sZZgx2rFGa+bq93E3oQVo6ExDSZIFApjjR5GT30d+ca7IXPEpS30Ggnvkq1JEuQB2eVsHRJ6cCsZEC1Cf9Em2VPWhvQVxZbSBh6pBMV9HP+f0EQdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    to: userId,
    messages: [formatMessage]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/push',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}
restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
