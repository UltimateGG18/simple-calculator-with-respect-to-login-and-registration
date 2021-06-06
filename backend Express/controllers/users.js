const { response } = require('express');
const user = require('../models/users');

exports.addNewUser = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const address = req.body.address;


    const userInfo = new user({ name, email, mobile, password,address });
    userInfo.save()
        .then(response => {
            res.status(200).json({ message: "User Registered Successfully...", users: response });
        })
        .catch(err => {
            res.status(500).json({ message: "User Not Registered Successfully...", error: err });
        })
}

exports.signIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    var payload = {}

    if (email && password) {
        payload = {
            email: email,
            password: password
        }
    }

    user.find(payload)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json({ message: "User SignIn Successfully", isAuth: true, ActiveUser: response });
            } else {
                res.status(200).json({ message: "User SignIn Failed", isAuth: false });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "User SignIn Failed" });
        })
}

