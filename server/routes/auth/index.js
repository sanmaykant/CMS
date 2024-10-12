const router = require("express").Router()
const { ROLE } = require("../../config/roles");
const {
    registerUser,
    loginUser
} = require("../../controllers/auth")

router.get("/", async (req, res) => {
    return res.send("Auth service running...")
})

router.post("/signup", async (req, res) => {
    await registerUser(req.body, ROLE.citizen, res)
})
router.post("/login", async(req, res) => {
    await loginUser(req.body, ROLE.citizen, res)
})

module.exports = router
