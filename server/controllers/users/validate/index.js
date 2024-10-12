const { DEPARTMENT } = require("../../../config/departments");
const Joi = require("joi")

const complaintSchema = Joi.object({
    description: Joi.string().min(5).required(),
    address: Joi
        .string()
        .min(5)
        .required(),
    department: Joi.string().valid(
        DEPARTMENT.road,
        DEPARTMENT.water,
        DEPARTMENT.air,
        DEPARTMENT.electricity,
    )
})

module.exports = { complaintSchema }
