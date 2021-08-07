/**
 * Main application routes
 */

module.exports = (app) => {
  // Insert routes below
  console.log("Doing routes");

  app.use("/api/raw/", require("./api/local"));
};
