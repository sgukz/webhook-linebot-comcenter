"use strict";

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const axios = require('axios');
const moment = require('moment');
moment.locale('th');
const restService = express("");
const publicDir = require('path').join(__dirname, '/public');
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(express.static(publicDir));
restService.use(bodyParser.json());

restService.get('/image/:category/:size', (req, res) => {
  const requestedCategory = req.params['category'];
  const requestedSize = req.params['size'];
  res.type('image/jpeg');
  fs.createReadStream('public/images/' + requestedCategory + '/' + requestedSize + '.jpg').pipe(res);
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

  if (req.body.queryResult.parameters.ot == "เวรบ่าย" || req.body.queryResult.parameters.ot == "เวรบ่ายใคร") {
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
        return res.json({
          fulfillmentMessages: [{
            "payload": {
              "line": {
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
                        "size": "xl"
                      },
                      {
                        "type": "text",
                        "text": "ช่างเทคนิค"
                      },
                      {
                        "type": "text",
                        "text": result2,
                        "weight": "bold",
                        "size": "xl"
                      }
                    ]
                  }
                }
              }
            },
            "platform": "LINE"
          }],
          source: "line"
        });
      })
      .catch(error => console.log("Error :", error));
  } else if (req.body.queryResult.parameters.duty == "เวรเที่ยง" || req.body.queryResult.parameters.duty == "เวรเที่ยงใคร") {
    axios
      .post("http://49.231.5.51:3000/getDuty", {
        dateStart: date_now
      })
      .then(resp => {
        let result = ""
        let data = resp.data;
        result = data.dataParse.name
        return res.json({
          fulfillmentMessages: [{
            "payload": {
              "line": {
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
                        "size": "xl"
                      }
                    ]
                  }
                }
              }
            },
            "platform": "LINE"
          }],
          source: "line"
        });
      })
      .catch(error => console.log("Error :", error));
  }
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
