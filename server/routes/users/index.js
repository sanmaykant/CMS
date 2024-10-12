const router = require("express").Router()
const { checkRole } = require("../../controllers/users")
const { ROLE } = require("../../config/roles")

router.get("/", async (req, res) => {
    res.send("Users api running...")
})
router.use("/citizen", checkRole([ROLE.citizen]), require("./citizen"))
router.use("/agent", checkRole([ROLE.agent]), require("./agent"))

module.exports = router
