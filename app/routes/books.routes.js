const router = require("express").Router()
const bookControl = require("../controller/book.controller")

router.get("/", bookControl.allBooks)

router.get("/add", bookControl.addBooks)
router.get("/addLogic", bookControl.addMyLogic)

router.get("/single/:id", bookControl.single)

router.get("/del/:id", bookControl.delBooks)

router.get("/edit/:id", bookControl.editBooks)
router.post("/edit/:id", bookControl.editBooksLogic)


module.exports = router