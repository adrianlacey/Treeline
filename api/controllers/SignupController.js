var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "First_Name": {
                    "example": "Joe",
                    "required": true
                },
                "Last_Name": {
                    "example": "Lacey",
                    "required": true
                },
                "email": {
                    "example": "example@email.com",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Encrypt password
                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].encryptPassword({
                    "password": inputs.password
                }).exec({
                    "error": function(encryptPassword) {
                        return exits.error({
                            data: encryptPassword,
                            status: 500
                        });

                    },
                    "success": function(encryptPassword) {
                        // Create User
                        sails.machines['_project_4023_0.0.0'].create_user({
                            "First_Name": inputs.First_Name,
                            "Last_Name": inputs.Last_Name,
                            "email": inputs.email,
                            "password": encryptPassword
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(createUser) {
                                return exits.respond({
                                    data: createUser,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(createUser) {
                                return exits.error({
                                    data: createUser,
                                    status: 500
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};