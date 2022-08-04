const express = require('express');
const router = express.Router();

// Routing Handeled here.
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/weather", (req, res) => {
    res.render("weather");
});

router.get("*", (req, res) => {
    res.render("err404", {
        errorComment: "Oops! The Page you requested can't be found."
    });
    res.status(404);
});

module.exports = router;