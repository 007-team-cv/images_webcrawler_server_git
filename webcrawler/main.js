//var getImageUrls = require("get-image-urls");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.engine('html', require('ejs').renderFile);
const port = 3000;
const host = "localhost";

app.get("/", (req, res) => {
  res.render('index.html');
});

app.post("/", function (req, res) {
  console.log(req.body);
  getImageUrls(req.body["url"], function (err, images) {
    if (!err) {
      console.log("Images found", images.length);
      console.log(images);
      json_res = {
        requestBody: req.body,
        images_length: images.length,
        images: images,
      };
      res.json(json_res);
    } else {
      console.log("ERROR", err);
      res.json({});
    }
  });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
