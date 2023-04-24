// Import the Express library.
const express = require("express");

// Create a new Router instance from the Express library.
const router = express.Router();

// Import the controller functions from the "../controller/controller" module.
const controller = require("../controller/controller");

// Define a route for the root path ("/") that handles GET requests and calls the "index" function from the controller.
router.get("/", controller.index);

router.get("/pre-lobby", controller.preLobby);

router.get("/join-room", controller.joinRoom);

router.get("/race", controller.race);

// Export the router instance as the module's default export.
module.exports = router;