const jwt = require("jsonwebtoken")
const { User } = require("../../models/User")
const { ROLE } = require("../../config/roles")
const { SECRET } = require("../../config")
const { complaint, fetchAllComplaints } = require("./complaint")

function filterByIndices(array, indices) {
    return indices.map(
        index => array[index]).filter(value => value !== undefined);
}

const registerComplaint = async (user, userRequest, res) =>
    await complaint(user, userRequest, res)

const fetchComplaints = async (user, res, indices=[]) => {
    let complaints = await fetchAllComplaints(user, res)
    if (indices.length === 0) {
        res.json({ success: true, complaints: complaints })
    } else {
        res.json({
            success: true,
            complaints: filterByIndices(complaints, indices)
        })
    }
}

const userAuth = async (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(401).json({
            reason: "unauthorized",
            message: "missing token",
            success: false
        })
    }

    try {
		const decoded = jwt.verify(token, SECRET)
		const email = decoded.email
		const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json({
                reason: "authentication",
                message: "User is not logged in",
                success: false,
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            reason: "server",
            message: "server failed...",
            success: false
        })
    }
}

const checkRole = (roles) => async (req, res, next) => {
    const token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, SECRET)
    const email = decoded.email

    const user = await User.findOne({ email: email })
    !roles.includes(user.role) ? res.status(401).json("Unauthorized") : next()
}

module.exports = {
    userAuth,
    checkRole,
    registerComplaint,
    fetchComplaints,
}
