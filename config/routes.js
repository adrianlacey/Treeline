module.exports.routes = {
  "post /signup": {
    "target": "SignupController.create"
  },
  "get /": {
    "target": "Home$Controller.find"
  }
};