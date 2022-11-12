const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

const userHandlers = require("./movieHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});





app.delete("/api/movies/:id", movieHandlers.deleteMovie); 

app.delete("/api/users/:id", userHandlers.deleteUser); 

/*app.post("/api/users", userHandlers.postUser);

app.put("/api/users/:id", userHandlers.updateUser); */

const { validateMovie } = require("./validators.js");


app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

const { validateUser } = require("./validators.js");
  
app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/users/:id", validateUser, userHandlers.updateUser);  

 

