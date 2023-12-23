const express = require("express");
const getUsers = require("../controllers/accounts/getUsers");

// initialize router
const router = express.Router();

// GET at route: http://localhost:8080/people
router.get("/people", [], getUsers);

// router.get("/account", [], getUser);

// router.post("/account", [], changeUser);

module.exports = router;
