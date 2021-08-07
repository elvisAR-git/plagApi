var path = require("path");
var appDir = path.dirname(require.main.filename);

module.exports = {
  mongo: {
    uri: "mongodb+srv://root:root@cluster0.h85gf.mongodb.net/test?retryWrites=true&w=majority",
  },
  port: "6007",
  ip: "127.0.0.1",
  secrets: {
    session: "dsakjdksjajasdsadsamrrmenwebrweo",
  },
  UPLOAD: appDir + "/uploads/",
};
