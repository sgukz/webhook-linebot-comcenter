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
restService.post("/body", function (req, res) {
  let userId = ""
  if(req.body.events[0].source.groupId != undefined){
    userId = req.body.events[0].source.groupId
  }else{
    userId = req.body.events[0].source.userId    
  }
  let formatMessage = {
    "type": "text",
    "text": JSON.stringify(req.body)
  }
  reply(userId, formatMessage)
  res.sendStatus(200)
});
restService.post("/webhook", function (req, res) {
  const toTwoDigits = num => (num < 10 ? "0" + num : num);
  let today = new Date();
  let year = today.getFullYear();
  let year_TH = parseInt(today.getFullYear()) + 543;
  let month = toTwoDigits(today.getMonth() + 1);
  let day = toTwoDigits(today.getDate());
  let ToDay = moment().format('LL');
  let date_now = `${year}-${month}-${day}`;
  let userMessage = req.body.events[0].message.text;
  let userId = ""
  if(req.body.events[0].source.groupId != undefined){
    userId = req.body.events[0].source.groupId
  }else{
    userId = req.body.events[0].source.userId    
  }
  if (userMessage == "เวรบ่าย" || userMessage == "เวรบ่ายใคร" || userMessage == "บ่าย" || userMessage == "เวรแลง") {
    axios
      .post("http://49.231.5.51:3000/getOT", {
        dateStart: date_now
      })
      .then(resp => {
        let result1 = ""
        let result2 = ""
        let data = resp.data;
        result1 = data.dataParse.name_admin
        result2 = data.dataParse.name_tech
        let formatMessage = {
          "type": "flex",
          "altText": "เวรบ่ายศูนย์คอมพิวเตอร์ ",
          "contents": {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#f39c12"
              }
            },
            "header": {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "เวรบ่ายศูนย์คอมพิวเตอร์",
                  "weight": "bold",
                  "size": "md",
                  "gravity": "top",
                  "color": "#FFFFFF",
                  "flex": 0
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "วันที่ " + ToDay,
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "โปรแกรมเมอร์"
                },
                {
                  "type": "text",
                  "text": result1,
                  "weight": "bold",
                  "size": "xl",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ช่างเทคนิค"
                },
                {
                  "type": "text",
                  "text": result2,
                  "weight": "bold",
                  "size": "xl",
                  "align": "center"
                }
              ]
            }
          }
        }
        reply(userId, formatMessage)
        res.sendStatus(200)
      })
      .catch(error => console.log("Error :", error));
  } else if (userMessage == "เวรเที่ยง" || userMessage == "เวรเที่ยงใคร" || userMessage == "เที่ยง") {
    axios
      .post("http://49.231.5.51:3000/getDuty", {
        dateStart: date_now
      })
      .then(resp => {
        let result = ""
        let data = resp.data;
        result = data.dataParse.name
        let formatMessage = {
          "type": "flex",
          "altText": "เวรเที่ยงศูนย์คอมฯ ",
          "contents": {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#28b463"
              }
            },
            "header": {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "เวรเที่ยงศูนย์คอมฯ",
                  "weight": "bold",
                  "size": "md",
                  "gravity": "top",
                  "color": "#FFFFFF",
                  "flex": 0
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "วันที่ " + ToDay,
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": result,
                  "weight": "bold",
                  "size": "xl",
                  "align": "center"
                }
              ]
            }
          }
        }
        reply(userId, formatMessage)
        res.sendStatus(200)
      })
      .catch(error => console.log("Error :", error));
  }else if(userMessage == "เวร"){
    axios
    .post("http://49.231.5.51:3000/getOT", {
      dateStart: date_now
    })
    .then(resp => {
      let result1 = ""
      let result2 = ""
      let data = resp.data;
      result1 = data.dataParse.name_admin
      result2 = data.dataParse.name_tech
      let formatMessage1 = {
        "type": "flex",
        "altText": "เวรบ่ายศูนย์คอมพิวเตอร์ ",
        "contents": {
          "type": "bubble",
          "styles": {
            "header": {
              "backgroundColor": "#f39c12"
            }
          },
          "header": {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": "เวรบ่ายศูนย์คอมพิวเตอร์",
                "weight": "bold",
                "size": "md",
                "gravity": "top",
                "color": "#FFFFFF",
                "flex": 0
              }
            ]
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "วันที่ " + ToDay,
                "align": "center"
              },
              {
                "type": "text",
                "text": "โปรแกรมเมอร์"
              },
              {
                "type": "text",
                "text": result1,
                "weight": "bold",
                "size": "xl",
                "align": "center"
              },
              {
                "type": "text",
                "text": "ช่างเทคนิค"
              },
              {
                "type": "text",
                "text": result2,
                "weight": "bold",
                "size": "xl",
                "align": "center"
              }
            ]
          }
        }
      }
      reply(userId, formatMessage1)
      res.sendStatus(200)
    })
    .catch(error => console.log("Error :", error));
    axios
      .post("http://49.231.5.51:3000/getDuty", {
        dateStart: date_now
      })
      .then(resp => {
        let result = ""
        let data = resp.data;
        result = data.dataParse.name
        let formatMessage2 = {
          "type": "flex",
          "altText": "เวรเที่ยงศูนย์คอมฯ ",
          "contents": {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#28b463"
              }
            },
            "header": {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "เวรเที่ยงศูนย์คอมฯ",
                  "weight": "bold",
                  "size": "md",
                  "gravity": "top",
                  "color": "#FFFFFF",
                  "flex": 0
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "วันที่ " + ToDay,
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": result,
                  "weight": "bold",
                  "size": "xl",
                  "align": "center"
                }
              ]
            }
          }
        }
        reply(userId, formatMessage2)
        res.sendStatus(200)
      })
      .catch(error => console.log("Error :", error));
  }
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
