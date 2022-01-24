const express = require("express");
const validUrl = require("valid-url");
const { customAlphabet } = require("nanoid");

const ShortUrl = require("../model/ShortUrl");
const router = express.Router();
const nanoid = customAlphabet(
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
  10
);

router.post("/api/pigmy/", async (req, res) => {
  const url = req.body.url;
  if (validUrl.isUri(url)) {
    let shorturl = await ShortUrl.findOne({ url });

    let urlCode = shorturl?.urlCode;
    if (!shorturl) {
      urlCode = nanoid();
      shorturl = new ShortUrl({
        url,
        urlCode,
      });
      await shorturl.save();
    }
    return res.send(JSON.stringify(urlCode));
  } else {
    return res.status(400).send(JSON.stringify("Not a valid url"));
  }
});

router.get("/:code", async (req, res) => {
  const urlCode = req.params.code;
  const shorturl = await ShortUrl.findOne({ urlCode });
  if (shorturl) return res.redirect(shorturl.url);
  else return res.send("");
});

module.exports = router;
