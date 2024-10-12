const { Schema, model } = require("mongoose")
const { ROLE } = require("../config/roles")

const ComplaintSchema = new Schema({
    description: String,
    address: String,
    status: Schema.Types.Mixed,
}, { collection: "complaints" })
const complaintModel = model("Complaint", ComplaintSchema)

module.exports = complaintModel
