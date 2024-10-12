const { User } = require("../../../models/User")
const Joi = require("joi")

const signupSchema = Joi.object({
    email: Joi.string().min(2).required(),
    password: Joi
        .string()
        // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(5)
        .required(),
})

const loginSchema = Joi.object({
  email: Joi.string().min(2).required(),
  password: Joi
    .string()
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(5)
    .required(),
});

const validateEmail = async (email) => {
    let user = await User.findOne({ email: email })
    return user ? false : true
}

module.exports = {
    loginSchema,
    signupSchema,
    validateEmail
}
