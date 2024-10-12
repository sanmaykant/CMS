const router = require("express").Router();

const {
    userAuth
} = require("../controllers/users")

router.get("/", (req, res) => {
    res.send("Api running...")
})

router.use("/auth", require("./auth"))
router.use("/users", userAuth, require("./users"))

module.exports = router
