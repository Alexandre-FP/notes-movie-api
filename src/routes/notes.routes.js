import MoviesNotes from "../controllers/MoviesNotesController.js";
import express from "express";

const routerMovie = express.Router();
const movieController = new MoviesNotes();

routerMovie.post("/create-note/:id", movieController.create);
routerMovie.delete("/delete-note/:id", movieController.delete);
routerMovie.get("/list-note", movieController.index);

export default routerMovie; 