const router = require("express").Router()
const { SECRET } = require("../../../config")
const jwt = require("jsonwebtoken")

const { User } = require("../../../models/User")
const {
    registerComplaint,
    fetchComplaints
} = require("../../../controllers/users")

router.get("/", async (req, res) => {
    return res.send("Citizen api running...")
})

router.post("/complaint", async (req, res) => {
    const token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, SECRET)
    const email = decoded.email
    const user = await User.findOne({ email: email })
    await registerComplaint(user, req.body, res)
})

router.get("/complaints", async(req, res) => {
    const token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, SECRET)
    const email = decoded.email
    const user = await User.findOne({ email: email })
    fetchComplaints(user, res)
})

module.exports = router
