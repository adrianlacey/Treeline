module.exports = {
  "inputs": {
    "First_Name": {
      "example": "Joe",
      "friendlyName": "First_Name",
      "required": true
    },
    "Last_Name": {
      "example": "Lacey",
      "friendlyName": "Last_Name",
      "required": true
    },
    "email": {
      "example": "example@email.com",
      "friendlyName": "email",
      "required": true
    },
    "password": {
      "example": "abc123",
      "friendlyName": "password",
      "required": true
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "First_Name": "Joe",
        "Last_Name": "Lacey",
        "email": "example@email.com",
        "password": "abc123",
        "id": 123,
        "createdAt": "2015-09-22T18:42:15.388Z",
        "updatedAt": "2015-09-22T18:42:15.388Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};