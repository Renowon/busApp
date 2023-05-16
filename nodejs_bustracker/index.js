// api and authentication key belong to 공공데이터포털
// for those who gonna use this service should check the policy -> https://www.data.go.kr/ugs/selectPortalPolicyView.do

// backend side
// npm install axios, express are needed
// server -> embodied by using express module
// API server -> embodied by using axios module and CORS error can be resolved by set Access-Control-Allow-Origin
// Do not go directly to API as there is a CORS issue. So we need to go to Node.js first and call api in Node.js

let express = require("express"); // use express module
let app = express();
let port = process.env.PORT || 80;
const axios = require("axios");

app.use(express.static("public_html"));
app.listen(port, function () {
  console.log("server initialized");
});

app.get("/bustracker_list", (req, res) => {
  let api = async () => {
    let response = null;
    try {
      response = await axios.get(
        "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll",
        {
          params: {
            ServiceKey: NOT_SPECIFIED_IN_GITHHUB,
            busRouteId: req.query.busRouteId,
            resultType: "json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    return response;
  };
  api().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //in order to avoid CORS error, add Access-Control-Allow-Origin header
    res.json(
      response.data.msgBody.itemList.map((bus) => {
        // For each bus object in the itemList array, create a new object with only the "stNm" and "arrmsg1" properties
        return {
          stNm: bus.stNm, // Set the "stNm" property to the value of the "stNm" property of the bus object
          arrmsg1: bus.arrmsg1, // Set the "arrmsg1" property to the value of the "arrmsg1" property of the bus object
        };
      })
    );
  });
});
