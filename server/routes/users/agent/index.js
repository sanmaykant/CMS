const router = require("express").Router()

router.get("/", async(req, res) => {
    return res.send("Agent api running...")
})

module.exports = router
