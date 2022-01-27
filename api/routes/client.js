const express = require("express");
const router = express.Router();
const { heartbeat } = require("../controllers/heartbeat");
const { clientLogin } = require("../controllers/auth/client");

//login the user
router.post('/login' , clientLogin);

//keeping the server alive
router.get("/heartbeat", heartbeat);

module.exports = router;
