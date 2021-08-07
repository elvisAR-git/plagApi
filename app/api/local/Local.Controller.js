const fileModel = require("../../models/files.model");
const config = require("../../config/environment");
const fs = require("fs");

const plagChecker = require("../../services/palgchecker.service");

exports.uploadRaw = async (req, res) => {
  /*Support for Raw file upload */
  if (!req.files) {
    return res.send(
      send_response(null, true, "Please include file attachments")
    );
  }

  var files = [];
  let records = await fileModel.find({});

  req.files.forEach(async (file) => {
    let match = false;
    let matchRecord = {};
    records.forEach((r) => {
      if (
        r.dump.originalname === file.originalname &&
        r.dump.size === file.size
      ) {
        match = true;
        matchRecord = r;
        return;
      }
    });

    if (!match) {
      let d = fs.readFileSync(config.UPLOAD + file.filename);

      let f = new fileModel();
      f.name = file.filename;
      f.info = req.body.info;
      f.size = file.size;
      f.dump = file;
      files.push({
        id: f._id,
        file,
        data: d.toString("utf-8").split("\n"),
      });
      let sims = await plagChecker(f);

      f.relations = sims[0];
      f.total = d.toString("utf-8").split("\n").length;
      f.report = {
        report: sims[1],
      };
      f.plagiarised_lines = sims[2];

      f.unique =
        100 - (sims[2].length * 100) / d.toString("utf-8").split("\n").length;
      f.save((err) => {
        if (err) throw err;
      });
    } else {
      let d = fs.readFileSync(config.UPLOAD + file.filename);

      fs.unlink(config.UPLOAD + file.filename, (err) => {
        if (err) throw err;
      });

      let f = matchRecord;

      files.push({
        id: f._id,
        file,
        data: d.toString("utf-8").split("\n"),
      });
    }
  });
  let payload = {
    source_files: files,
  };

  res.send(send_response(payload, false, "success"));
};

exports.fetchFileViaId = async (req, res) => {
  console.log("fetching", req.params.id);
  let file = await fileModel
    .findOne({
      _id: req.params.id,
    })
    .populate("relations");
  if (file) {
    res.setHeader("Content-type", "application/json");
    res.send({ isError: false, message: "success", file: file });
  } else {
    res.setHeader("Content-type", "application/json");
    res.send({ isError: true, message: "processing, please wait", file: null });
  }
};

exports.compareFiles = async (req, res) => {
  let t_file = await fileModel
    .findOne({ _id: req.params.target_file })
    .populate("relations");
  let r_file = await fileModel
    .findOne({ _id: req.params.reference_file })
    .populate("relations");
  let payload = {
    target_file: t_file,
    reference_file: r_file,
  };
  res.render("compare", payload);
};

exports.getReport = async (req, res) => {
  let t_file = await fileModel
    .findOne({ _id: req.params.target_file })
    .populate("relations");
  let r_file = await fileModel
    .findOne({ _id: req.params.reference_file })
    .populate("relations");

  let reference_file_raw = fs
    .readFileSync(config.UPLOAD + r_file.name)
    .toString("utf-8")
    .split("\n");
  let target_file_raw = fs
    .readFileSync(config.UPLOAD + t_file.name)
    .toString("utf-8")
    .split("\n");

  t_file.report.report.forEach((report_) => {
    if (report_.file == req.params.reference_file) {
      console.log("found");
      res.send({
        report: report_,
        target_file: t_file,
        reference_file: r_file,
        reference_file_raw,
        target_file_raw,
      });
      return;
    }
  });
};

exports.testRoute = (req, res) => {
  res.send(send_response({ route: "Local" }, false, "success"));
};
