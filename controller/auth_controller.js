// let database = require("../database");
// let update = require("../database").writeJSON;
const UserData = require("../models/userDataModel");

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register", {
            email: req.query.email,
            error: ''
        });
    },

    registerSubmit: async (req, res) => {
        // Adding new user to database
        const newUserData = {     // Structure for the newly created user
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            events: [],
            avatar: "",
        };
        // Fetch avatar for new user
        newUserData.avatar = `https://avatars.abstractapi.com/v1/?api_key=${process.env.Abstractapi_CLIENT_ID}&name=${encodeURIComponent(newUserData.name)}&image_size=60&char_limit=2&background_color=335eea&font_color=ffffff&is_rounded=true&is_uppercase=true`

        const newUser = new UserData(newUserData);
        try {
            await newUser.save();
            res.render("auth/login")
        } catch (err) {
            if (err.code === 11000) { 
                if (err.errmsg.includes('name')) {
                    res.render("auth/register", {
                        email: '',
                        error: `username ${newUserData.name} is taken`
                    })
                } else if (err.errmsg.includes('email')) {
                    res.render("auth/register", {
                        email: '',
                        error: `email ${newUserData.email} is used`
                    })
                }
            } else { 
                res.render("auth/register", {
                    email: '',
                    error: "error occurred when saving user"
                })
            }
        }
            
    },
};

module.exports = authController;