// ./routes/movies.routes.js

const express	= require("express")
const router	= express.Router()

const moviesController = require("./../controllers/moviesController")

router.get("/", moviesController.getMovies)

router.get("/create", moviesController.create)

router.post("/create", moviesController.createForm)

router.get("/:id", moviesController.getSingleMovie)

router.post("/:id/delete", moviesController.deleteMovie)

router.get("/:id/edit", moviesController.editMovie)

router.post("/:id/edit", moviesController.editMovieForm)



module.exports = router