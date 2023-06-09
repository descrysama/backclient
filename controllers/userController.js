const {hashPassword, comparePassword} = require('../tools/hashPassword');
const jwt = require('jsonwebtoken');
const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;


module.exports.checkToken = (req, res) => {
    const token = req.cookies.jwt ? req.cookies.jwt : null
    const id = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET) : null;
    if (token) {
        if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            res.json({
                status: true,
                message: "Token valide.",
                id : id
            })
        } else {
            res.json({
                status: false,
                message: "Token invalide."
            })
        }
    } else {
        res.json({
            status: false,
            message: "Token non trouvé."
        })
    }
}

module.exports.logout = async(req, res) => {
    res.cookie("_auth", "", { maxAge: 1 });
    res.json({message: "Deconnexion réussi"})
},

module.exports.login = async(req, res) => {
    const { username , password } = req.body;

    const user = await users.findOne({
        where: {
            username: username
        }
    });

    try {
        if (user) {
            if (comparePassword(password, user.password)) {
                const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                const maxAge = 3 * 24 * 60 * 60 * 1000;
                res.cookie("_auth", token, {
                    httpOnly: true,
                    maxAge
                })
                
                res.setHeader('Set-Cookie', '_auth='+ token + '; Path=/;');
                res.status(200).json({
                    boolean: true,
                    message: 'Connexion Réussie, redirection...'
                })

            } else {
                res.json({
                    boolean: false,
                    message: "Email and/or password incorrect"
                })
            }
        } else {
            res.json({
                boolean: false,
                message: "Email and/or password incorrect"
            })
        }
    } catch(error) {
        res.json({
            error: error
        })
    }
}

