"use strict";

const express = require("express");

const controller = require("./Local.Controller");
const router = express.Router();

router.post("/local", controller.uploadRaw);
router.post("/fetch/:id", controller.fetchFileViaId);
router.post("/compare/:tartget_file/:reference_file", controller.compareFiles);
router.post("/report/:target_file/:reference_file", controller.getReport);
router.get("", controller.testRoute);

module.exports = router;
