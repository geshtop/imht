const express = require("express")
const companyController = require("../controllers/companyController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", companyController.getCompanies )
router.get("/:id", companyController.getCompany )
router.post("/" , companyController.addCompany )
router.put("/", companyController.updateCompany )
router.delete("/", companyController.deleteCompany )

module.exports = router