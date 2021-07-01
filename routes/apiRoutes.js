const ApiController = require("../controller/apiController")
const router = require(`express`).Router()

router.get(`/weather`, ApiController.weather)

module.exports = router