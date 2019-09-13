const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");
const request = require("request");
moment.locale("th");
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
// router test request
app.post("/body", function(req, res) {
    let userId = "";
    if (req.body.events[0].source.groupId != undefined) {
        userId = req.body.events[0].source.groupId;
    } else {
        userId = req.body.events[0].source.userId;
    }
    let formatMessage = {
        type: "text",
        text: JSON.stringify(req.body)
    };
    reply(userId, formatMessage);
    res.sendStatus(200);
});
app.post("/webhook", function(req, res) {
    const toTwoDigits = num => (num < 10 ? "0" + num : num);
    let today = new Date();
    let year = today.getFullYear();
    let year_TH = parseInt(today.getFullYear()) + 543;
    let month = toTwoDigits(today.getMonth() + 1);
    let day = toTwoDigits(today.getDate());
    let ToDay = moment().format("LL");
    let date_now = `${year}-${month}-${day}`;
    let Months = moment().format("MMMM YYYY, H:mm:ss");
    let userMessage = req.body.events[0].message.text;
    let userId = "";
    if (req.body.events[0].source.groupId != undefined) {
        userId = req.body.events[0].source.groupId;
    } else {
        userId = req.body.events[0].source.userId;
    }
    if (
        userMessage == "เวรบ่าย" || userMessage == "บ่าย"
    ) {
        axios
            .post("http://49.231.5.51:3000/getOT", {
                dateStart: ''
            })
            .then(resp => {
                let admin = [];
                  let tech = [];
                   let data = resp.data;
                    data.dataParse.forEach(element => {
                        let todays = new Date(element.date_time);
                        admin.push(element.name_admin, todays.getDate());
                        tech.push(element.name_tech, todays.getDate());
                    });
                    let formatMessage = {
                        type: "flex",
                        altText: "เวรบ่ายศูนย์คอมพิวเตอร์ ",
                        contents: {
                            type: "bubble",
                            size: "mega",
                            header: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "เวรบ่ายศูนย์คอมพิวเตอร์",
                                                color: "#ffffff",
                                                size: "xl",
                                                flex: 1,
                                                weight: "bold"
                                            }
                                        ]
                                    }
                                ],
                                paddingAll: "20px",
                                backgroundColor: "#0367D3",
                                spacing: "md",
                                paddingTop: "22px"
                            },
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: Months,
                                        size: "md",
                                        weight: "bold"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "วันนี้",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        height: "12px",
                                                        width: "12px",
                                                        borderColor: "#EF454D",
                                                        borderWidth: "2px"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: admin[0],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px",
                                        margin: "xl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "baseline",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 1
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "horizontal",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            },
                                                            {
                                                                type: "box",
                                                                layout:
                                                                    "vertical",
                                                                contents: [
                                                                    {
                                                                        type:
                                                                            "filler"
                                                                    }
                                                                ],
                                                                width: "2px",
                                                                backgroundColor:
                                                                    "#B7B7B7"
                                                            },
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        flex: 1
                                                    }
                                                ],
                                                width: "12px"
                                            },
                                            {
                                                type: "text",
                                                text:
                                                    "ผู้ดูแลระบบและช่างเทคนิค",
                                                gravity: "center",
                                                flex: 4,
                                                size: "sm",
                                                color: "#8c8c8c"
                                            }
                                        ],
                                        spacing: "lg",
                                        height: "40px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "" + admin[1] + "",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#6486E3"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: tech[0],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "พรุ่งนี้",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#EF454D"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: admin[2],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px",
                                        margin: "xl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "baseline",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 1
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "horizontal",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            },
                                                            {
                                                                type: "box",
                                                                layout:
                                                                    "vertical",
                                                                contents: [
                                                                    {
                                                                        type:
                                                                            "filler"
                                                                    }
                                                                ],
                                                                width: "2px",
                                                                backgroundColor:
                                                                    "#B7B7B7"
                                                            },
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        flex: 1
                                                    }
                                                ],
                                                width: "12px"
                                            },
                                            {
                                                type: "text",
                                                text:
                                                    "ผู้ดูแลระบบและช่างเทคนิค",
                                                gravity: "center",
                                                flex: 4,
                                                size: "sm",
                                                color: "#8c8c8c"
                                            }
                                        ],
                                        spacing: "lg",
                                        height: "40px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "" + admin[3] + "",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#6486E3"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: tech[2],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px"
                                    }
                                ]
                            }
                        }
                    };
                reply(userId, formatMessage);
                res.sendStatus(200);
            })
            .catch(error => console.log("Error :", error));
    } else if (
        userMessage == "เวรเที่ยง" ||
        userMessage == "เวรเที่ยงใคร" ||
        userMessage == "เที่ยง"
    ) {
        axios
            .post("http://49.231.5.51:3000/getDuty", {
                dateStart: date_now
            })
            .then(resp => {
                let result = "";
                let data = resp.data;
                result = data.dataParse.name;
                let formatMessage = {
                    type: "flex",
                    altText: "เวรเที่ยงศูนย์คอมฯ ",
                    contents: {
                        type: "bubble",
                        styles: {
                            header: {
                                backgroundColor: "#28b463"
                            }
                        },
                        header: {
                            type: "box",
                            layout: "baseline",
                            contents: [
                                {
                                    type: "text",
                                    text: "เวรเที่ยงศูนย์คอมฯ",
                                    weight: "bold",
                                    size: "md",
                                    gravity: "top",
                                    color: "#FFFFFF",
                                    flex: 0
                                }
                            ]
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "text",
                                    text: "วันที่ " + ToDay,
                                    align: "center"
                                },
                                {
                                    type: "text",
                                    text: result,
                                    weight: "bold",
                                    size: "md",
                                    align: "center"
                                }
                            ]
                        }
                    }
                };
                reply(userId, formatMessage);
                res.sendStatus(200);
            })
            .catch(error => console.log("Error :", error));
    } else if (userMessage == "เวร") {
        axios
            .post("http://49.231.5.51:3000/getOT", {
                dateStart: ''
            })
            .then(resp => {
                let admin = [];
                    let tech = [];
                    let data = resp.data;
                    data.dataParse.forEach(element => {
                        let todays = new Date(element.date_time);
                        admin.push(element.name_admin, todays.getDate());
                        tech.push(element.name_tech, todays.getDate());
                    });
                    let formatMessage1 = {
                        type: "flex",
                        altText: "เวรบ่ายศูนย์คอมพิวเตอร์ ",
                        contents: {
                            type: "bubble",
                            size: "mega",
                            header: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "เวรบ่ายศูนย์คอมพิวเตอร์",
                                                color: "#ffffff",
                                                size: "xl",
                                                flex: 1,
                                                weight: "bold"
                                            }
                                        ]
                                    }
                                ],
                                paddingAll: "20px",
                                backgroundColor: "#0367D3",
                                spacing: "md",
                                paddingTop: "22px"
                            },
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: Months,
                                        size: "md",
                                        weight: "bold"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "วันนี้",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        height: "12px",
                                                        width: "12px",
                                                        borderColor: "#EF454D",
                                                        borderWidth: "2px"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: admin[0],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px",
                                        margin: "xl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "baseline",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 1
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "horizontal",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            },
                                                            {
                                                                type: "box",
                                                                layout:
                                                                    "vertical",
                                                                contents: [
                                                                    {
                                                                        type:
                                                                            "filler"
                                                                    }
                                                                ],
                                                                width: "2px",
                                                                backgroundColor:
                                                                    "#B7B7B7"
                                                            },
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        flex: 1
                                                    }
                                                ],
                                                width: "12px"
                                            },
                                            {
                                                type: "text",
                                                text:
                                                    "ผู้ดูแลระบบและช่างเทคนิค",
                                                gravity: "center",
                                                flex: 4,
                                                size: "sm",
                                                color: "#8c8c8c"
                                            }
                                        ],
                                        spacing: "lg",
                                        height: "40px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "" + admin[1] + "",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#6486E3"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: tech[0],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "พรุ่งนี้",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#EF454D"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: admin[2],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px",
                                        margin: "xl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "baseline",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 1
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "horizontal",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            },
                                                            {
                                                                type: "box",
                                                                layout:
                                                                    "vertical",
                                                                contents: [
                                                                    {
                                                                        type:
                                                                            "filler"
                                                                    }
                                                                ],
                                                                width: "2px",
                                                                backgroundColor:
                                                                    "#B7B7B7"
                                                            },
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        flex: 1
                                                    }
                                                ],
                                                width: "12px"
                                            },
                                            {
                                                type: "text",
                                                text:
                                                    "ผู้ดูแลระบบและช่างเทคนิค",
                                                gravity: "center",
                                                flex: 4,
                                                size: "sm",
                                                color: "#8c8c8c"
                                            }
                                        ],
                                        spacing: "lg",
                                        height: "40px"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "" + admin[3] + "",
                                                size: "sm",
                                                color: "#8c8c8c",
                                                gravity: "center"
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "filler"
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "filler"
                                                            }
                                                        ],
                                                        cornerRadius: "30px",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderWidth: "2px",
                                                        borderColor: "#6486E3"
                                                    },
                                                    {
                                                        type: "filler"
                                                    }
                                                ],
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: tech[2],
                                                gravity: "center",
                                                flex: 4,
                                                size: "md",
                                                weight: "bold"
                                            }
                                        ],
                                        spacing: "lg",
                                        cornerRadius: "30px"
                                    }
                                ]
                            }
                        }
                    };
                reply(userId, formatMessage1);
                res.sendStatus(200);
            })
            .catch(error => {
                return console.log("Error :", error);
            });
        axios
            .post("http://49.231.5.51:3000/getDuty", {
                dateStart: date_now
            })
            .then(resp => {
                let result = "";
                let data = resp.data;
                result = data.dataParse.name;
                let formatMessage2 = {
                    type: "flex",
                    altText: "เวรเที่ยงศูนย์คอมฯ ",
                    contents: {
                        type: "bubble",
                        styles: {
                            header: {
                                backgroundColor: "#28b463"
                            }
                        },
                        header: {
                            type: "box",
                            layout: "baseline",
                            contents: [
                                {
                                    type: "text",
                                    text: "เวรเที่ยงศูนย์คอมฯ",
                                    weight: "bold",
                                    size: "md",
                                    gravity: "top",
                                    color: "#FFFFFF",
                                    flex: 0
                                }
                            ]
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "text",
                                    text: "วันที่ " + ToDay,
                                    align: "center"
                                },
                                {
                                    type: "text",
                                    text: result,
                                    weight: "bold",
                                    size: "md",
                                    align: "center"
                                }
                            ]
                        }
                    }
                };
                reply(userId, formatMessage2);
                res.sendStatus(200);
            })
            .catch(error => {
                return console.log("Error :", error);
            });
    }
});

function reply(userId, formatMessage) {
    let headers = {
        "Content-Type": "application/json",
        Authorization:
            "Bearer {LrfBCr5OUdr+17b5i78v67kL22pszq/tTjHdgAIdRyZ794bNmr78tH6VrHr38BFej/tuWSjfIcW2VrcNQGJC+/DIVNBZ8OYoXSAZefdZYcRnPCuSQR+iO6G52hKcir98sOq+PEsfZY57C1gpn3E6BwdB04t89/1O/w1cDnyilFU=}" // Channel access token
    };
    let body = JSON.stringify({
        to: userId,
        messages: [formatMessage]
    });
    request.post(
        {
            url: "https://api.line.me/v2/bot/message/push",
            headers: headers,
            body: body
        },
        (err, res, body) => {
            console.log("status = " + res.statusCode);
        }
    );
}
app.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
