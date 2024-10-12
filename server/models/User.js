const { Schema, model } = require("mongoose")
const { ROLE } = require("../config/roles")
const Complaint = require("./Complaint")

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: ROLE.citizen,
        enum: [ROLE.citizen, ROLE.agent]
    },
}, { collection: "users" })

const CitizenProfileSchema = new Schema({
    citizenId: {
        type: Schema.Types.ObjectId,
        ref: "User", required: true
    },
    complaints: [{
        complaintId: {
            type: Schema.Types.ObjectId,
            ref: "Complaint", required: true
        },
    }]
}, { collection: "citizen-profiles" })

const AgentProfileSchema = new Schema({
    agentId: {
        type: Schema.Types.ObjectId,
        ref: "User", required: true
    },
    complaints: [{
        complaintId: {
            type: Schema.Types.ObjectId,
            ref: "Complaint", required: true
        },
    }]
}, { collection: "agent-profiles" })

// CitizenProfileSchema.pre("save", async (next) => {
//     const assign = this
// 
//     const user = await User.findById(assign.citizenId)
//     if (!user) {
//         return next(new Error("User not found"))
//     }
// 
//     if (user.role !== ROLE.citizen) {
//         return next(new Error(`User must have the role of ${ROLE.citizen}`))
//     }
// 
//     next()
// })
// 
// AgentProfileSchema.pre("save", async (next) => {
//     const assign = this
// 
//     const user = await User.findById(assign.agentId)
//     if (!user) {
//         return next(new Error("User not found"))
//     }
// 
//     if (user.role !== ROLE.agent) {
//         return next(new Error(`User must have the role of ${ROLE.agent}`))
//     }
// 
//     next()
// })

const User = model("User", UserSchema)
const CitizenProfile = model("CitizenProfile", CitizenProfileSchema)
const AgentProfile = model("AgentProfile", AgentProfileSchema)

module.exports = { User, CitizenProfile, AgentProfile }
