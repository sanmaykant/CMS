const Complaint = require("../../../models/Complaint")
const { User, CitizenProfile } = require("../../../models/User")
const { complaintSchema } = require("../validate")

const MSG = {
    complaintError: "unable to register your complaint",
    complaintSuccess: "complaint successfully registered",
    fetchComplaintsError: "citizen does no exist"
};

const complaint = async (user, userRequest, res) => {
    try {
        complaintRequest = await complaintSchema.validateAsync(userRequest)

        try {
            const citizenComplaint = new Complaint({
                description: complaintRequest.description,
                address: complaintRequest.address,
            })
            await citizenComplaint.save();

            let citizenProfile = await CitizenProfile.findOne({ citizenId: user._id })
            citizenProfile.complaints.push({ complaintId: citizenComplaint._id })
            await citizenProfile.save()
        } catch (error) {
            console.error("Transaction failed:", error);
            return res.status(500).json({
              message: "complaint failed",
              success: false,
            })
        }

        return res.status(201).json({
            message: MSG.complaintSuccess,
            success: true,
        })
    } catch (error) {
        let errorMsg = MSG.complaintError;
        if (error.isJoi === true) {
          error.status = 403;
          errorMsg = error.message;
        }
        return res.status(500).json({
          message: errorMsg,
          success: false,
        })
    }
}

const fetchAllComplaints = async (user, res) => {
    let citizenProfile;
    try {
        citizenProfile = await CitizenProfile.findOne({ citizenId: user._id })
    } catch (error) {
        let errorMsg = MSG.fetchComplaintsError
        return res.status(500).json({
          message: errorMsg,
          success: false,
        })
    }

    let complaintIds = citizenProfile.complaints
    let complaints = []
    for (let i = 0; i < complaintIds.length; i++) {
        const complaint = await Complaint.findById(complaintIds[i].complaintId)
        complaints.push(complaint)
    }

    return complaints
}

module.exports = { complaint, fetchAllComplaints }
