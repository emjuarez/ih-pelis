// ./controllers/moviesController.js

const Celebrity = require("../models/Celebrity")
const Movie = require("../models/Movie")

exports.getMovies = async (req, res) => {

	const allMovies = await Movie.find({}).populate("cast")

	res.render("movies/movies", {
		movies: allMovies
	})

}

exports.create = async (req, res) => {

	const allCelebrities = await Celebrity.find({})

	res.render("movies/new-movie", {
		celebrities: allCelebrities
	})


}

exports.createForm = async (req, res) => {

	const { title, genre, plot, cast } = req.body

	console.log(req.body)


	const newMovie = await Movie.create({title, genre, plot, cast})

	console.log(newMovie)

	res.redirect("/movies")

}

exports.getSingleMovie = async (req, res) => {

	const { id } = req.params

	console.log(id)

	const singleMovie = await Movie.findById(id).populate("cast")

	console.log(singleMovie)

	res.render("movies/movie-details", {

		movie: singleMovie

	})

}

exports.deleteMovie = async (req, res) => {

	const { id } = req.params

	console.log(id)

	try {
		
		const deletedMovie = await Movie.findOneAndRemove(id)

		console.log(deletedMovie)

		res.redirect("/movies")

	} catch (error) {

		console.log(error)

		res.render(`movies/${id}`)

	}




}

exports.editMovie = async (req, res) => {

	const { id } = req.params

	const singleMovie = await Movie.findById(id)

	const allCelebrities = await Celebrity.find()

	console.log("singleMovie:", singleMovie)
	console.log("allCelebrities:", allCelebrities)

	res.render("movies/edit-movie", {
		singleMovie,
		allCelebrities
	})

}

exports.editMovieForm = async (req, res) => {

	const { title, genre, plot, cast } = req.body

	const { id } = req.params

	await Movie.findByIdAndUpdate(
		id,
		{ title, genre, plot, cast },
		{ new: true }
	)

	res.redirect(`/movies/${id}`)

}