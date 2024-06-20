const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");
const request = require("request");
moment.locale("th");
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
const APP_URL = "";

function formateDateTH(dateTime, style) {
    let date = dateTime.split("-");
    let day = parseInt(date[2]);
    let month = parseInt(date[1]);
    let strMonthCut = [
        "",
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];
    let year = parseInt(date[0]) + 543;

    let createdDate =
        style === 1
            ? strMonthCut[month] + " " + year
            : day + " " + strMonthCut[month] + " " + year;
    //console.log(createdDate);
    return createdDate;
}
// router test request
app.get("/", function (req, res) {
    res.status(200).json({ status: 200, msg: "service status actived" })
});

app.post("/webhook", function (req, res) {
    let userId = req.body.events[0]?.source.userId;
    let formatMessage = {
        type: "text",
        text: JSON.stringify(req.body.events[0]?.source)
    };
    reply(userId, formatMessage);
    res.sendStatus(200);
});

function reply(userId, formatMessage) {
    const KEY_API = "wAGq+YglcGGG4yAlPWvjYVvkjSpJ98DqENDEZnaPD5QhbnRb0s68HQwZaH6axgOrldAP2+2eXwjv/rjj1aXQu1iqyGNckaCR8KYx1Pq9u4ni2ZMm/5Jx1MGiNbqviMH1KnpKmShShUxJJqN/Xgcp/QdB04t89/1O/w1cDnyilFU="
    const URL = "https://api.line.me/v2/bot/message/push"
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${KEY_API}`
    };
    axios
        .post(URL, { to: userId, messages: [formatMessage], }, { headers: header })
        .then((resp) => {
            console.log(resp.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

app.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});
