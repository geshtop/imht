const express = require("express")
const companyController = require("../controllers/companyController")
const router = express.Router()


router.get("/", companyController.getCompanies )
router.get("/:id", companyController.getCompany )
router.post("/" , companyController.addCompany )
router.put("/", companyController.updateCompany )
router.delete("/", companyController.deleteCompany )

module.exports = router