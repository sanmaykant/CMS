const register = require("./register")
const login = require("./login")

const registerUser = async (userRequest, role, res) =>
    register(userRequest, role, res)

const loginUser = async(userRequest, role, res) =>
    login(userRequest, role, res)

module.exports = {
    registerUser,
    loginUser,
}
