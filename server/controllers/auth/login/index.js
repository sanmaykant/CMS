const bcrypt = require("bcryptjs")
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const { SECRET, TOKEN_EXPIRATION } = require("../../../config")
const { User } = require("../../../models/User")
const { loginSchema } = require("../validate")

const MSG = {
  emailNotExist: "Email is not found. Invalid login credentials.",
  wrongRole: "Please make sure this is your identity.",
  loginSuccess: "You are successfully logged in.",
  wrongPassword: "Incorrect password.",
  loginError: "Oops! Something went wrong.",
};

const login = async (userRequest, role, res) => {
    try {
        loginRequest = await loginSchema.validateAsync(userRequest)
        let { email, password } = userRequest;

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                reason: "email",
                message: MSG.emailNotExist,
                success: false
            })
        }

        if (user.role !== role) {
            return res.status(403).json({
                reason: "role",
                message: MSG.wrongRole,
                success: false
            })
        }

        let passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                email: user.email
            }, SECRET)

            let result = {
                email: user.email,
                role: user.role,
                token: `Bearer ${token}`,
            }

            return res.status(200).json({
                ...result,
                message: MSG.loginSuccess,
                succes: true
            })
        } else {
            return res.status(403).json({
                reason: "password",
                message: MSG.wrongPassword,
                success: false
            })
        }
    } catch (error) {
        let errorMsg = MSG.loginError
        if (error.isJoi === true) {
            errror.status = 403
            errorMsg = error.message
        }
        return res.status(500).json({
            reason: "server",
            message: errorMsg,
            success: false
        })
    }
}

module.exports = login
