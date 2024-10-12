const bcrypt = require("bcryptjs")

const { User, CitizenProfile } = require("../../../models/User")
const { ROLE } = require("../../../config/roles");
const { signupSchema, validateEmail } = require("../validate")

const MSG = {
  emailExists: "Email is already registered.",
  signupSuccess: "You are successfully signed up.",
  signupError: "Unable to create your account.",
};

const register = async (userRequest, role, res) => {
    try {
        const signupRequest = await signupSchema.validateAsync(userRequest)

        let emailNotTaken = await validateEmail(signupRequest.email)
        if (!emailNotTaken) {
            return res.status(400).json({
                message: MSG.emailExists,
                success: false,
            })
        }

        const password = await bcrypt.hash(signupRequest.password, 12)
        const newUser = new User({
            ...signupRequest,
            password,
            role,
        })
        await newUser.save()

        if (role === ROLE.citizen) {
            await CitizenProfile.create({
                citizenId: newUser._id
            })
        }

        return res.status(201).json({
            message: MSG.signupSuccess,
            success: true,
        })
    } catch (err) {
        let errorMsg = MSG.signupError;
        if (err.isJoi === true) {
          err.status = 403;
          errorMsg = err.message;
        }
        return res.status(500).json({
          message: errorMsg,
          success: false,
        })
    }
}

module.exports = register
